import express from 'express';
import { verifyJWT } from '../../../backend/src/middlewares/auth.middleware.js';
import { sendMessage, getAllMessages } from '../controllers/messages.controller.js';

const router = express.Router();

// This route is used to send a message
router.post('/', verifyJWT, sendMessage);

// This route is used to get all the messages in a chat
router.get('/:chatId', verifyJWT, getAllMessages);

export default router;
