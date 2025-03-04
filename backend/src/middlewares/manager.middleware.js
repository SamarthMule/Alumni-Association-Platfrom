const verifyManager = (req, res, next) => {
    if(req.user.role.toLowerCase() === "manager") {
        next();
    } else {
        return res.status(401).json({"message": "Error in manager middleware", error: "User must an manager to access"})  
    }
}

export { verifyManager }