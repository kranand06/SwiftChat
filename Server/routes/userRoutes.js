import express from 'express';
import protect from '../Middleware/auth.js';
import { checkAuth, login, signup, updateProfile } from '../controllers/userController.js';


const userRouter = express.Router();

// Route for user registration
userRouter.post('/signup', signup);

// Route for user login
userRouter.post('/login', login);

// Route for updating user profile (protected)
userRouter.put('/profile', protect, updateProfile);

//check auth route
userRouter.get('/check', protect, checkAuth);

export default userRouter;