import { Router } from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAdmin, verifyAdminOrManager } from "../middlewares/admin.middleware.js"
import { verifyManager } from "../middlewares/manager.middleware.js"
import {
    createEvent,
    updateEvent,
    deleteEvent,
    commentOnEvent,

    getEventById,
    getAllEvents,
    getUpcomingEvents,
    getSuggestedEvents,
    getParticipatedEvents,

    createFeedback,
    getFeedbackById,
    updateFeedback,
    deleteFeedback,
    getAllFeedbacks,

    createSurvey,
    getSurveyById,
    updateSurvey,
    deleteSurvey,
    getAllSurveys,
    voteSurvey
} from "../controllers/event.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

// Event routes
router.route("/")
    .post(verifyJWT, upload.single("banner"), createEvent)
    .get(verifyJWT, getAllEvents)

router.route("/event/upcoming")
    .get(verifyJWT, getUpcomingEvents);
router.route("/event/suggested-events")
    .get(verifyJWT, getSuggestedEvents);
router.route("/event/:id/comment")
    .get(verifyJWT, commentOnEvent);
    
router.route("/:id")
    .get(verifyJWT, getEventById)
    .put(verifyJWT, upload.single("banner"), updateEvent)
    .delete(verifyJWT, upload.single("banner"), deleteEvent)

router.route("/event/participated")
    .get(verifyJWT, getParticipatedEvents);

// Feedback routes
router.route("/feedback/:id")
    .get(verifyJWT, verifyAdminOrManager, getFeedbackById)
    .put(verifyJWT, updateFeedback)
    .delete(verifyJWT, deleteFeedback);
router.route("/feedback")
    .get(verifyJWT, verifyAdminOrManager, getAllFeedbacks)
    .post(verifyJWT, createFeedback)
    

// Survey routes
router.route("/survey/:id")
    .get(verifyJWT, verifyAdminOrManager, getSurveyById)
    .put(verifyJWT, updateSurvey)
    .delete(verifyJWT, deleteSurvey)
router.route("/survey")
    .get(verifyJWT, verifyAdminOrManager, getAllSurveys)
    .post(verifyJWT, createSurvey)
router.route("/:surveyId/vote").patch(verifyJWT, voteSurvey);

export default router;


