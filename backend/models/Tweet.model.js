import mongoose from 'mongoose'; // Importing mongoose for MongoDB object modeling

// Define the Tweet schema
const TweetSchema = new mongoose.Schema(
    {
        // The content of the tweet
        content: {
            type: String, // Content is a string
            required: true, // Ensure this field is required
            maxLength: 280, // Limit the content length to 280 characters
        },
        // Optional image associated with the tweet
        image: {
            type: String, // Image URL or path as a string
            default: '', // Default value is an empty string if no image is provided
        },
        // Reference to the User who authored the tweet
        author: {
            type: mongoose.Schema.Types.ObjectId, // Using ObjectId to reference a User
            ref: 'User', // The referenced model
            required: true, // Ensure this field is required
        },
        // List of users who liked the tweet
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId, // Using ObjectId to reference a User
                ref: 'User', // The referenced model
            },
        ],
        // List of comments associated with the tweet
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId, // Using ObjectId to reference a Comment
                ref: 'Comment', // The referenced model
            },
        ],
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

// Export the Tweet model based on the Tweet schema
export default mongoose.model('Tweet', TweetSchema);
