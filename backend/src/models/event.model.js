import mongoose, { Schema } from "mongoose"

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    banner: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    speakers: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    participants: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    organized_by: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    feedbacks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Feedback"
        }
    ],
    surveys: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Survey"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    is_blocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Event = mongoose.model("Event", eventSchema);