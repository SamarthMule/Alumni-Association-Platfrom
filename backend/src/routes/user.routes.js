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

} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
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

// router.route("/refresh-access-token").post(verifyRefreshToken, refreshAccessToken);


export default router;