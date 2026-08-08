// =========================================
// REPORT FORM
// =========================================

const reportForm = document.getElementById("reportForm");


// =========================================
// LOCATION ELEMENTS
// =========================================

const locationType = document.getElementById("locationType");

const cityTownGroup =
    document.getElementById("cityTown").closest(".form-group");

const districtGroup =
    document.getElementById("district").closest(".form-group");

const cityTown =
    document.getElementById("cityTown");

const district =
    document.getElementById("district");


// =========================================
// HIDE LOCATION OPTIONS INITIALLY
// =========================================

cityTownGroup.style.display = "none";
districtGroup.style.display = "none";


// =========================================
// CHANGE LOCATION TYPE
// =========================================

locationType.addEventListener("change", function () {

    // Hide both fields
    cityTownGroup.style.display = "none";
    districtGroup.style.display = "none";


    // Reset selections
    cityTown.value = "";
    district.value = "";


    // Show City / Town
    if (this.value === "other-cities-towns") {

        cityTownGroup.style.display = "flex";

    }


    // Show District / Woreda
    else if (this.value === "districts") {

        districtGroup.style.display = "flex";

    }

});


// =========================================
// REPORT FORM SUBMISSION
// =========================================

if (reportForm) {

    reportForm.addEventListener("submit", async function (event) {

        // Prevent page refresh
        event.preventDefault();


        // Get form values
        const title =
            document.getElementById("problemTitle")
                .value
                .trim();

        const category =
            document.getElementById("category")
                .value;

        const selectedLocation =
            locationType.value;

        const selectedCity =
            cityTown.value;

        const selectedDistrict =
            district.value;

        const area =
            document.getElementById("specificArea")
                .value
                .trim();

        const description =
            document.getElementById("description")
                .value
                .trim();


        // =====================================
        // BASIC VALIDATION
        // =====================================

        if (
            !title ||
            !category ||
            !selectedLocation ||
            !area ||
            !description
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        // =====================================
        // LOCATION VALIDATION
        // =====================================

        if (
            selectedLocation === "other-cities-towns" &&
            !selectedCity
        ) {

            alert(
                "Please select a city or town."
            );

            return;

        }


        if (
            selectedLocation === "districts" &&
            !selectedDistrict
        ) {

            alert(
                "Please select a district (Woreda)."
            );

            return;

        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/reports",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({

                        title,

                        category,

                        location:
                            selectedLocation === "sodo-city"
                                ? "Sodo City"
                                : selectedLocation === "other-cities-towns"
                                ? selectedCity
                                : selectedDistrict,

                        description

                    })

                }
            );

            if (!response.ok) {

                throw new Error("Failed to submit report");

            }

            alert("Report submitted successfully!");

            reportForm.reset();

            cityTownGroup.style.display = "none";
            districtGroup.style.display = "none";

        }
        catch (error) {

            console.error(error);

            alert("Error submitting report.");

        }



    });

}



