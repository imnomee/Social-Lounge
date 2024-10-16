import Comment from '../models/Comment.model.js'; // Import the Comment model
import Tweet from '../models/Tweet.model.js'; // Import the Tweet model

// Create a new comment
export const createComment = async (req, res, next) => {
    // Destructure tweetId and content from the request body
    const { tweetId, content } = req.body;

    try {
        // Check if the tweet exists
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).json({ message: 'Tweet not found' });

        // Create a new comment linked to the tweet and the user
        const comment = await Comment.create({
            user: req.userId, // Assuming req.userId contains the ID of the authenticated user
            tweet: tweetId,
            content,
        });

        // Respond with the created comment
        return res.status(201).json(comment);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Get comments for a specific tweet
export const getCommentsByTweet = async (req, res, next) => {
    // Extract tweetId from request parameters
    const { tweetId } = req.params;

    try {
        // Retrieve comments associated with the specified tweet
        const comments = await Comment.find({ tweet: tweetId })
            .populate('user', 'username profilePic') // Populate user details
            .sort({ createdAt: -1 }); // Sort comments by creation date in descending order

        // Respond with the retrieved comments
        return res.status(200).json(comments);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Delete a comment
export const deleteComment = async (req, res, next) => {
    // Extract commentId from request parameters
    const { commentId } = req.params;

    try {
        // Find the comment by ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the user is authorized to delete the comment
        if (comment.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Remove the comment from the database
        await comment.remove();
        return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};
