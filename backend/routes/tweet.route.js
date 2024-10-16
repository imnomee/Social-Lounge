import express from 'express'; // Importing Express framework
import {
    createTweet, // Importing the function to create a new tweet
    likeTweet, // Importing the function to like or unlike a tweet
    getFeed, // Importing the function to get the user's tweet feed
} from '../controllers/tweet.controller.js'; // Importing tweet controllers
import { protect } from '../middlewares/auth.middleware.js'; // Importing middleware for route protection

// Create a new Express router instance
const router = express.Router();

/**
 * @route   POST /api/tweets
 * @desc    Create a new tweet
 * @access  Private (protected route)
 */
router.post('/', protect, createTweet); // Route for creating a new tweet, protected by authentication

/**
 * @route   PUT /api/tweets/like/:id
 * @desc    Like or unlike a tweet by ID
 * @access  Private (protected route)
 */
router.put('/like/:id', protect, likeTweet); // Route for liking or unliking a tweet, protected

/**
 * @route   GET /api/tweets/feed
 * @desc    Get the user's tweet feed
 * @access  Private (protected route)
 */
router.get('/feed', protect, getFeed); // Route for fetching the tweet feed, protected

// Export the router to be used in the main application
export default router;
