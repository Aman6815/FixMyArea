// =========================================
// MY REPORTS
// =========================================

async function loadMyReports() {

    const token = localStorage.getItem("token");

    // Check if user is logged in
    if (!token) {

        window.location.href = "login.html";

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:5000/api/reports/my",
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (!response.ok) {

            throw new Error("Failed to load your reports");

        }


        const reports = await response.json();

        console.log(
            "My reports:",
            reports
        );

        displayMyReports(reports);


    } catch (error) {

        console.error(
            "Error loading my reports:",
            error
        );

    }

}


// =========================================
// STATUS BADGE COLOR CLASS
// =========================================

function statusClass(status) {

    switch (status) {

        case "Submitted":
            return "status-submitted";

        case "Under Review":
            return "status-reviewing";

        case "In Progress":
            return "status-progress";

        case "Resolved":
            return "status-resolved";

        default:
            return "";

    }

}


// =========================================
// DISPLAY MY REPORTS
// =========================================

function displayMyReports(reports) {

    const reportsGrid =
        document.getElementById("myReportsList");


    if (!reportsGrid) {
        return;
    }



        // =========================================
        // UPDATE SUMMARY
        // =========================================

        document.getElementById("totalReports").textContent =
            reports.length;

        document.getElementById("pendingReports").textContent =
            reports.filter(report =>
                report.status === "Pending"
            ).length;

        document.getElementById("submittedReports").textContent =
            reports.filter(report =>
                report.status === "Submitted"
            ).length;

        document.getElementById("underReviewReports").textContent =
            reports.filter(report =>
                report.status === "Under Review"
            ).length;

        document.getElementById("inProgressReports").textContent =
            reports.filter(report =>
                report.status === "In Progress"
            ).length;

        document.getElementById("resolvedReports").textContent =
            reports.filter(report =>
                report.status === "Resolved"
            ).length;



    reportsGrid.innerHTML = "";


    if (reports.length === 0) {

        reportsGrid.innerHTML = `
            <p>You haven't submitted any reports yet.</p>
        `;

        return;
    }


    reports.forEach(report => {

        reportsGrid.innerHTML += `

            <article class="report-card">

                <div class="report-card-top">

                    <span class="report-category">
                        ${report.category}
                    </span>

                    <span class="status ${statusClass(report.status)}">
                        ${report.status}
                    </span>

                </div>


                <h2>
                    ${report.title}
                </h2>


                <p class="report-location">
                    📍 ${report.location}
                </p>


                <p class="report-description">
                    ${report.description}
                </p>

                <div class="report-card-bottom">

                    <a href="report-details.html?id=${report.id}" class="my-report-link">
                        View Details →
                    </a>

                    <div class="report-actions">

                        <a href="edit-report.html?id=${report.id}" class="btn-edit">
                            ✏️ Edit
                        </a>

                        <button
                            type="button"
                            class="btn-delete delete-report-btn"
                            data-report-id="${report.id}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            </article>

        `;

    });

}


// =========================================
// DELETE A REPORT
// =========================================

document.addEventListener("click", async function (event) {

    if (!event.target.classList.contains("delete-report-btn")) {

        return;

    }

    const reportId = event.target.dataset.reportId;

    const confirmed = confirm(
        "Are you sure you want to delete this report? " +
        "This cannot be undone."
    );

    if (!confirmed) {

        return;

    }

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            `http://localhost:5000/api/reports/${reportId}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {

            throw new Error("Failed to delete report");

        }

        // Reload the list so the deleted report disappears
        loadMyReports();

    } catch (error) {

        console.error("Error deleting report:", error);

        alert("Could not delete this report. Please try again.");

    }

});


// =========================================
// START
// =========================================

loadMyReports();

