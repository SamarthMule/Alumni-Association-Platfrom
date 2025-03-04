import mongoose, { Schema } from "mongoose"

const commentSchema = new Schema({
    post_id: {
        type: String,
        required: true,
    },
    event_id: {
        type: String
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: true
    }

}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema);