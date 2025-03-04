import mongoose from "mongoose";
const SurveySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Associate survey with a creator
    title: { type: String, required: true, trim: true },
    options: [
        {
            text: { type: String, required: true }, // Survey option text
            votes: { type: Number, default: 0 } // Number of votes per option
        }
    ],
    totalVotes: { type: Number, default: 0 }, // Total votes for survey
    createdAt: { type: Date, default: Date.now }
});

export const Survey = mongoose.model("Survey", SurveySchema);
