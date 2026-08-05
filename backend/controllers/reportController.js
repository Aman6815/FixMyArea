// Temporary data (later this will come from PostgreSQL)

let reports = [
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

// GET all reports
const pool = require("../config/db");

const getAllReports = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM reports ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};




// GET one report
const getReportById = (req, res) => {

    const id = Number(req.params.id);

    const report = reports.find(r => r.id === id);

    if (!report) {
        return res.status(404).json({
            message: "Report not found"
        });
    }

    res.json(report);
};

// CREATE report
const createReport = async (req, res) => {

    try {

        const { title, category, location, description } = req.body;

        const result = await pool.query(
            `INSERT INTO reports
            (title, category, location, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [title, category, location, description]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Database Error"
        });

    }

};




// UPDATE report
const updateReport = (req, res) => {

    const id = Number(req.params.id);

    const index = reports.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Report not found"
        });
    }

    reports[index] = {
        ...reports[index],
        ...req.body
    };

    res.json(reports[index]);
};

// DELETE report
const deleteReport = (req, res) => {

    const id = Number(req.params.id);

    reports = reports.filter(r => r.id !== id);

    res.json({
        message: "Report deleted successfully"
    });
};

module.exports = {
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
};






