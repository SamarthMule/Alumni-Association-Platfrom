import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import {

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


} from "../controllers/user.controller.js"


import { sendOTP } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { CollegeDB } from "../models/collegeDb.model.js";
// import { verifyRefreshToken } from "../middlewares/refreshToken.middleware.js";


const router = Router();

router.route("/").get(verifyJWT, getAllUsers);
router.route("/user/:id").get(verifyJWT, getUserById);
router.route("/search").get(verifyJWT, searchUser);
router.route("/check-access").post(checkAccess);
router.route("/currentUser").get(verifyJWT, getCurrentUser);

router.route("/register").post(
    upload.single("avatar"),
    registerUser
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/update-profile").post(verifyJWT, updateUserDetails);
router.route("/change-avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/change-banner").post(verifyJWT, upload.single("avatar"), updateUserBanner);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.post("/follow-unfollow/:id", verifyJWT, followUnfollowUser);
router.route("/suggested-users").get(verifyJWT, getSuggestedUsers);
router.route("/followers-and-followings").get(verifyJWT, getFollowersAndFollowing);
router.route("/mentors-or-mentees").get(verifyJWT, getMentorsOrMentees);
router.route('/send-otp').post(sendOTP);
router.route('/verify-otp').post(verifyOTP);
// router.route("/refresh-access-token").post(verifyRefreshToken, refreshAccessToken);


router.post('/insert', async (req, res) => {
    try {
        const dataArray = req.body;
        console.log('=== dataArray user.routes.js [69] ===', dataArray);

        if (!Array.isArray(dataArray)) {
            return res.status(400).json({ error: 'Request body must be an array of objects' });
        }

        const validatedData = dataArray.map(item => new CollegeDB(item).toObject());
        const insertedData = await CollegeDB.insertMany(validatedData, { ordered: false }); // `ordered: false` skips duplicates

        res.status(201).json({ message: 'Data inserted successfully', insertedCount: insertedData.length });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'Duplicate key error' });
        } else {
            res.status(500).json({ error: 'An error occurred while inserting data' });
        }
    }
});

router.put('/update-gender', async (req, res) => {
    try {
        const users = await CollegeDB.find({});
        console.log('=== users user.routes.js [91] ===', users);

        const updatedUsers = [];
        for (const user of users) {
            if (user.gender === '0') {
                user.gender = 'male';
                updatedUsers.push(user);
            } else if (user.gender === '1') {
                user.gender = 'female';
                updatedUsers.push(user);
            }
            await user.save();
        }

        res.status(200).json({
            message: 'Data updated successfully',
            updatedCount: updatedUsers.length
        });
    } catch (error) {
        console.error('Error updating gender:', error);
        res.status(500).json({ error: 'An error occurred while updating gender' });
    }
});



export default router;