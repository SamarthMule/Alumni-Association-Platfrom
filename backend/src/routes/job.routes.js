import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import {
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobsAppliedByUser,
    getAllJobs,
    getSuggestedJobs,
    getUserJobPosts
} from "../controllers/job.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { verifyAlumni } from "../middlewares/alumni.middleware.js";

const router = Router();

router.get("/myjobs", verifyJWT, getUserJobPosts);
router.post("/", verifyJWT, createJob);
router.put("/:id", verifyJWT, updateJob);
router.delete("/:id", verifyJWT, deleteJob);
router.get("/:id", verifyJWT, getJobById);
router.get("/", verifyJWT, getAllJobs);
router.get("/:id/suggested", verifyJWT, getSuggestedJobs);
router.get("/:id/applied", verifyJWT, getJobsAppliedByUser);

export default router;
