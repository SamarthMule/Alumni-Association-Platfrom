import express from 'express';
import { getReport, createReport, updateReport, deleteReport,getReportById } from '../../../backend/src/controllers/report.controller.js';

const reportRouter = express.Router();


/**
 * @swagger
 * /api/v1/report:
 *   get:
 *     summary: Get all reports
 *     tags:
 *       - Report
 *     responses:
 *       200:
 *         description: A list of reports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       404:
 *         description: No reports found
 *       500:
 *         description: Some server error
 *   post:
 *     summary: Create a new report
 *     tags:
 *       - Report
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Report'
 *     responses:
 *       201:
 *         description: Report created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 * /api/v1/report/{id}:
 *   put:
 *     summary: Update a report
 *     tags:
 *       - Report
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the report
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Report not found
 *       500:
 *         description: Some server error
 *   delete:
 *     summary: Delete a report
 *     tags:
 *       - Report
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the report
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Report deleted
 *       404:
 *         description: Report not found
 *       500:
 *         description: Some server error
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - flairs
 *         - status
 *         - createdBy
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated id
 *         title:
 *           type: string
 *           description: Title of the report
 *         description:
 *           type: string
 *           description: Description of the report
 *         flairs:
 *           type: array
 *           items:
 *             type: string
 *           description: Flairs of the report
 *         status:
 *           type: string
 *           description: Status of the report
 *         createdBy:
 *           type: string
 *           description: User who created the report
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Auto-generated creation date
 */
reportRouter.route('/').get(getReport).post(createReport);
reportRouter.route('/:id').get(getReportById).put(updateReport).delete(deleteReport);

export default reportRouter;