import mongoose, { Schema } from "mongoose"

const feedbackSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Event'
    }
    ,
    ratings: {
        type: Number,
        required: true
    }

}, { timestamps: true })

export const Feedback = mongoose.model("Feedback", feedbackSchema);