import mongoose, { Schema } from "mongoose"

const collegeDbSchema = new Schema({
    student_name: {
        type: String,
        required: true
    },
    prn_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    graduation_year: {
        type: Date,
        required: true
    },
    current_status : {
        type: String,
        required: true
    }
}, { timestamps: true });

export const CollegeDB = mongoose.model("CollegeDB", collegeDbSchema);