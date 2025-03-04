const verifyAdmin = (req, res, next) => {
    if(req.user?.role.toLowerCase() === "admin") {
        next();
    } else {
        return res.status(401).json({"message": "Error in admin middleware", error: "User must an admin to access"})
    }
}

const verifyAdminOrManager = (req, res, next) => {
    if(req.user?.role.toLowerCase() === "admin" || req.user?.role.toLowerCase() === "manager") {
        next();
    } else {
        return res.status(401).json({"message": "Error in adminManager middleware", error: "User must an admin or manager to access"})
    }
}

export { verifyAdmin, verifyAdminOrManager }