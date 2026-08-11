// =========================================
// EDIT REPORT
// =========================================

const token = localStorage.getItem("token");

if (!token) {

    window.location.href = "login.html";

}


function getReportIdFromUrl() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");

}


const reportId = getReportIdFromUrl();

const editForm = document.getElementById("editReportForm");


// =========================================
// LOAD EXISTING REPORT
// =========================================

async function loadReportForEdit() {

    if (!reportId) {

        alert("No report was specified.");

        window.location.href = "my-reports.html";

        return;

    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/reports/${reportId}`
        );

        if (!response.ok) {

            throw new Error("Report not found");

        }

        const report = await response.json();

        document.getElementById("editTitle").value =
            report.title;

        document.getElementById("editCategory").value =
            report.category;

        document.getElementById("editLocation").value =
            report.location;

        document.getElementById("editDescription").value =
            report.description;

    } catch (error) {

        console.error("Error loading report:", error);

        alert("This report could not be loaded.");

        window.location.href = "my-reports.html";

    }

}


// =========================================
// SAVE CHANGES
// =========================================

if (editForm) {

    editForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const title =
            document.getElementById("editTitle").value.trim();

        const category =
            document.getElementById("editCategory").value;

        const location =
            document.getElementById("editLocation").value.trim();

        const description =
            document.getElementById("editDescription").value.trim();

        try {

            const response = await fetch(
                `http://localhost:5000/api/reports/${reportId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        category,
                        location,
                        description
                    })
                }
            );

            if (response.status === 403) {

                alert("You can only edit your own reports.");

                return;

            }

            if (!response.ok) {

                throw new Error("Failed to update report");

            }

            alert("Report updated successfully!");

            window.location.href = `report-details.html?id=${reportId}`;

        } catch (error) {

            console.error("Error updating report:", error);

            alert("Error updating report.");

        }

    });

}


// =========================================
// START
// =========================================

loadReportForEdit();
