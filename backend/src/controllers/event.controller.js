// See i want notifications when
// 1) user registers into an event, notification of meeting link
// 2) For event, 10 minutes prior to start, a notification for informing user about event
// 3) when user create a post, notification to his network
// 4) when user created a job, notification to his network
// 5) when user likes, comments on any post,event notification to owner of that post
// 6) whenver feedback of last event in which user participated is published notification should come
// 7) whenever any survey is published via manager notification should come
// 8) when user status is changed from student to alumni, notification should go to admin and repective users.
// 9) when any user reports about abusive content, notification should go to admin and one notification from admin should go to both user who reported and user(which is being reported)
// 10) whenver user request mentorship, notification should go to respective alumni
// 11) when mentorship is accepted, notification should got to respective student 

import { Survey } from "../models/survey.model.js";
import { Feedback } from "../models/feedback.model.js";
import { Event } from "../models/event.model.js"
import { User } from "../models/user.model.js";

// Event controllers
const createEvent = async (req, res) => {
    try {
        console.log("Received event data:", req.body);

        const { title, description, date, time, location } = req.body;

        if (!title || !date || !location || !time) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const event = await Event.create({
            title,
            description,
            date,
            time,
            location,
            organized_by: [req.user._id]
        });

        res.status(201).json({ message: "Event created successfully", event });
    } catch (error) {
        console.error("🔥 Error in createEvent:", error.message);
        res.status(500).json({ message: "Error occurred in createEvent", error: error.message });
    }
};


const updateEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;
        const updates = req.body;

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        if (event.organizer.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Unauthorized request to update event" });
        }

        if (req.file) {
            if (event.banner) {
                const attachmentId = event.banner.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(attachmentId);
            }

            const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "auto",
            });
            event.banner = uploadedResponse.secure_url;
        }

        event.title = updates.title ?? event.title;
        event.description = updates.description ?? event.description;
        event.date = updates.date ?? event.date;
        event.time = updates.time ?? event.time;
        event.location = updates.location ?? event.location;
        event.speakers = updates.speakers ?? event.speakers;
        event.organized_by = updates.organized_by ?? event.organized_by;

        await event.save();

        res.status(200).json({ message: "Event updated successfully", event });
    } catch (error) {
        console.log("\n\n\nError in updateEvent : ", error);
        res.status(500).json({ message: "Error occurred in updateEvent", error });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id);
        if (!event) return res.status(404).json({ error: "Event not found" });

        if (event.banner) {
            const attachmentId = event.banner.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy(attachmentId);
        }

        await Event.findByIdAndDelete(id);

        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        console.log("\n\n\nError in deleteEvent : ", error);
        res.status(500).json({ message: "Error occurred in deleteEvent", error });
    }
};

const commentOnEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ "message": "Content is required for posting a comment" })
        }

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const comment = await Comment.create({
            content,
            event_id: id,
            user: req.user._id,
        });

        event.comments.push(comment._id);
        await event.save();

        res.status(201).json({
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        console.log("\n\n\nError in commentOnEvent : ", error);
        res.status(500).json({ message: "Error occurred in commentOnEvent", error });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findById(id)
            .populate("speakers", "name email")
            .populate("organized_by", "name email")
            .populate("participants", "name email")
            .populate("feedbacks")
            .populate("surveys")
            .populate("comments");

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event retrieved successfully", event });
    } catch (error) {
        console.log("\n\n\nError in getEventById : ", error);
        res.status(500).json({ message: "Error occurred in getEventById", error });
    }
};

