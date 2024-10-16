import express from 'express'; // Importing Express framework
import {
    login, // Importing the login controller
    register, // Importing the register controller
    updateProfile, // Importing the updateProfile controller
} from '../controllers/auth.controller.js'; // Importing controllers from the auth controller file
import { protect } from '../middlewares/auth.middleware.js'; // Importing middleware for route protection

// Create a new Express router instance
const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', register); // Route for user registration

/**
 * @route   POST /api/auth/login
 * @desc    Login a user
 * @access  Public
 */
router.post('/login', login); // Route for user login

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @access  Private (protected route)
 */
router.put('/profile', protect, updateProfile); // Route for updating user profile with protection middleware

// Export the router to be used in the main application
export default router;
