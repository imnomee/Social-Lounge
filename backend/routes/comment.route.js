import express from 'express'; // Importing Express framework
import {
    createComment, // Importing the function to create a new comment
    getCommentsByTweet, // Importing the function to get comments by tweet ID
    deleteComment, // Importing the function to delete a comment
} from '../controllers/comment.controller.js'; // Importing comment controllers
import { protect } from '../middlewares/auth.middleware.js'; // Importing middleware for route protection

// Create a new Express router instance
const router = express.Router();

/**
 * @route   POST /api/comments
 * @desc    Create a new comment on a tweet
 * @access  Private (protected route)
 */
router.post('/', protect, createComment); // Route for creating a new comment with protection middleware

/**
 * @route   GET /api/comments/:id
 * @desc    Get comments by tweet ID
 * @access  Private (protected route)
 */
router.get('/:id', protect, getCommentsByTweet); // Route for fetching comments associated with a specific tweet, protected

/**
 * @route   DELETE /api/comments/:id
 * @desc    Delete a comment by ID
 * @access  Private (protected route)
 */
router.delete('/:id', protect, deleteComment); // Route for deleting a comment with protection middleware

// Export the router to be used in the main application
export default router;
