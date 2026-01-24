import express from 'express';
import protect from '../Middleware/auth.js';
import { getMessagesWithUser, getSidebarUsers, markMessageSeen } from '../controllers/messageController.js';


const messageRouter = express.Router();

// Route for sidebar users (protected)
messageRouter.get('/user', protect, getSidebarUsers);

// Route for message wit given user (protected)
messageRouter.get('/:id', protect, getMessagesWithUser);

// Route for getting user profile (protected)
messageRouter.put('mark/:id', protect, markMessageSeen);



export default messageRouter;