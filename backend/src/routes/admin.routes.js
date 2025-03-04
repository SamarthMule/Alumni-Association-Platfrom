import {Router} from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { 
    blockOrUnblockEntity,
    getBlockedEntities,
    uploadStudents
} from '../controllers/admin.controller.js';

import {verifyJWT} from '../middlewares/auth.middleware.js'
import {verifyAdmin} from '../middlewares/admin.middleware.js'

const router = Router();
router.get("/blocked/:entityName", verifyJWT, verifyAdmin, getBlockedEntities);
router.put("/block-unblock/:entityName/:id", verifyJWT, verifyAdmin, blockOrUnblockEntity);
router.post("/students/upload", verifyJWT, verifyAdmin, upload.single("attachment"), uploadStudents);

export default router;
