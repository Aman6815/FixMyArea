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
const getAllReports = (req, res) => {
    res.json(reports);
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
const createReport = (req, res) => {

    const newReport = {
        id: reports.length + 1,
        ...req.body
    };

    reports.push(newReport);

    res.status(201).json(newReport);
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






