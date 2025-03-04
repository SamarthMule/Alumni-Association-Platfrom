const verifyAlumni = (req, res, next) => {
    if(req.user.current_status.toLowerCase() === "alumni") {
        next();
    } else {
        return res.status(401).json({"message": "Error in alumni middleware", error: "User must an alumni to access"})  
    }
}

export { verifyAlumni }