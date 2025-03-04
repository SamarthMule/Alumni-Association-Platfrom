import mongoose, { Schema } from "mongoose";

const mentorshipSchema = new Schema(
  {
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true // Ensure each mentor appears only once in the collection
    },
    mentee: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    status: {
      type: String,
      enum: ["requested", "accepted", "dissolved"],
      default: "requested", // Default is "requested" before acceptance
    },
    start_date: {
      type: Date
    },
    end_date: {
      type: Date
    }
  },
  { timestamps: true }
);

export const Mentorship = mongoose.model("Mentorship", mentorshipSchema);