const applyFiltersAndPagination = (events, query) => {
    let { page = 1, limit = 10, title, description, location, speaker_name, organized_by, dateFilter, timeFilter, pastEvents } = query;

    page = parseInt(page);
    limit = parseInt(limit);

    // Apply text filters
    if (title) {
        const regex = new RegExp(title, "i");
        events = events.filter(event => regex.test(event.title));
    }
    if (description) {
        const regex = new RegExp(description, "i");
        events = events.filter(event => regex.test(event.description));
    }
    if (location) {
        const regex = new RegExp(location, "i");
        events = events.filter(event => regex.test(event.location));
    }

    // Match speaker & organizer names
    if (speaker_name) {
        const regex = new RegExp(speaker_name, "i");
        events = events.filter(event => event.speakers.some(speaker => regex.test(speaker.name)));
    }
    if (organized_by) {
        const regex = new RegExp(organized_by, "i");
        events = events.filter(event => regex.test(event.organized_by.name));
    }

    // Apply date filters
    const now = new Date();
    switch (dateFilter) {
        case "today":
            events = events.filter(event => event.date.toDateString() === now.toDateString());
            break;
        case "tomorrow":
            const tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            events = events.filter(event => event.date.toDateString() === tomorrow.toDateString());
            break;
        case "next7days":
            const next7Days = new Date();
            next7Days.setDate(now.getDate() + 7);
            events = events.filter(event => event.date >= now && event.date <= next7Days);
            break;
        case "past":
            events = events.filter(event => event.date < now);
            break;
    }

    // Apply time filters
    if (timeFilter) {
        events = events.filter(event => {
            const eventHour = new Date(event.date).getHours();
            if (timeFilter === "morning") return eventHour >= 10 && eventHour < 12;
            if (timeFilter === "afternoon") return eventHour >= 14 && eventHour < 16;
            if (timeFilter === "evening") return eventHour >= 18 && eventHour < 20;
            return true;
        });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedEvents = events.slice(startIndex, startIndex + limit);

    return {
        events: paginatedEvents,
        totalEvents: events.length,
        currentPage: page,
        totalPages: Math.ceil(events.length / limit),
    };
};

const getAllEvents = async (req, res) => {
    try {
        let events = await Event.find().populate("speakers organized_by").exec();
        const result = applyFiltersAndPagination(events, req.query);

        res.status(200).json({
            message: "All events retrieved successfully",
            ...result
        });
    } catch (error) {
        console.log("\n\n\nError in getAllEvents : ", error);
        res.status(500).json({ message: "Error occurred in getAllEvents", error });
    }
};

const getParticipatedEvents = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        let events = await Event.find({
            $or: [{ participants: userId }, { speakers: userId }]
        }).populate("speakers organized_by").exec();
        const result = applyFiltersAndPagination(events, req.query);

        res.status(200).json({
            message: "Participated events retrieved successfully",
            ...result
        });
    } catch (error) {
        console.log("\n\n\nError in getParticipatedEvents : ", error);
        res.status(500).json({ message: "Error occurred in getParticipatedEvents", error });
    }
};

const getUpcomingEvents = async (req, res) => {
    try {
        let events = await Event.find({ date: { $gte: new Date() } }).populate("speakers organized_by").exec();
        const result = applyFiltersAndPagination(events, req.query);

        res.status(200).json({
            message: "Upcoming events retrieved successfully",
            ...result
        });
    } catch (error) {
        console.log("\n\n\nError in getUpcomingEvents : ", error);
        res.status(500).json({ message: "Error occurred in getUpcomingEvents", error });
    }
};

const getSuggestedEvents = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const now = new Date();

        // Fetch user and relations
        const user = await User.findById(userId)
            .populate("friends following mentor mentees")
            .exec();

        const friendIds = user.friends.map(friend => friend._id);
        const menteeIds = user.mentees.map(mentee => mentee._id);
        const mentorIds = user.mentor ? [user.mentor._id] : [];

        // Fetch suggested events (only upcoming)
        let events = await Event.find({
            date: { $gte: now },
            $or: [
                { participants: { $in: friendIds } },
                { participants: { $in: menteeIds } },
                { participants: { $in: mentorIds } },
                { speakers: { $in: friendIds } },
                { speakers: { $in: menteeIds } },
                { speakers: { $in: mentorIds } },
            ]
        }).populate("speakers organized_by").exec();

        const result = applyFiltersAndPagination(events, req.query);

        res.status(200).json({
            message: "Suggested events retrieved successfully",
            ...result
        });
    } catch (error) {
        console.log("\n\n\nError in getSuggestedEvents : ", error);
        res.status(500).json({ message: "Error occurred in getSuggestedEvents", error });
    }
};

// Feedback controllers
const createFeedback = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { content, event_id, ratings } = req.body;

        const feedback = new Feedback({
            user: userId,
            content,
            event_id,
            ratings
        });

        await feedback.save();

        res.status(201).json({
            message: "Feedback created successfully",
            feedback
        });
    } catch (error) {
        console.log("\n\n\nError in createFeedback : ", error);
        res.status(500).json({ message: "Error occurred in createFeedback", error });
    }
};

const updateFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const { content, event_id, ratings } = req.body;

        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        if (feedback.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to update this feedback" });
        }

        feedback.content = content;
        feedback.event_id = event_id;
        feedback.ratings = ratings;

        await feedback.save();

        res.status(200).json({
            message: "Feedback updated successfully",
            feedback
        });
    } catch (error) {
        console.log("\n\n\nError in updateFeedback : ", error);
        res.status(500).json({ message: "Error occurred in updateFeedback", error });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        if (feedback.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this feedback" });
        }

        await feedback.deleteOne();

        res.status(200).json({
            message: "Feedback deleted successfully"
        });
    } catch (error) {

        console.log("\n\n\nError in deleteFeedback : ", error);
        res.status(500).json({ message: "Error occurred in deleteFeedback", error });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const { id } = req.params;
        const feedback = await Feedback.findById(id);

        if (!feedback) {
            return res.status(404).json({ error: "Feedback not found" });
        }

        res.status(200).json({
            message: "Feedback retrieved successfully",
            feedback
        });
    } catch (error) {
        console.log("\n\n\nError in getFeedbackById : ", error);
        res.status(500).json({ message: "Error occurred in getFeedbackById", error });
    }
};

const getAllFeedbacks = async (req, res) => {
    try {
        const { user_name, content, event_name, ratings, page = 1, limit = 10 } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        let filter = {};

        // Filter by partial matching of user_name
        if (user_name) {
            const users = await User.find({ name: { $regex: user_name, $options: "i" } }).select("_id");
            if (users.length > 0) {
                filter.user = { $in: users.map(user => user._id) };
            } else {
                return res.json({ feedbacks: [], total: 0, page: pageNum, totalPages: 0 });
            }
        }

        // Filter by content (partial match)
        if (content) {
            filter.content = { $regex: content, $options: "i" };
        }

        // Filter by event name (partial match)
        if (event_name) {
            const events = await Event.find({ title: { $regex: event_name, $options: "i" } }).select("_id");
            if (events.length > 0) {
                filter.event_id = { $in: events.map(event => event._id) };
            } else {
                return res.json({ feedbacks: [], total: 0, page: pageNum, totalPages: 0 });
            }
        }

        // Filter by ratings (between 0 and 5)
        if (ratings) {
            const ratingValue = parseFloat(ratings);
            if (!isNaN(ratingValue) && ratingValue >= 0 && ratingValue <= 5) {
                filter.ratings = ratingValue;
            } else {
                return res.status(400).json({ error: "Ratings must be a number between 0 and 5" });
            }
        }

        // Fetch feedbacks with pagination
        const feedbacks = await Feedback.find(filter)
            .populate("user", "name email")
            .populate("event_id", "title")
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const total = await Feedback.countDocuments(filter);

        res.json({
            feedbacks,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });
    } catch (error) {
        console.log("\n\n\nError in getAllFeedbacks : ", error);
        res.status(500).json({ message: "Error occurred in getAllFeedbacks", error });
    }
};

// Survey controllers
const createSurvey = async (req, res) => {
    try {
        const { title, options } = req.body;

        if (!Array.isArray(options) || options.length === 0) {
            return res.status(400).json({ error: "Options must be a non-empty array" });
        }

        const survey = new Survey({
            user: req.user._id, // Associate survey with the logged-in user
            title,
            options: options.map(option => ({ text: option }))
        });

        await survey.save();

        res.status(201).json({
            message: "Survey created successfully",
            survey
        });
    } catch (error) {
        console.log("\n\n\nError in createSurvey : ", error);
        res.status(500).json({ message: "Error occurred in createSurvey", error });
    }
};

const getSurveyById = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findById(id).populate("user", "name email");

        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        res.status(200).json({ survey });
    } catch (error) {
        console.log("\n\n\nError in getSurveyById : ", error);
        res.status(500).json({ message: "Error occurred in getSurveyById", error });
    }
};

const updateSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, options } = req.body;

        const survey = await Survey.findById(id);
        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        if (survey.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized to update this survey" });
        }

        if (title) survey.title = title;
        if (Array.isArray(options)) {
            survey.options = options.map(option => ({ text: option }));
        }

        await survey.save();

        res.status(200).json({
            message: "Survey updated successfully",
            survey
        });
    } catch (error) {
        console.log("\n\n\nError in updateSurvey : ", error);
        res.status(500).json({ message: "Error occurred in updateSurvey", error });
    }
};

const deleteSurvey = async (req, res) => {
    try {
        const { id } = req.params;
        const survey = await Survey.findById(id);

        if (!survey) {
            return res.status(404).json({ error: "Survey not found" });
        }

        if (survey.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized to delete this survey" });
        }

        await survey.deleteOne();

        res.status(200).json({ message: "Survey deleted successfully" });
    } catch (error) {
        console.log("\n\n\nError in deleteSurvey : ", error);
        res.status(500).json({ message: "Error occurred in deleteSurvey", error });
    }
};

