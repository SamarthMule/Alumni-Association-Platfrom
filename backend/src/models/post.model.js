import mongoose, { mongo, Schema } from "mongoose"

const postSchema = new Schema({
    owner: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Comment"
        }
    ],
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    attachment: {
        type: String
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Post = mongoose.model("Post", postSchema);