import Tweet from '../models/Tweet.model.js'; // Import the Tweet model

// Create a new tweet
export const createTweet = async (req, res, next) => {
    // Destructure content and image from the request body
    const { content, image } = req.body;

    try {
        // Create a new tweet linked to the authenticated user
        const tweet = await Tweet.create({
            content,
            image,
            author: req.userId, // Assuming req.userId contains the ID of the authenticated user
        });

        // Respond with the created tweet
        return res.status(201).json(tweet);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Like or unlike a tweet
export const likeTweet = async (req, res, next) => {
    try {
        // Find the tweet by ID from request parameters
        const tweet = await Tweet.findById(req.params.id);
        if (!tweet) {
            return res.status(404).json({ message: 'Tweet not found' }); // Handle case where tweet does not exist
        }

        // Toggle the like status for the authenticated user
        if (tweet.likes.includes(req.userId)) {
            tweet.likes.pull(req.userId); // Remove user ID from likes array
        } else {
            tweet.likes.push(req.userId); // Add user ID to likes array
        }

        // Save the updated tweet
        await tweet.save();
        return res.status(200).json(tweet);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Get the tweet feed for the authenticated user
export const getFeed = async (req, res, next) => {
    try {
        // Find tweets from users the authenticated user is following
        const tweets = await Tweet.find({
            author: { $in: req.user.following }, // Assuming req.user.following contains the IDs of followed users
        })
            .populate('author', 'username profilePicture') // Populate author details
            .sort({ createdAt: -1 }); // Sort tweets by creation date in descending order

        // Respond with the retrieved tweets
        return res.status(200).json(tweets);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};
