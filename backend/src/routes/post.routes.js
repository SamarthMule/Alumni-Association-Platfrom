import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import {
    createPost,
    updatePost,
    deletePost,

    likeUnlikePost,
    commentOnPost,

    getLikedPost,
    getPostOfFollowings,
    getUserPostsById,
    getPostById,

    getAllPosts,
    getSuggestedPosts
} from "../controllers/post.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/")
    .get(verifyJWT, getAllPosts)
    .post(verifyJWT, upload.single("attachment"), createPost)

router.route("/:id")
    .get(verifyJWT, getPostById)
    .put(verifyJWT, upload.single("attachment"), updatePost)
    .delete(verifyJWT, deletePost);

router.post("/:id/like-unlike", verifyJWT, likeUnlikePost);
router.route("/:id/comment").get(verifyJWT, commentOnPost);
router.route("/:id/liked").get(verifyJWT, getLikedPost);

router.route("/:id/following").get(verifyJWT, getPostOfFollowings);
router.route("/:id/post").get(verifyJWT, getUserPostsById);

router.route("/post/suggested-post").get(verifyJWT, getSuggestedPosts);



export default router;