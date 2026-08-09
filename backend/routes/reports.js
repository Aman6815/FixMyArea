const express = require("express");

const router = express.Router();

const {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getMyReports
} = require("../controllers/reportController");

const authenticateToken =
    require("../middleware/authMiddleware");


router.get("/", getAllReports);

router.get(
    "/my",
    authenticateToken,
    getMyReports
);

router.get("/:id", getReportById);

router.post("/", authenticateToken, createReport);

router.put("/:id", updateReport);

router.delete("/:id", deleteReport);


module.exports = router;


