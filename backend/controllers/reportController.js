const pool = require("../config/db");


// =========================================
// GET all reports
// =========================================

const getAllReports = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM reports ORDER BY id DESC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// GET one report
// =========================================

const getReportById = async (req, res) => {

    try {

        const id = Number(req.params.id);

        const result = await pool.query(
            "SELECT * FROM reports WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Report not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// CREATE report
// =========================================

const createReport = async (req, res) => {

    try {

        const {
            title,
            category,
            location,
            description
        } = req.body;

        // Get the logged-in user's ID
        const userId = req.user.id;

        // If a photo was uploaded, build its public URL
        const imageUrl =
            req.file ? `/uploads/${req.file.filename}` : null;

        const result = await pool.query(
            `INSERT INTO reports
            (title, category, location, description, user_id, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                title,
                category,
                location,
                description,
                userId,
                imageUrl
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// UPDATE report (owner only)
// =========================================

const updateReport = async (req, res) => {

    try {

        const id = Number(req.params.id);
        const userId = req.user.id;

        const existing = await pool.query(
            "SELECT * FROM reports WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0) {

            return res.status(404).json({
                message: "Report not found"
            });

        }

        const report = existing.rows[0];

        if (report.user_id !== userId) {

            return res.status(403).json({
                message: "You are not allowed to edit this report"
            });

        }

        // Only allow editing these fields; fall back to existing
        // values for anything the client didn't send.
        const {
            title = report.title,
            category = report.category,
            location = report.location,
            description = report.description
        } = req.body;

        const result = await pool.query(
            `UPDATE reports
             SET title = $1, category = $2, location = $3, description = $4
             WHERE id = $5
             RETURNING *`,
            [title, category, location, description, id]
        );

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// DELETE report (owner only)
// =========================================

const deleteReport = async (req, res) => {

    try {

        const id = Number(req.params.id);
        const userId = req.user.id;

        const existing = await pool.query(
            "SELECT * FROM reports WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0) {

            return res.status(404).json({
                message: "Report not found"
            });

        }

        if (existing.rows[0].user_id !== userId) {

            return res.status(403).json({
                message: "You are not allowed to delete this report"
            });

        }

        await pool.query(
            "DELETE FROM reports WHERE id = $1",
            [id]
        );

        res.json({
            message: "Report deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// UPDATE REPORT STATUS (admin only)
// =========================================

const ALLOWED_STATUSES = [
    "Submitted",
    "Under Review",
    "In Progress",
    "Resolved"
];

const updateReportStatus = async (req, res) => {

    try {

        const id = Number(req.params.id);
        const { status } = req.body;

        if (!ALLOWED_STATUSES.includes(status)) {

            return res.status(400).json({
                message: `Status must be one of: ${ALLOWED_STATUSES.join(", ")}`
            });

        }

        const result = await pool.query(
            `UPDATE reports
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Report not found"
            });

        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



// =========================================
// GET reports belonging to logged-in user
// =========================================

const getMyReports = async (req, res) => {

    try {

        const userId = req.user.id;

        const result = await pool.query(
            `SELECT *
             FROM reports
             WHERE user_id = $1
             ORDER BY id DESC`,
            [userId]
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};



module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    updateReportStatus,
    deleteReport,
    getMyReports
};
