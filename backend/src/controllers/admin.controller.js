import fs from "fs";
import path from "path";
import xlsx from "xlsx";
import { CollegeDB } from "../models/collegeDb.model.js";


const blockOrUnblockEntity = async (req, res) => {
    try {
        const { entityName, id } = req.params;
        const { action } = req.body;

        if (!["block", "unblock"].includes(action)) {
            return res.status(400).json({ error: "Invalid action" });
        }

        // Use dynamic import() for ESM
        const { default: EntityModel } = await import(`../models/${entityName}.model.js`);

        const entity = await EntityModel.findById(id);
        if (!entity) return res.status(404).json({ error: `${entityName} not found` });

        if (entity.blocked === (action === "block")) {
            return res.status(400).json({ error: `${entityName} is already ${action}ed` });
        }

        entity.blocked = action === "block";
        await entity.save();

        res.status(200).json({ message: `${entityName} ${action}ed successfully`, entity });
    } catch (error) {
        console.log("\n\n\nError in blockOrUnblockEntity : ", error);
        res.status(500).json({ message: "Error occurred in blockOrUnblockEntity", error });
    }
};


const getBlockedEntities = async (req, res) => {
    try {
        const { entityName } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const EntityModel = require(`../models/${entityName}.model.js`);

        const blockedEntities = await EntityModel.find({ blocked: true }).skip(skip).limit(limit);
        const totalBlocked = await EntityModel.countDocuments({ blocked: true });

        if (!blockedEntities.length) {
            return res.status(404).json({ error: `No blocked ${entityName} found` });
        }

        res.status(200).json({
            blockedEntities,
            pagination: {
                total: totalBlocked,
                page,
                totalPages: Math.ceil(totalBlocked / limit),
                limit,
            },
        });
    } catch (error) {
        console.log("\n\n\nError in getBlockedEntities : ", error);
        res.status(500).json({ message: "Error occurred in getBlockedEntities", error });
    }
};

const uploadStudents = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const filePath = path.join("./public/temp", req.file.filename);

        // Read Excel file from disk
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);

        if (!jsonData.length) {
            fs.unlinkSync(filePath); // Delete the file after processing
            return res.status(400).json({ message: "Empty file" });
        }

        const batchSize = 10000;
        let studentsBatch = [];

        for (let i = 0; i < jsonData.length; i++) {
            const student = jsonData[i];

            studentsBatch.push({
                student_name: student.student_name,
                prn_no: student.prn_no,
                email: student.email,
                mobile_no: student.mobile_no,
                gender: student.gender,
                graduation_year: new Date(student.graduation_year),
                current_status: student.current_status,
            });

            if (studentsBatch.length === batchSize || i === jsonData.length - 1) {
                await CollegeDB.insertMany(studentsBatch, { ordered: false }).catch(() => { });
                studentsBatch = []; // Reset batch
            }
        }

        fs.unlinkSync(filePath); // Delete the file after processing

        res.status(200).json({ message: "Students data uploaded successfully" });
    } catch (error) {
        console.log("\n\n\nError in uploadStudents : ", error);
        res.status(500).json({ message: "Error occurred in uploadStudents", error });
    }
};

export {
    blockOrUnblockEntity,
    getBlockedEntities,
    uploadStudents
};
