// =========================================
// EXPLORE REPORTS
// =========================================

const searchInput = document.getElementById("searchReports");

const categoryFilter =
    document.getElementById("filterCategory");

const locationFilter =
    document.getElementById("filterLocation");

const statusFilter =
    document.getElementById("filterStatus");

const reportCards =
    document.querySelectorAll(".report-card");

const noResults =
    document.getElementById("noResults");


// Filter reports

function filterReports() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;

    const selectedLocation =
        locationFilter.value;

    const selectedStatus =
        statusFilter.value;


    let visibleReports = 0;


    reportCards.forEach(function (card) {

        const title =
            card.querySelector("h2")
                .textContent
                .toLowerCase();

        const description =
            card.querySelector(".report-description")
                .textContent
                .toLowerCase();

        const category =
            card.dataset.category;

        const location =
            card.dataset.location;

        const status =
            card.dataset.status;


        const matchesSearch =
            title.includes(searchText) ||
            description.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesLocation =
            selectedLocation === "all" ||
            location === selectedLocation;

        const matchesStatus =
            selectedStatus === "all" ||
            status === selectedStatus;


        if (
            matchesSearch &&
            matchesCategory &&
            matchesLocation &&
            matchesStatus
        ) {

            card.style.display = "block";

            visibleReports++;

        } else {

            card.style.display = "none";

        }

    });


    // Show / hide "No Results"

    if (visibleReports === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


// Listen for changes

searchInput.addEventListener(
    "input",
    filterReports
);

categoryFilter.addEventListener(
    "change",
    filterReports
);

locationFilter.addEventListener(
    "change",
    filterReports
);

statusFilter.addEventListener(
    "change",
    filterReports
);







// =========================================
// LOAD REPORTS FROM BACKEND API
// =========================================

async function loadReports() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/reports"
        );

        if (!response.ok) {
            throw new Error("Failed to load reports");
        }

        const reports = await response.json();

        console.log("Reports received from backend:", reports);

        displayReports(reports);

    } catch (error) {

        console.error(
            "Error loading reports:",
            error
        );

    }

}


// =========================================
// DISPLAY REPORTS
// =========================================

function displayReports(reports) {

    console.log("Displaying reports:", reports);

}


// =========================================
// START
// =========================================

loadReports();




