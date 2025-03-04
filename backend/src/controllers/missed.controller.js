// routes/apiRoutes.js
import express from "express";
import { applyForJob, participateInEvent } from "../controllers/jobEventController.js";
import { updateComment, deleteComment, getPostComments, getEventComments } from "../controllers/commentController.js";
import { searchAlumni, searchStudents } from "../controllers/userController.js";

const router = express.Router();

// Job and Event Routes
router.post("/jobs/:jobId/apply", applyForJob);
router.post("/events/:eventId/participate", participateInEvent);

// Comment Routes
router.put("/comments/:commentId", updateComment);
router.delete("/comments/:commentId", deleteComment);
router.get("/posts/:postId/comments", getPostComments);
router.get("/events/:eventId/comments", getEventComments);

// User Search Routes
router.get("/users/alumni", searchAlumni);
router.get("/users/students", searchStudents);

export default router;


// controllers/jobEventController.js
import { Job } from "../models/job.js";
import { Event } from "../models/event.js";

// Apply for a Job
export const applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (!job.applicants.includes(req.user._id)) {
            job.applicants.push(req.user._id);
            await job.save();
        }
        res.status(200).json({ message: "Applied successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Participate in an Event
export const participateInEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (!event.participants.includes(req.user._id)) {
            event.participants.push(req.user._id);
            await event.save();
        }
        res.status(200).json({ message: "Participation successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// controllers/commentController.js
import { Comment } from "../models/comment.js";

// Update a Comment
export const updateComment = async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, req.body, { new: true });
        if (!updatedComment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a Comment
export const deleteComment = async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!deletedComment) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ message: "Comment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get comments of a Post
export const getPostComments = async (req, res) => {
    try {
        const comments = await Comment.find({ post_id: req.params.postId }).populate("user");
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get comments of an Event
export const getEventComments = async (req, res) => {
    try {
        const comments = await Comment.find({ event_id: req.params.eventId }).populate("user");
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// controllers/userController.js
import { User } from "../models/user.js";

// Search Alumni
export const searchAlumni = async (req, res) => {
    try {
        const query = req.query.name ? { name: new RegExp(req.query.name, "i"), current_status: "alumni" } : { current_status: "alumni" };
        const alumni = await User.find(query);
        res.status(200).json(alumni);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Search Students
export const searchStudents = async (req, res) => {
    try {
        const query = req.query.name ? { name: new RegExp(req.query.name, "i"), current_status: "student" } : { current_status: "student" };
        const students = await User.find(query);
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
