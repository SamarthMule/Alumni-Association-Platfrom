import express from 'express';
import { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroupChat, removefromGroupChat, updateProfilePic, deleteChats } from '../controllers/chat.controller.js';
import { verifyJWT } from '../../../backend/src/middlewares/auth.middleware.js';

const router = express.Router();

// This route is used to fetch all the chats of the user
router.get('/', verifyJWT, fetchChats);

// This route is used to access a chat
router.post('/', verifyJWT, accessChat);

// This route is used to create a group chat
router.post('/group', verifyJWT, createGroupChat);

// This route is used to rename a group chat
router.put('/renameGroupChat', verifyJWT, renameGroupChat);

// This route is used to add a user to a group chat
router.put('/addToGroupChat', verifyJWT, addToGroupChat);

// This route is used to remove a user from a group chat
router.put('/removeFromGroupChat', verifyJWT, removefromGroupChat);

// This route is used to update group chat profile picture
router.put("/updateProfilePic", verifyJWT, updateProfilePic);

// This route is used to delete a chats of a specific user
router.delete('/', verifyJWT, deleteChats);

export default router;
