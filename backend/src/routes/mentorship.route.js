import {Router} from "express";

import { 
    requestMentorship,
    acceptMentorship,
    dissolveMentorship,
    getAllMentorships
} from '../controllers/mentorship.controller.js';

import {verifyJWT} from '../middlewares/auth.middleware.js'
import {verifyStudent} from '../middlewares/student.middleware.js'
import {verifyAlumni} from '../middlewares/alumni.middleware.js'
import {verifyAdmin} from '../middlewares/admin.middleware.js'

const router = Router();
router.post("/request", verifyJWT, verifyStudent, requestMentorship);
router.put("/accept/:mentorshipId", verifyJWT, verifyAlumni, acceptMentorship);
router.put("/dissolve/:id", verifyJWT, dissolveMentorship);
router.get("/", verifyJWT, getAllMentorships);

export default router;
