import fs from "fs";
import path from "path";
import xlsx from "xlsx";

import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Event } from "../models/event.model.js";

const blockOrUnblockEntity = async (req, res) => {
    try {
        const { entityName, id } = req.params;
        const { action } = req.body;

        if (!["block", "unblock"].includes(action)) {
            return res.status(400).json({ error: "Invalid action" });
        }

        const { default: EntityModel } = await import(`../models/${entityName}.model.js`);
        const entity = await EntityModel.findById(id);
        if (!entity) return res.status(404).json({ error: `${entityName} not found` });

        if (entity.blocked === (action === "block")) {
            return res.status(400).json({ error: `${entityName} is already ${action}ed` });
        }

        entity.blocked = action === "block";
        await entity.save();

        res.status(200).json({ message: `${entityName} ${action}ed successfully`, entity });
    } catch (error) {
        console.error("Error in blockOrUnblockEntity:", error);
        res.status(500).json({ message: "Error occurred in blockOrUnblockEntity", error });
    }
};


const getBlockedEntities = async (req, res) => {
    try {
        const { entityName } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const EntityModel = await import(`../models/${entityName}.model.js`);
        const blockedEntities = await EntityModel.find({ blocked: true }).skip(skip).limit(limit);
        const totalBlocked = await EntityModel.countDocuments({ blocked: true });

        if (!blockedEntities.length) {
            return res.status(404).json({ error: `No blocked ${entityName} found` });
        }

        res.status(200).json({
            blockedEntities,
            pagination: {
                total: totalBlocked,
                page,
                totalPages: Math.ceil(totalBlocked / limit),
                limit,
            },
        });
    } catch (error) {
        console.error("Error in getBlockedEntities:", error);
        res.status(500).json({ message: "Error occurred in getBlockedEntities", error });
    }
};

// ✅ Ensure getBlockedEntities is exported correctly


const getAdminStats = async (req, res) => {  
    try {
        console.log("Fetching admin stats...");
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments();
        const eventsOrganized = await Event.countDocuments();

        console.log("Stats Retrieved:", { totalUsers, activeJobs, eventsOrganized });
        res.status(200).json({ totalUsers, activeJobs, eventsOrganized });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        console.log("Incoming request to /api/v1/admin/users", req.headers);  // ✅ Log headers
        console.log("User:", req.user); // ✅ Log user if using authentication

        const users = await User.find(); // ✅ Fetch users
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};


const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching jobs", error });
    }
};

const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
    }
};

const uploadStudents = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = path.join("./public/temp", req.file.filename);
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        if (!jsonData.length) {
            fs.unlinkSync(filePath);
            return res.status(400).json({ message: "Empty file" });
        }

        const batchSize = 10000;
        let studentsBatch = [];

        for (let i = 0; i < jsonData.length; i++) {
            const student = jsonData[i];

            studentsBatch.push({
                student_name: student.student_name,
                prn_no: student.prn_no,
                email: student.email,
                mobile_no: student.mobile_no,
                gender: student.gender,
                graduation_year: new Date(student.graduation_year),
                current_status: student.current_status,
            });

            if (studentsBatch.length === batchSize || i === jsonData.length - 1) {
                await CollegeDB.insertMany(studentsBatch, { ordered: false }).catch(() => {});
                studentsBatch = [];
            }
        }

        fs.unlinkSync(filePath);
        res.status(200).json({ message: "Students data uploaded successfully" });
    } catch (error) {
        console.error("Error in uploadStudents:", error);
        res.status(500).json({ message: "Error occurred in uploadStudents", error });
    }
};

// const getAllJobs = async (req, res) => {
//     try {
//         const jobs = await Job.find();
//         res.status(200).json(jobs);
//     } catch (error) {
//         console.error("Error fetching jobs:", error);
//         res.status(500).json({ message: "Failed to fetch jobs", error });
//     }
// };

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        await Job.findByIdAndDelete(id);
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.error("Error deleting job:", error);
        res.status(500).json({ message: "Failed to delete job", error });
    }
};
// ✅ Ensure uploadStudents is exported correctly

// // Get all events
// const getAllEvents = async (req, res) => {
//     try {
//         const events = await Event.find();
//         res.status(200).json(events);
//     } catch (error) {
//         console.error("Error fetching events:", error);
//         res.status(500).json({ message: "Failed to fetch events", error });
//     }
// };

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await Event.findByIdAndDelete(id);
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ message: "Failed to delete event", error });
    }
};
export {
    blockOrUnblockEntity,
    getAdminStats,
    getAllUsers,
    getAllJobs,
    getBlockedEntities,
    uploadStudents,
     deleteJob,getAllEvents, deleteEvent ,  // ✅ Added this export
};


