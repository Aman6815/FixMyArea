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

    reportForm.addEventListener("submit", function (event) {

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


        // =====================================
        // SUCCESS MESSAGE
        // =====================================

        alert(
            "Your report has been submitted successfully!"
        );


        // =====================================
        // DISPLAY DATA IN CONSOLE
        // =====================================

        console.log({

            title: title,

            category: category,

            locationType: selectedLocation,

            cityTown: selectedCity,

            district: selectedDistrict,

            specificArea: area,

            description: description

        });

    });

}


