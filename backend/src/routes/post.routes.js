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
import { getPostComments,deleteComment } from "../controllers/missed.controller.js";

const router = Router();

router.route("/")
    .get(verifyJWT, getAllPosts)
    .post(verifyJWT, upload.single("attachment"), createPost)

router.route("/:id")
    .get(verifyJWT, getPostById)
    .put(verifyJWT, upload.single("attachment"), updatePost)
    .delete(verifyJWT, deletePost);

router.post("/:id/like-unlike", verifyJWT, likeUnlikePost);
router.route("/:id/comment").post(verifyJWT, commentOnPost);
router.route("/:id/liked").get(verifyJWT, getLikedPost);

router.route("/:id/following").get(verifyJWT, getPostOfFollowings);
router.route("/:id/post").get(verifyJWT, getUserPostsById);

router.route("/post/suggested-post").get(verifyJWT, getSuggestedPosts);
router.get("/post/:postId/comments", getPostComments);
router.delete("/comments/:commentId", deleteComment);



export default router;