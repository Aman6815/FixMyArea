// Must run AFTER authenticateToken, since it relies on req.user
// having already been set from the verified JWT.

const requireAdmin = (req, res, next) => {

    if (!req.user || !req.user.is_admin) {

        return res.status(403).json({
            message: "Admin access required."
        });

    }

    next();

};

module.exports = requireAdmin;
