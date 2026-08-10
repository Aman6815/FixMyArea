const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const pool = require("./config/db");

const reportsRoutes = require("./routes/reports");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = process.env.PORT || 5000;


// =========================================
// MIDDLEWARE
// =========================================

app.use(cors());
app.use(express.json());

// Serve uploaded report photos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// =========================================
// HOME ROUTE
// =========================================

app.get("/", (req, res) => {

    res.json({
        message: "FixMyArea API is running"
    });

});


// =========================================
// API ROUTES
// =========================================

app.use("/api/reports", reportsRoutes);

app.use("/api/auth", authRoutes);


// =========================================
// DATABASE CONNECTION
// =========================================

pool.connect()
    .then(() => {

        console.log("✅ Connected to PostgreSQL");

    })
    .catch((err) => {

        console.error("❌ Database connection failed");
        console.error(err.message);

    });


// =========================================
// ERROR HANDLER
// (e.g. multer upload errors: bad file type, too large)
// =========================================

app.use((err, req, res, next) => {

    console.error(err);

    res.status(400).json({
        message: err.message || "Something went wrong"
    });

});


// =========================================
// START SERVER
// =========================================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});





