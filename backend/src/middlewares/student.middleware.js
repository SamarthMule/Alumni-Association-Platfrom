const verifyStudent = (req, res, next) => {
    if(req.user.current_status.toLowerCase() === "student") {
        next();
    } else {
        return res.status(401).json({"message": "Error in student middleware", error: "User must an student to access"})  
    }
}

export { verifyStudent }