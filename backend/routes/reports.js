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

const upload =
    require("../middleware/upload");


router.get("/", getAllReports);

router.get(
    "/my",
    authenticateToken,
    getMyReports
);

router.get("/:id", getReportById);

router.post(
    "/",
    authenticateToken,
    upload.single("photo"),
    createReport
);

router.put("/:id", authenticateToken, updateReport);

router.delete("/:id", authenticateToken, deleteReport);


module.exports = router;


