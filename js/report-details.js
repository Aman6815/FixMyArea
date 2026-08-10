// =========================================
// REPORT DETAILS
// =========================================

const STATUS_STEPS = [
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
// GET REPORT ID FROM THE URL
// =========================================

function getReportIdFromUrl() {

    const params = new URLSearchParams(window.location.search);

    return params.get("id");

}


// =========================================
// SHOW AN ERROR STATE
// =========================================

function showReportError(message) {

    const detailsCard = document.getElementById("reportDetailsCard");
    const statusCard = document.getElementById("reportStatusCard");

    detailsCard.innerHTML = `<p>${message}</p>`;

    if (statusCard) {
        statusCard.style.display = "none";
    }

}


// =========================================
// LOAD REPORT FROM BACKEND API
// =========================================

async function loadReportDetails() {

    const id = getReportIdFromUrl();

    if (!id) {

        showReportError("No report was specified.");

        return;

    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/reports/${id}`
        );

        if (!response.ok) {

            throw new Error("Report not found");

        }

        const report = await response.json();

        displayReportDetails(report);

    } catch (error) {

        console.error("Error loading report:", error);

        showReportError("This report could not be found.");

    }

}


// =========================================
// DISPLAY REPORT PHOTO (OR NO-PHOTO MESSAGE)
// =========================================

function displayReportPhoto(imageUrl) {

    const container =
        document.getElementById("reportPhotoContainer");

    if (imageUrl) {

        container.className = "report-photo-wrapper";

        container.innerHTML = `
            <img
                src="http://localhost:5000${imageUrl}"
                alt="Report photo"
                class="report-photo"
            >
        `;

    } else {

        container.className = "report-image-placeholder";

        container.innerHTML = `
            <span>📷</span>
            <p>No photo was added for this report.</p>
        `;

    }

}


// =========================================
// DISPLAY REPORT
// =========================================

function displayReportDetails(report) {

    document.getElementById("reportCategory").textContent =
        report.category;

    const statusEl = document.getElementById("reportStatus");

    statusEl.textContent = report.status;
    statusEl.className = `status ${statusClass(report.status)}`;

    document.getElementById("reportTitle").textContent =
        report.title;

    document.getElementById("reportLocation").textContent =
        `📍 ${report.location}`;

    document.getElementById("reportMetaCategory").textContent =
        `Category: ${report.category}`;

    document.getElementById("reportDescription").textContent =
        report.description;

    displayReportPhoto(report.image_url);

    const dateEl = document.getElementById("reportDate");

    if (report.created_at) {

        const reportedOn = new Date(report.created_at);

        dateEl.textContent =
            `Reported on ${reportedOn.toLocaleDateString()}`;

    } else {

        dateEl.textContent = "";

    }

    updateStatusTimeline(report.status);

}


// =========================================
// UPDATE STATUS TIMELINE
// =========================================

function updateStatusTimeline(status) {

    const currentIndex = STATUS_STEPS.indexOf(status);

    const stepIds = [
        "step-submitted",
        "step-review",
        "step-progress",
        "step-resolved"
    ];

    stepIds.forEach(function (stepId, index) {

        const stepEl = document.getElementById(stepId);

        if (!stepEl) {
            return;
        }

        stepEl.classList.remove("completed", "current");

        if (currentIndex === -1) {
            return;
        }

        // A resolved report has every step marked complete
        if (status === "Resolved") {

            stepEl.classList.add("completed");

            return;

        }

        if (index < currentIndex) {

            stepEl.classList.add("completed");

        } else if (index === currentIndex) {

            stepEl.classList.add("current");

        }

    });

}


// =========================================
// START
// =========================================

loadReportDetails();
