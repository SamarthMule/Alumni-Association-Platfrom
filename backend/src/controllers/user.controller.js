import { User } from "../models/user.model.js";
import { CollegeDB } from "../models/collegeDb.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Mentorship } from "../models/mentorship.model.js";
import nodemailer from "nodemailer";
import validator from "validator";
import { otpStore, verifiedEmails } from "../models/user.model.js";

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).send("Please fill all the fields");
        }

        if (!validator.isEmail(email)) {
            res.status(400).send("Email is not valid. Please enter a valid email");
        }

        // Send an email with the OTP code
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Generates a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save the OTP in the temporary store
        otpStore[email] = otp;

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your OTP Code",
            html: `
            <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 10px; max-width: 600px; margin: auto;">
                <h2 style="color: #333;">Your OTP Code</h2>
                <p style="font-size: 16px; color: #555;">Please use the following OTP code to complete your verification process:</p>
                <p style="font-size: 24px; font-weight: bold; color: #000;">${otp}</p>
                <p style="font-size: 14px; color: #999;">If you did not request this code, please ignore this email.</p>
            </div>
            `,
        };

        const emailRes = await transporter.sendMail(mailOptions)
            .catch((err) => {
                return res.status(400).json({ message: err.message });
            });

        if (emailRes) {
            verifiedEmails[email] = otp;
            // console.log('=== verifiedEmails authentication.controller.js [51] ===', verifiedEmails,otpStore);
        }

        return res.status(201).json({ message: "OTP sent to your mail" });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        console.log('=== email,otp authentication.controller.js [63] ===', email, otp);

        if (!email || !otp) {
            res.status(400).send({ message: "Please fill all the fields" });
        }

        if (!validator.isEmail(email)) {
            res.status(400).send({ message: "Email is not valid. Please enter a valid email" });
        }

        if (otpStore[email] !== otp) {
            res.status(400).send({ message: "OTP not verified" });
        }

        verifiedEmails[email] = true;
        delete otpStore[email];

        res.status(200).json({ message: "Email verified successfully!", verified: true });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const checkAccess = async (req, res) => {

    try {
        const { email, prn_no } = req.body;
     
        if (!email && !prn_no) return res.status(400).json({ message: "Email or prn is required for checking..." });

        let existingUser = await CollegeDB.findOne({ email });
        if (!existingUser && prn_no) existingUser = await CollegeDB.findOne({ prn_no });

        if (!existingUser) return res.status(400).json({ message: "User does not exist..." });

        return res.status(200).json({ status: 200, data: existingUser, message: "User authenticated and has access." });
    } catch (error) {
        console.log(`\n\n\nError in checkAccess : `, error)
        res.status(500).json({ message: "Error occurred in checkAccess", error });
    }
};

const registerUser = async (req, res) => {
    try {
        const { name, gender, mobile_no, email, password, graduation_year } = req.body;
        const missingFields = [];
        if (!name) missingFields.push("name");
        if (!mobile_no) missingFields.push("mobile_no");
        if (!password) missingFields.push("password");


        if (missingFields.length > 0) return res.status(400).json({ message: `${missingFields.join(", ")} required except avatar.` });


        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const role = new Date().getFullYear() - graduation_year > 0 ? "alumni" : "student";

        const user = await User.create({
            name, gender, mobile_no, email, password, graduation_year, role
        });
        console.log(`\nError\n`)

        const registeredUser = await User.findById(user._id).select("-password -refreshToken");
        if (!registeredUser) return res.status(500).json({ message: "Unable to register user" });

        return res.status(201).json({ status: 200, data: registeredUser, message: "User registered successfully" });
    } catch (error) {
        console.log(`\n\n\nError in registerUser : `, error)
        res.status(500).json({ message: "Error occurred in registerUser", error });
    }
};
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    } catch (error) {
        console.log(`\n\n\nError in generateAccessAndRefreshToken : `, error)
        res.status(400).send("unable to generate token");
    }
}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and Password are required." });

        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await existingUser.isPasswordCorrect(password);
        if (!isPasswordCorrect) return res.status(409).json({ message: "Incorrect Password" });

        if (!isPasswordCorrect) return res.status(409).json({ "message": "Incorrect password" })

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existingUser._id);

        const loggedInUser = await User.findById(existingUser._id).select("-password -refreshToken")



        return res.status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, maxAge: 15 * 24 * 60 * 60 * 1000 })
            .json({ status: 200, data: loggedInUser, message: "User Logged in successfully" });
    } catch (error) {
        console.log(`\n\n\nError in loginUser : `, error)
        res.status(500).json({ message: "Error occurred in loginUser", error });
    }
};

