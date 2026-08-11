const express = require("express");

const router = express.Router();

const {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    updateReportStatus,
    deleteReport,
    getMyReports
} = require("../controllers/reportController");

const authenticateToken =
    require("../middleware/authMiddleware");

const requireAdmin =
    require("../middleware/adminMiddleware");

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

router.patch(
    "/:id/status",
    authenticateToken,
    requireAdmin,
    updateReportStatus
);

router.delete("/:id", authenticateToken, deleteReport);


module.exports = router;


