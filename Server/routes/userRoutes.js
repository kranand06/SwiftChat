import express from 'express';
import { registerUser, loginUser, getUserProfile, checkAuth } from '../controllers/userController.js';
import protect from '../Middleware/auth.js';


const userRouter = express.Router();

// Route for user registration
router.post('/signup', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for getting user profile (protected)
router.get('/profile', protect, getUserProfile);

//check auth route
router.get('/profile', protect, checkAuth);

export default userRouter;