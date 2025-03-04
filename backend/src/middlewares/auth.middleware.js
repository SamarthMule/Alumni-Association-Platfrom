import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if(!token) return res.status(400).json({"message": "Unauthorized request"})

        const decodedUser = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedUser?._id).select("-password -refreshToken")

        if(!user) return res.status(400).json({"message": "Invalid access token"})
        req.user = user;
        next();
    } catch (error) {
        console.log(`\n\nError in verifyJWT middleware :- `, error)
        return res.status(400).json({"message": "Error in verifyJWT middleware", error: error.message})
    }
}

export { verifyJWT }