const getAllSurveys = async (req, res) => {
    try {
        const { title, totalVotes, createdBy, page = 1, limit = 10 } = req.query;
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        let filter = {};

        // Filter by title (partial match)
        if (title) filter.title = { $regex: title, $options: "i" };

        // Filter by totalVotes (exact match)
        if (totalVotes) filter.totalVotes = Number(totalVotes);

        // Filter by creator name (partial match)
        if (createdBy) {
            const users = await User.find({ name: { $regex: createdBy, $options: "i" } }).select("_id");
            if (users.length > 0) {
                filter.user = { $in: users.map(user => user._id) };
            } else {
                return res.json({ surveys: [], total: 0, page: pageNum, totalPages: 0 });
            }
        }

        const surveys = await Survey.find(filter)
            .populate("user", "name email") // Populating user details
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const total = await Survey.countDocuments(filter);

        res.json({
            surveys,
            total,
            page: pageNum,
            totalPages: Math.ceil(total / limitNum),
        });
    } catch (error) {
        console.log("\n\n\nError in getAllSurveys : ", error);
        res.status(500).json({ message: "Error occurred in getAllSurveys", error });
    }
};

const voteSurvey = async (req, res) => {
    try {
        const { surveyId } = req.params;
        const { optionIndex } = req.body;
        const userId = req.user.id;

        const survey = await Survey.findById(surveyId);
        if (!survey) return res.status(404).json({ message: "Survey not found" });

        if (optionIndex < 0 || optionIndex >= survey.options.length) {
            return res.status(400).json({ message: "Invalid option index" });
        }

        // Check if user has already voted
        let votedOptionIndex = -1;
        survey.options.forEach((opt, idx) => {
            if (opt.voters.includes(userId)) votedOptionIndex = idx;
        });

        // Unvote if the user has already voted
        if (votedOptionIndex !== -1) {
            survey.options[votedOptionIndex].votes -= 1;
            survey.options[votedOptionIndex].voters.pull(userId);
            survey.totalVotes -= 1;
        }

        // If user is voting for a new option, register the vote
        if (votedOptionIndex !== optionIndex) {
            survey.options[optionIndex].votes += 1;
            survey.options[optionIndex].voters.push(userId);
            survey.totalVotes += 1;
        }

        await survey.save();
        res.status(200).json({ message: "Vote updated successfully", survey });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const participateInEvent = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id } = req.params;

        console.log("User ID:", userId);
        console.log("Event ID:", id);

        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (!event.participants) {
            event.participants = []; // Ensure participants field exists
        }

        if (event.participants.includes(userId)) {
            return res.status(400).json({ message: "User already registered" });
        }

        event.participants.push(userId);
        await event.save();

        res.status(200).json({ message: "Participation successful", event });
    } catch (error) {
        console.error("🔥 Error in participateInEvent:", error.message);
        res.status(500).json({ message: "Error in participation", error: error.message });
    }
};



// Supported Filters for Events APIs:

// General Filters:
// - title: Filters events by title (case-insensitive).
// - description: Filters events by description (case-insensitive).
// - location: Filters events by location (case-insensitive).
// - speaker_name: Filters events where the speaker's name matches (case-insensitive).
// - organized_by: Filters events by organizer name (case-insensitive).

// Date Filters (Only one applies at a time):
// - dateFilter=today: Retrieves events scheduled for today.
// - dateFilter=tomorrow: Retrieves events scheduled for tomorrow.
// - dateFilter=next7days: Retrieves events occurring within the next 7 days.
// - dateFilter=past: Retrieves past events.

// Time Filters (Only one applies at a time):
// - timeFilter=morning: Filters events occurring between 10 AM - 12 PM.
// - timeFilter=afternoon: Filters events occurring between 2 PM - 4 PM.
// - timeFilter=evening: Filters events occurring between 6 PM - 8 PM.

// Past or Upcoming Events:
// - pastEvents=true: Retrieves only past events.
// - pastEvents=false: Retrieves only upcoming events.

// Pagination:
// - page: Specifies the page number (default: 1).
// - limit: Specifies the number of events per page (default: 10).

// API-Specific Filtering:
// - getAllEvents: Applies all filters on all available events.
// - getParticipatedEvents: Filters events where the user is a participant or speaker.
// - getUpcomingEvents: Filters only upcoming events.
// - getSuggestedEvents: Filters suggested events based on user relationships (friends, mentor, mentees).


export {
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
    voteSurvey,
    participateInEvent,
};