const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });
        return res.status(200).clearCookie("accessToken").clearCookie("refreshToken").json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(`\n\n\nError in logoutUser : `, error)
        res.status(500).json({ message: "Error occurred in logoutUser", error });
    }
};

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.name = updates.name ?? user.name;
        user.mobile_no = updates.mobile_no ?? user.mobile_no;
        user.skills = updates.skills ?? user.skills;
        user.interests = updates.interests ?? user.interests;
        user.job_title = updates.job_title ?? user.job_title;
        user.company = updates.company ?? user.company;

        await user.save();

        res.status(200).json({ status: 200, data: user, message: "Account details updated successfully" });
    } catch (error) {
        console.log("\n\n\nError in updateUserDetails : ", error);
        res.status(500).json({ message: "Error occurred in updateUserDetails", error });
    }
};


const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) return res.status(400).json({ message: "Refresh token missing" });

        const user = await User.findById(req.user?._id);
        if (!user || user.refreshToken !== refreshToken)
            return res.status(401).json({ message: "Unauthorized request" });

        const accessToken = user.generateAccessToken();
        const newRefreshToken = user.generateRefreshToken();

        user.refreshToken = newRefreshToken;
        await user.save({ validateBeforeSave: false });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
        });

        return res.status(200).json({ message: "Tokens updated successfully" });
    } catch (error) {
        console.log(`\n\n\nError in refreshAccessToken : `, error)
        res.status(500).json({ message: "Error occurred in refreshAccessToken", error });
    }
};

const changeCurrentPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user?._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid password" });

        user.password = newPassword;
        await user.save({ validateBeforeSave: false });

        return res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.log(`\n\n\nError in changeCurrentPassword : `, error)
        res.status(500).json({ message: "Error occurred in changeCurrentPassword", error });
    }
};

const getCurrentUser = async (req, res) => {
    return res.status(200).json({ user: req.user, message: "Current user details fetched successfully" });
};

const updateUserAvatar = async (req, res) => {
    try {
        const localPath = req.file?.path;
        if (!localPath) return res.status(400).json({ message: "Avatar is missing" });
        console.log(localPath)
        const avatar = await uploadOnCloudinary(localPath);
        if (!avatar.url) return res.status(400).json({ message: "Error while uploading on Cloudinary" });
        console.log(avatar)
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { avatar: avatar.url } },
            { new: true }
        ).select("-refreshToken -password");

        return res.status(200).json({ user, message: "Avatar updated successfully" });
    } catch (error) {
        console.log(`\n\n\nError in updateUserAvatar : `, error)
        res.status(500).json({ message: "Error occurred in updateUserAvatar", error });
    }
};

const updateUserBanner = async (req, res) => {
    try {
        const localPath = req.file?.path;
        if (!localPath) return res.status(400).json({ message: "Banner is missing" });

        const banner = await uploadOnCloudinary(localPath);
        if (!banner.url) return res.status(400).json({ message: "Error while uploading on Cloudinary" });

        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { banner: banner.url } },
            { new: true }
        ).select("-refreshToken -password");

        return res.status(200).json({ user, message: "Banner updated successfully" });
    } catch (error) {
        console.log(`\n\n\nError in updateUserBanner : `, error)
        res.status(500).json({ message: "Error occurred in updateUserBanner", error });
    }
};

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user._id);

        if (id === req.user._id.toString()) {
            return res.status(400).json({ error: "You can't follow or unfollow yourself" });
        }

        if (!userToModify || !currentUser) {
            return res.status(404).json({ error: "User not found." });
        }

        const isFollowing = await currentUser.following.includes(id);
        if (isFollowing) {
            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            res.status(200).json({ message: "User followed successfully" });
        }

    } catch (error) {
        console.log(`\n\n\nError in followUnfollowUser : `, error)
        res.status(500).json({ message: "Error occurred in followUnfollowUser", error });
    }
}

