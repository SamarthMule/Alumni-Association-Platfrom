import mongoose from "mongoose";
import { Job } from "../models/job.model.js";
import { Mentorship } from "../models/mentorship.model.js";
import { User } from "../models/user.model.js";
const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            company,
            location,
            skillsRequired,
            deadline,
            contactInfo,
        } = req.body;

        const missingFields = [];
        if (!title) missingFields.push("title");
        if (!description) missingFields.push("description");
        if (!company) missingFields.push("company");
        if (!location) missingFields.push("location");
        if (!skillsRequired || skillsRequired.length === 0)
            missingFields.push("skillsRequired");
        if (!contactInfo) missingFields.push("contactInfo");
        // if (contactInfo && !contactInfo.email)
        //     missingFields.push("email in contactInfo");
        if (contactInfo && !contactInfo.mobile)
            missingFields.push("mobile in contactInfo");
        let bannerUrl = null;
        
        if (missingFields.length > 0)
            return res
        .status(400)
        .json({
            message: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"
            } required`,
        });
        
        if (req.file) {
            const localPath = req.file.path;
            console.log("Uploading banner from path:", localPath);
            const banner = await uploadOnCloudinary(localPath);
            if (!banner.url) {
                return res.status(400).json({ message: "Error while uploading banner on Cloudinary" });
            }
            bannerUrl = banner.url;
        }

        const job = new Job({
            title,
            description,
            company,
            location,
            skillsRequired,
            deadline,
            contactInfo,
            bannerUrl,
        });
        job.referredBy.push(req.user._id);
        job.creator = req.user._id;
        await job.save();

        res.status(201).json({ message: "Job created successfully", job });
    } catch (error) {
        console.log("\n\n\nError in createJob : ", error);
        res.status(500).json({
            message: "Error occurred in createJob",
            error: error.message,
        });
    }
};

const applyForJob = async (req, res) => {
    try {
        const { jobId, userId } = req.body;

        if (!jobId || !userId) {
            return res.status(400).json({ message: "Job ID and User ID are required" });
        }

        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: "Job not found" });

        // Ensure applicants field exists
        if (!job.applicants) {
            job.applicants = [];
        }

        // Check if user already applied
        if (job.applicants.includes(userId)) {
            return res.status(400).json({ message: "You have already applied for this job." });
        }

        // Add user to applicants array
        job.applicants.push(new mongoose.Types.ObjectId(userId));  // ✅ Ensure ObjectId format
        await job.save();

        res.status(200).json({ message: "Application successful" });
    } catch (error) {
        console.error("Error in applyForJob:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const updateJob = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const updates = req.body;

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ error: "Job not found" });

        if (job.creator.toString() !== userId.toString())
            return res
                .status(401)
                .json({
                    message: "Unauthorized request",
                    error: "Only job creator can update job",
                });

        job.title = updates.title ?? job.title;
        job.description = updates.description ?? job.description;
        job.company = updates.company ?? job.company;
        job.location = updates.location ?? job.location;
        job.skillsRequired = updates.skillsRequired ?? job.skillsRequired;
        job.deadline = updates.deadline ?? job.deadline;
        job.contactInfo = updates.contactInfo ?? job.contactInfo;

        await job.save();

        res.status(200).json({ message: "Job updated successfully", job });
    } catch (error) {
        console.log("\n\n\nError in updateJob : ", error);
        res.status(500).json({ message: "Error occurred in updateJob", error });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const job = await Job.findById(id);

        if (!job) return res.status(404).json({ error: "Job not found" });

        if (job.creator.toString() !== userId.toString())
            return res
                .status(401)
                .json({
                    message: "Unauthorized request",
                    error: "Only job creator can update job",
                });
        await Job.deleteOne({ _id: id });

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        console.log("\n\n\nError in deleteJob : ", error);
        res.status(500).json({ message: "Error occurred in deleteJob", error });
    }
};

const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) return res.status(404).json({ error: "Job not found" });

        res.status(200).json({ message: "Job retrieved successfully", job });
    } catch (error) {
        console.log("\n\n\nError in getJobById : ", error);
        res.status(500).json({
            message: "Error occurred in getJobById",
            error,
        });
    }
};

const getFilteredJobs = async (jobs, filter, sortBy) => {
    const query = [];

    if (filter) {
        const regexFilter = new RegExp(filter, "i");
        query.push({
            $or: [
                { title: regexFilter },
                { description: regexFilter },
                { company: regexFilter },
                { location: regexFilter },
                {
                    skillsRequired: {
                        $elemMatch: { $regex: regexFilter, $options: "i" },
                    },
                },
            ],
        });
    }

    const now = new Date();
    switch (filter) {
        case "deadline:today":
            query.push({
                deadline: {
                    $gte: new Date().setHours(0, 0, 0, 0),
                    $lt: new Date().setHours(23, 59, 59, 999),
                },
            });
            break;
        case "deadline:tomorrow":
            query.push({
                deadline: {
                    $gte: new Date(now.setDate(now.getDate() + 1)).setHours(
                        0,
                        0,
                        0,
                        0
                    ),
                    $lt: new Date(now.setDate(now.getDate() + 1)).setHours(
                        23,
                        59,
                        59,
                        999
                    ),
                },
            });
            break;
        case "deadline:nextWeek":
            query.push({
                deadline: {
                    $gte: now,
                    $lt: new Date(now.setDate(now.getDate() + 7)),
                },
            });
            break;
        case "deadline:afterNextWeek":
            query.push({
                deadline: { $gt: new Date(now.setDate(now.getDate() + 7)) },
            });
            break;
        default:
            break;
    }

    let filteredJobs =
        query.length > 0
            ? jobs.filter((job) =>
                query.every((q) =>
                    Object.keys(q).some((key) => q[key].test(job[key] || ""))
                )
            )
            : jobs;

    if (sortBy) {
        const sortOptions = {
            lowestApplicants: (a, b) =>
                a.applicants.length - b.applicants.length,
            highestApplicants: (a, b) =>
                b.applicants.length - a.applicants.length,
            deadlineSoonest: (a, b) =>
                new Date(a.deadline) - new Date(b.deadline),
            deadlineLatest: (a, b) =>
                new Date(b.deadline) - new Date(a.deadline),
        };
        filteredJobs = filteredJobs.sort(sortOptions[sortBy]);
    }

    return filteredJobs;
};

// Get All Jobs - Returns Latest Jobs First
const getAllJobs = async (req, res) => {
    try {
        const { page = 1, limit = 10, filter, sortBy } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        let query = {};
        let jobsQuery = Job.find(query).sort({ createdAt: -1 });

        let jobs = await jobsQuery.skip(skip).limit(parsedLimit);
        jobs = await getFilteredJobs(jobs, filter, sortBy);

        const totalJobs = await Job.countDocuments(query);

        return res.status(200).json({
            message: "All jobs retrieved successfully",
            jobs,
            pagination: {
                total: totalJobs,
                page: parsedPage,
                totalPages: Math.ceil(totalJobs / parsedLimit),
                limit: parsedLimit,
            },
        });
    } catch (error) {
        console.log("\n\n\nError in getAllJobs:", error);
        return res
            .status(500)
            .json({ message: "Error occurred in getAllJobs", error });
    }
};

// Get Suggested Jobs - Returns Latest Jobs First
const getSuggestedJobs = async (req, res) => {
    try {
        let userId = req.params.id ?? req.user._id;
        const { page = 1, limit = 10, filter, sortBy } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        let mentorIds = [];
        userId = new mongoose.Types.ObjectId(userId);
        const userObj = await User.findById(userId);
        const userMentorships = await Mentorship.find({
            mentee: { $in: [userId] },
        });
        if (userMentorships && userMentorships.length > 0)
            mentorIds = userMentorships.map((ment) => ment.mentor);
        mentorIds = userObj?.followers?.map(
            (flwr) => flwr.current_status.toLowerCase() === "alumni"
        );
        mentorIds.concat(
            userObj?.following?.map(
                (flwr) => flwr.current_status.toLowerCase() === "alumni"
            )
        );

        console.log(mentorIds);

        let jobs = await Job.find({
            $or: [
                { creator: { $in: mentorIds } }, // If creator is one of the mentorIds
                { referredBy: { $elemMatch: { $in: mentorIds } } }, // If at least one mentorId exists in referredBy array
            ],
        })
            .skip(skip)
            .limit(parsedLimit);

        const totalJobs = jobs.length;
        jobs = await getFilteredJobs(jobs, filter, sortBy);

        return res.status(200).json({
            message: "Suggested jobs retrieved successfully",
            jobs,
            pagination: {
                total: totalJobs,
                page: parsedPage,
                totalPages: Math.ceil(totalJobs / parsedLimit),
                limit: parsedLimit,
            },
        });
    } catch (error) {
        console.log("\n\n\nError in getSuggestedJobs:", error);
        return res
            .status(500)
            .json({ message: "Error occurred in getSuggestedJobs", error });
    }
};

const getJobsAppliedByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = new mongoose.Types.ObjectId(id);

        let jobs = await Job.find({ applicants: userId }).populate("applicants", "name email"); // ✅ Populate applicants
        return res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error in getJobsAppliedByUser:", error);
        return res.status(500).json({ message: "Error occurred", error });
    }
};


// Get Jobs Posted of a User
const getUserJobPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const { page = 1, limit = 10, filter, sortBy } = req.query;
        const parsedPage = parseInt(page, 10);
        const parsedLimit = parseInt(limit, 10);
        const skip = (parsedPage - 1) * parsedLimit;

        const jobs = await Job.find({ creator: userId })
            .skip(skip)
            .limit(parsedLimit);
        const totalJobs = await Job.countDocuments({ creator: userId });

        return res.status(200).json({
            message: "User jobs retrieved successfully",
            jobs,
            pagination: {
                total: totalJobs,
                page: parsedPage,
                totalPages: Math.ceil(totalJobs / parsedLimit),
                limit: parsedLimit,
            },
        });
    } catch (error) {
        console.log("\n\n\nError in getUserJobPosts:", error);
        return res
            .status(500)
            .json({ message: "Error occurred in getUserJobPosts", error });
    }
};

/**
 * Supported Filters:
 * - Title: Matches jobs with the given keyword in the title (case-insensitive).
 * - Description: Matches jobs where the description contains the keyword.
 * - Company: Filters jobs based on the company name.
 * - Location: Filters jobs based on the job location.
 * - Skills Required: Filters jobs where required skills contain the keyword.
 *
 * Deadline-Based Filters:
 * - "deadline:today" → Jobs with deadlines today.
 * - "deadline:tomorrow" → Jobs with deadlines tomorrow.
 * - "deadline:7days" → Jobs with deadlines within the next 7 days.
 * - "deadline:morethan7days" → Jobs with deadlines more than 7 days from today.
 *
 * Sorting Options:
 * - "lowestApplicants" → Sorts jobs by the fewest applicants first.
 * - "highestApplicants" → Sorts jobs by the most applicants first.
 * - "deadlineSoonest" → Sorts jobs by the closest deadline first.
 * - "deadlineLatest" → Sorts jobs by the farthest deadline first.
 *
 * Filtering Scope in Each API:
 * - getAllJobs → Filters applied on all jobs in the database.
 * - getSuggestedJobs → Filters applied only on jobs suggested by the user's mentor and friends.
 * - getJobsAppliedByUser → Filters applied only on jobs the user has applied to.
 */

// router.post("/job", createJob);
// router.put("/job/:jobId", updateJob);
// router.delete("/job/:jobId", deleteJob);

// router.get("/job/:jobId", getJobById);
// router.get("/user/jobs", getJobsAppliedByUser);

// router.get("/jobs", getAllJobs);
// router.get("/jobs/suggested", getSuggestedJobs);

export {
    createJob,
    updateJob,
    deleteJob,
    getJobById,
    getJobsAppliedByUser,
    getAllJobs,
    getSuggestedJobs,
    getUserJobPosts,
    applyForJob,
};
