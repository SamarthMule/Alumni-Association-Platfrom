import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import {
    createJob,
    updateJob,
    deleteJob,

    getJobById,
    getJobsAppliedByUser,

    getAllJobs,
    getSuggestedJobs
} from "../controllers/job.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { verifyAlumni } from "../middlewares/alumni.middleware.js";

const router = Router();

router.post("/", verifyJWT, verifyAlumni, createJob);

router.put("/:id", verifyJWT, verifyAlumni, updateJob);
router.delete("/:id", verifyJWT,verifyAlumni, deleteJob);
router.get("/:id", verifyJWT, getJobById);

router.get("/", verifyJWT, getAllJobs);
router.get("/:id/suggested", verifyJWT, getSuggestedJobs);
router.get("/:id/applied", verifyJWT, getJobsAppliedByUser);

export default router;
