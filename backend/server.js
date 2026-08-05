const pool = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const reportsRoutes = require("./routes/reports");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(cors());

app.use(express.json());


// Home Route

app.get("/", (req, res) => {

    res.json({
        message: "FixMyArea API is running"
    });

});


// Reports Routes

app.use("/api/reports", reportsRoutes);

pool.connect()
    .then(() => {
        console.log("✅ Connected to PostgreSQL");
    })
    .catch((err) => {
        console.error("❌ Database connection failed");
        console.error(err.message);
    });

// Start Server

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});




