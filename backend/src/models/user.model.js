import mongoose, { Schema } from "mongoose"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export let otpStore = {}; // temporary store for OTPs
export let verifiedEmails = {}; // temporary store for verified mails

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'admin', 'alumni'],  
        default: 'user' 
    },
    password: {
        type: String,
        required: true
    },
    graduation_year: {
        type: String,
        required: true
    },

    skills: {
        type: Array,
        default: []
    },
    warning_count: {
        type: Number,
        default: 0,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }
    ],
    mentorships: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Mentorships'
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Posts'
        }
    ],
    jobs_applied : [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Jobs'
        }
    ],
    jobs_referred : [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Jobs'
        }
    ],
    events_participated:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Events'
        }
    ],
    events_managed:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Events'
        }
    ],
    job_title: {
        type: String
    },
    company: {
        type: String
    },
    interests: {
        type: Array,
        default: []
    },
    avatar: {
        type: String,
    },
    banner: {
        type: String
    },
    blocked_posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Posts'
        }
    ],
    blocked_users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Users'
        }
    ],
    blocked_events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'Events'
        }
    ],
    is_blocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


usersSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();

    this.password = await bcryptjs.hash(this.password, 10);
    next()
})

usersSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

usersSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        role: this.role,
        email: this._email
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        });
}

usersSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
}

usersSchema.statics.verifyOTP = async (email, otp) => {
    if (otpStore[email] === otp) {
      verifiedEmails[email] = true
      delete otpStore[email]
      res.status(200).json({ message: "Email verified successfully!" })
    } else {
      throw new Error("Invalid OTP");
    }
  }
  

export const User = mongoose.model("User", usersSchema);