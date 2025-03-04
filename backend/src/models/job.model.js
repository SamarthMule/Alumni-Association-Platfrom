import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        skillsRequired: { type: [String], required: true },
        deadline: { type: Date },
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        referredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        contactInfo: {
            email: { type: String, required: true },
            mobile: { type: String, required: true },
            website: { type: String }
        },
        creator: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    },
    { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
