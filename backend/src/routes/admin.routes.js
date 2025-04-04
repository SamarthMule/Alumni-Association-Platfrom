import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { 
    blockOrUnblockEntity,
    getBlockedEntities,
    uploadStudents,
    getAdminStats,
    getAllUsers,getAllJobs,deleteJob ,getAllEvents,deleteEvent,deleteUser // ✅ Import getAllUsers function
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route('/:id').delete(verifyJWT, deleteUser);
router.get("/blocked/:entityName", verifyJWT, verifyAdmin, getBlockedEntities);
router.put("/block-unblock/:entityName/:id", verifyJWT, verifyAdmin, blockOrUnblockEntity);
router.post("/students/upload", verifyJWT, verifyAdmin, upload.single("attachment"), uploadStudents);

router.get("/stats", getAdminStats);
router.get("/users",  getAllUsers);  // ✅ Add this line
router.get("/jobs",  getAllJobs);
router.delete("/jobs/:id",  deleteJob);
router.get("/events", getAllEvents);
router.delete("/events/:id", deleteEvent);

export default router;