const getUserById = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user,
        });
    } catch (error) {
        console.log(`\n\n\nError in getUserById : `, error)
        res.status(500).json({ message: "Error occurred in getUserById", error });
    }
};

const getFollowersAndFollowing = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const user = await User.findById(userId).select("followers following");
        if (!user) return res.status(404).json({ error: "User not found" });

        const followers = await User.find({ _id: { $in: user.followers } })
            .skip(skip).limit(parsedLimit)
            .select("_id name email current_status avatar skills job_title");

        const following = await User.find({ _id: { $in: user.following } })
            .skip(skip).limit(parsedLimit)
            .select("_id name email current_status avatar skills job_title");

        res.status(200).json({
            followers, following,
            pagination: { page: parsedPage, limit: parsedLimit }
        });
    } catch (error) {
        console.log("Error in getFollowersAndFollowing:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getMentorsOrMentees = async (req, res) => {
    try {
        const { userId, page = 1, limit = 10 } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        let query, role;
        if (user.current_status === "student") {
            query = { mentee: userId };
            role = "mentor";
        } else if (user.current_status === "alumni") {
            query = { mentor: userId };
            role = "mentee";
        } else {
            return res.status(400).json({ error: "Invalid current status" });
        }

        const mentorships = await Mentorship.find(query)
            .populate(role, "name email avatar skills job_title")
            .skip(skip).limit(parsedLimit);

        const total = await Mentorship.countDocuments(query);
        const users = mentorships.map(m => m[role]);

        res.status(200).json({ users, pagination: { total, page: parsedPage, totalPages: Math.ceil(total / parsedLimit), limit: parsedLimit } });
    } catch (error) {
        console.log("Error in getMentorsOrMentees:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const searchUser = async (req, res) => {
    try {
        const { name, page = 1, limit = 10 } = req.query;
        console.log('=== name user.controller.js [342] ===', name);
        if (!name) return res.status(400).json({ error: "Name is required for search" });

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const users = await User.find({
            name: { $regex: name, $options: "i" },
            is_blocked: false,
        }).sort({ name: 1 }).skip(skip).limit(parsedLimit);

        const totalUsers = await User.countDocuments({ name: { $regex: name, $options: "i" }, is_blocked: false });

        res.status(200).json({ users, pagination: { totalUsers, page: parsedPage, totalPages: Math.ceil(totalUsers / parsedLimit), limit: parsedLimit } });
    } catch (error) {
        console.log("Error in searchUser:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const query = { is_blocked: false };
        for (const key in filters) {
            if (filters[key]) query[key] = { $regex: filters[key], $options: "i" };
        }

        const users = await User.find(query).select("-password -refreshToken").skip(skip).limit(parsedLimit);
        const totalUsers = await User.countDocuments(query);

        res.status(200).json({ users, pagination: { totalUsers, page: parsedPage, totalPages: Math.ceil(totalUsers / parsedLimit), limit: parsedLimit } });
    } catch (error) {
        console.log("Error in getAllUsers:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, name, gender, email, graduation_year, current_status, job_title, company } = req.query;

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const currentUser = await User.findById(userId).select("following");
        if (!currentUser) return res.status(404).json({ error: "User not found" });

        const friends = [...currentUser.following];

        // Fetch Friends of Friends (FoF)
        let fofUsers = await User.find({
            _id: { $in: friends },
            _id: { $nin: [userId, ...friends] },
            is_blocked: false
        });

        // Fetch Mentors of Friends (MoF)
        const fofMentors = await Mentorship.aggregate([
            { $match: { mentee: { $in: friends } } },
            { $unwind: "$mentor" },
            {
                $lookup: {
                    from: "users",
                    localField: "mentor",
                    foreignField: "_id",
                    as: "mentorDetails"
                }
            },
            { $unwind: "$mentorDetails" },
            { $match: { "mentorDetails.is_blocked": false, "mentorDetails._id": { $nin: [userId] } } },
            { $project: { "mentorDetails": 1 } }
        ]);

        let mofUsers = fofMentors.map(item => item.mentorDetails);
        let combinedUsers = [...fofUsers, ...mofUsers];

        // Remove already followed users
        combinedUsers = combinedUsers.filter(user => !currentUser.following.includes(user._id));

        // Apply filters if provided
        if (Object.keys(req.query).length > 0) {
            combinedUsers = combinedUsers.filter(user => {
                if (name && !new RegExp(name, "i").test(user.name)) return false;
                if (gender && user.gender !== (gender === "1" ? "Female" : "Male")) return false;
                if (email && !new RegExp(email, "i").test(user.email)) return false;
                if (graduation_year && user.graduation_year !== graduation_year) return false;
                if (current_status && user.current_status !== (current_status === "1" ? "Alumni" : "Student")) return false;
                if (job_title && !new RegExp(job_title, "i").test(user.job_title)) return false;
                if (company && !new RegExp(company, "i").test(user.company)) return false;
                return true;
            });
        }

        const totalUsers = combinedUsers.length;
        const paginatedUsers = combinedUsers.slice(skip, skip + parsedLimit);

        res.status(200).json({
            message: "Suggested users fetched successfully",
            users: paginatedUsers,
            pagination: {
                total: totalUsers,
                page: parsedPage,
                totalPages: Math.ceil(totalUsers / parsedLimit),
                limit: parsedLimit,
            },
        });

    } catch (error) {
        console.log(`\n\n\nError in getSuggestedUsers : `, error);
        res.status(500).json({ message: "Error occurred in getSuggestedUsers", error });
    }
};


// ===================== Filters Supported by `getAllUsers` and `getSuggestedUsers` APIs ===================== //

// 1️⃣ Name-Based Filter (name parameter)
// --------------------------------------------------
// - Searches for users where `name` contains the given keyword (case-insensitive)

// 2️⃣ Gender Filter (gender parameter)
// --------------------------------------------------
// "0" -> Male
// "1" -> Female

// 3️⃣ Email-Based Filter (email parameter)
// --------------------------------------------------
// - Searches for users where `email` contains the given keyword (case-insensitive)

// 4️⃣ Graduation Year Filter (graduation_year parameter)
// --------------------------------------------------
// - Fetches users who graduated in the specified year

// 5️⃣ Current Status Filter (current_status parameter)
// --------------------------------------------------
// "0" -> Student
// "1" -> Alumni

// 6️⃣ Job Title Filter (job_title parameter)
// --------------------------------------------------
// - Searches for users where `job_title` contains the given keyword (case-insensitive)

// 7️⃣ Company Filter (company parameter)
// --------------------------------------------------
// - Searches for users where `company` contains the given keyword (case-insensitive)

// 8️⃣ Pagination (page & limit parameters) - Only for `getAllUsers`
// --------------------------------------------------
// page  -> Specifies which page of results to return (default: 1)
// limit -> Specifies the number of users per page (default: 10)

// ⚠️ Important Differences:
// ✅ `getAllUsers` -> Applies filters to all non-blocked users & supports pagination
// ✅ `getSuggestedUsers` -> Applies filters only to suggested users (friends of friends, mentors of friends) & returns up to 8 users

export {

    checkAccess,
    getCurrentUser,

    registerUser,
    loginUser,
    logoutUser,

    updateUserDetails,
    updateUserAvatar,
    updateUserBanner,
    refreshAccessToken,
    changeCurrentPassword,

    followUnfollowUser,
    getSuggestedUsers,
    getUserById,
    searchUser,
    getFollowersAndFollowing,
    getMentorsOrMentees,
    getAllUsers,
    verifyOTP,

}
