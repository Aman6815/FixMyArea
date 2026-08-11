// =========================================
// ADMIN DASHBOARD
// =========================================

const STATUSES = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved"
];


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
// GUARD: ADMINS ONLY
// (server-side checks are the real protection; this just
// keeps non-admins from landing on a broken-looking page)
// =========================================

const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

if (!token || !currentUser || !currentUser.is_admin) {

    window.location.href = "index.html";

}


// =========================================
// LOAD ALL REPORTS
// =========================================

async function loadAllReports() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/reports"
        );

        if (!response.ok) {

            throw new Error("Failed to load reports");

        }

        const reports = await response.json();

        displayAdminReports(reports);

    } catch (error) {

        console.error("Error loading reports:", error);

    }

}


// =========================================
// DISPLAY REPORTS + SUMMARY COUNTS
// =========================================

function displayAdminReports(reports) {

    document.getElementById("totalCount").textContent =
        reports.length;

    document.getElementById("submittedCount").textContent =
        reports.filter(r => r.status === "Submitted").length;

    document.getElementById("reviewingCount").textContent =
        reports.filter(r => r.status === "Under Review").length;

    document.getElementById("progressCount").textContent =
        reports.filter(r => r.status === "In Progress").length;

    document.getElementById("resolvedCount").textContent =
        reports.filter(r => r.status === "Resolved").length;


    const list = document.getElementById("adminReportsList");

    list.innerHTML = "";

    if (reports.length === 0) {

        list.innerHTML = "<p>No reports yet.</p>";

        return;

    }

    reports.forEach(report => {

        const options = STATUSES.map(status => `
            <option
                value="${status}"
                ${status === report.status ? "selected" : ""}
            >
                ${status}
            </option>
        `).join("");

        list.innerHTML += `

            <article class="report-card">

                <div class="report-card-top">

                    <span class="report-category">
                        ${report.category}
                    </span>

                    <span
                        class="status ${statusClass(report.status)}"
                        id="badge-${report.id}"
                    >
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


                <div class="admin-controls">

                    <select
                        class="status-select"
                        data-report-id="${report.id}"
                    >
                        ${options}
                    </select>

                    <a
                        href="report-details.html?id=${report.id}"
                        class="my-report-link"
                    >
                        View Details →
                    </a>

                </div>

            </article>

        `;

    });

}


// =========================================
// HANDLE STATUS CHANGE
// =========================================

document.addEventListener("change", async function (event) {

    if (!event.target.classList.contains("status-select")) {

        return;

    }

    const select = event.target;
    const reportId = select.dataset.reportId;
    const newStatus = select.value;

    try {

        const response = await fetch(
            `http://localhost:5000/api/reports/${reportId}/status`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            }
        );

        if (!response.ok) {

            throw new Error("Failed to update status");

        }

        const badge =
            document.getElementById(`badge-${reportId}`);

        badge.textContent = newStatus;
        badge.className = `status ${statusClass(newStatus)}`;

    } catch (error) {

        console.error("Error updating status:", error);

        alert("Could not update the report status. Please try again.");

    }

});


// =========================================
// START
// =========================================

loadAllReports();
