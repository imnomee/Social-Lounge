import express from 'express'; // Importing Express framework
import { followUser, getUserProfile } from '../controllers/user.controller.js'; // Importing user controller functions
import { protect } from '../middlewares/auth.middleware.js'; // Importing middleware for route protection

// Create a new Express router instance
const router = express.Router();

/**
 * @route   PUT /api/users/follow/:id
 * @desc    Follow or unfollow a user by ID
 * @access  Private (protected route)
 */
router.put('/follow/:id', protect, followUser); // Route for following/unfollowing a user, protected by authentication

/**
 * @route   GET /api/users/:id
 * @desc    Get user profile by ID
 * @access  Private (protected route)
 */
router.get('/:id', protect, getUserProfile); // Route for fetching a user's profile, protected

// Export the router to be used in the main application
export default router;
