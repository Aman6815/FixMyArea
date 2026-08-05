const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;


// =========================================
// MIDDLEWARE
// =========================================

// Allow frontend to communicate with backend
app.use(cors());

// Allow Express to read JSON data
app.use(express.json());


// =========================================
// BASIC ROUTE
// =========================================

app.get("/", (req, res) => {

    res.json({
        message: "Wolaita Reporter API is running"
    });

});


// =========================================
// TEST REPORTS API
// =========================================

app.get("/api/reports", (req, res) => {

    const reports = [
        {
            id: 1,
            title: "Damaged Road Near Market Area",
            category: "Roads",
            location: "Sodo City",
            status: "In Progress"
        },
        {
            id: 2,
            title: "Water Supply Problem",
            category: "Water",
            location: "Areka",
            status: "Under Review"
        }
    ];

    res.json(reports);

});


// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(
        `Wolaita Reporter API running on http://localhost:${PORT}`
    );

});