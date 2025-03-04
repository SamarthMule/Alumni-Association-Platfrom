import { Mentorship } from "../models/mentorship.model.js"
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const requestMentorship = async (req, res) => {
    const { mentorId, menteeId } = req.body;  // Assuming mentorId and menteeId are passed in the request body

    try {
        // Check if the mentorship request already exists
        const mentorExists = await User.findOne({ _id: new mongoose.Types.ObjectId(mentorId) });
        const menteeExists = await User.findOne({ _id: new mongoose.Types.ObjectId(menteeId) });

        if (!mentorExists) {
            return res.status(400).json({ message: "Mentor not found." });
        }
        if (!menteeExists) {
            return res.status(400).json({ message: "Mentee not found." });

        }

        if (mentorExists.
            current_status === 'student') return res.status(400).json({ message: "Student cannot be mentor." });
        if (menteeExists.
            current_status === 'alumni') return res.status(400).json({ message: "Alumni cannot be mentee." });

        const existingRequest = await Mentorship.findOne({ mentor: mentorId, mentee: menteeId });

        if (existingRequest && existingRequest.status === "accepted") {
            return res.status(400).json({ message: "Mentorship already exists with status accepted." });
        } else if (existingRequest && existingRequest.status === "requested") {
            return res.status(400).json({ message: "Mentorship already exists with status requested." });
        }

        if (existingRequest && existingRequest.status === "dissolved") {
            existingRequest.status = "requested";
            await existingRequest.save();
            return res.status(201).json({
                message: "Mentorship request created successfully.",
                mentorship: existingRequest,
            });
        }

        let doMentorExists = await Mentorship.find({ mentor: new mongoose.Types.ObjectId(mentorId) });
        if (doMentorExists && doMentorExists.length > 0) {
            doMentorExists = doMentorExists[0];
            console.log("dododo", doMentorExists);
            doMentorExists?.mentee?.push(menteeId);
            await doMentorExists.save();
            return res.status(201).json({
                message: "Mentorship request created successfully.",
                mentorship: doMentorExists
            });
        }
        // Create a new mentorship request
        const newMentorship = new Mentorship({
            mentor: mentorId,
            mentee: [menteeId],  // mentee is stored as an array, even if there's only one
            status: "requested",  // Status is set to "requested" when a student asks for mentorship
        });

        await newMentorship.save();

        res.status(201).json({
            message: "Mentorship request created successfully.",
            mentorship: newMentorship,
        });
    } catch (error) {
        console.log("\n\n\nError in requestMentorship : ", error);
        res.status(500).json({ message: "Error occurred in requestMentorship", error: error.message });
    }
};

const acceptMentorship = async (req, res) => {
    const { mentorshipId } = req.params;
    console.log(`\n\nEnetered `, mentorshipId)
    try {
        // Find the mentorship for the mentor
        const mentorship = await Mentorship.findOne({ _id: new mongoose.Types.ObjectId(mentorshipId) });

        if (!mentorship) {
            return res.status(404).json({ message: "Mentorship not found" });
        }

        // Logic to mark the mentorship as accepted and set start_date
        mentorship.status = "accepted";
        mentorship.start_date = new Date();
        await mentorship.save();

        res.status(200).json({ message: "Mentorship accepted", mentorship });
    } catch (error) {
        console.log("\n\n\nError in acceptMentorship : ", error);
        res.status(500).json({ message: "Error occurred in acceptMentorship", error: error.message });
    }
};

const dissolveMentorship = async (req, res) => {
    const { id } = req.params;

    try {
        // Find mentorship by id
        const mentorship = await Mentorship.findById(id);

        if (!mentorship) {
            return res.status(404).json({ message: "Mentorship not found" });
        }

        // Set the end date to current date and mark as dissolved
        mentorship.end_date = new Date();
        mentorship.status = "dissolved";

        await mentorship.save();

        res.status(200).json({ message: "Mentorship dissolved", mentorship });
    } catch (error) {
        console.log("\n\n\nError in dissolveMentorship : ", error);
        res.status(500).json({ message: "Error occurred in dissolveMentorship", error: error.message });
    }
};

const getAllMentorships = async (req, res) => {
    try {
        let { studentId, alumniId, page = 1, limit = 10 } = req.query;

        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        let filter = {};

        // Step 2: Apply direct filtering by studentId and alumniId (if provided)
        if (studentId) {
            studentId = new mongoose.Types.ObjectId(studentId);
            filter.mentee = {$in: [studentId]};
        } // Ensure it matches inside the mentee array
        if (alumniId) {
            alumniId = new mongoose.Types.ObjectId(alumniId);
            filter.mentor = alumniId; // Direct match
        }
        
        // Step 3: Fetch filtered mentorships
        const mentorships = await Mentorship.find(filter)
            .skip(skip)
            .limit(parsedLimit)
            .populate("mentor", "name")
            .populate("mentee", "name");

            let alumniIid = new mongoose.Types.ObjectId(alumniId)
        console.log(`\n\nment`, typeof alumniIid)
        const totalMentorships = await Mentorship.countDocuments(filter);

        if (mentorships && !mentorships.length) {
            return res.status(404).json({ message: "No mentorships found." });
        }

        return res.status(200).json({
            mentorships,
            pagination: {
                total: totalMentorships,
                page: parsedPage,
                totalPages: Math.ceil(totalMentorships / parsedLimit),
                limit: parsedLimit,
            },
        });
    } catch (error) {
        console.error("Error in getAllMentorships:", error);
        return res.status(500).json({
            message: "Error occurred in getAllMentorships",
            error: error.message,
        });
    }
};


// Filters supported in getAllMentorships API:
//
// 1. studentName (query) - Filters mentorships where the mentee's name matches the given value (case-insensitive search).
//    Example: ?studentName=John
//
// 2. alumniName (query) - Filters mentorships where the mentor's name matches the given value (case-insensitive search).
//    Example: ?alumniName=Doe
//
// 3. studentId (query) - Filters mentorships by a specific mentee ID.
//    Example: ?studentId=65a2f9b8c3e1d4f7a2b3c8e9
//
// 4. alumniId (query) - Filters mentorships by a specific mentor ID.
//    Example: ?alumniId=65b3d2e8a1c4e3b9f2d7a6c4
//
// 5. Pagination:
//    - page (query) - Specifies the page number for paginated results (default: 1).
//      Example: ?page=2
//    - limit (query) - Specifies the number of results per page (default: 10).
//      Example: ?limit=5


export {
    requestMentorship,
    acceptMentorship,
    dissolveMentorship,
    getAllMentorships
};