import mongoose from 'mongoose'; // Importing mongoose for MongoDB object modeling

// Define the Comment schema
const CommentSchema = new mongoose.Schema(
    {
        // Reference to the User who made the comment
        user: {
            type: mongoose.Schema.Types.ObjectId, // Using ObjectId to reference a User
            ref: 'User', // The referenced model
            required: true, // Ensure this field is required
        },
        // Reference to the Tweet on which the comment is made
        tweet: {
            type: mongoose.Schema.Types.ObjectId, // Using ObjectId to reference a Tweet
            ref: 'Tweet', // The referenced model
            required: true, // Ensure this field is required
        },
        // The content of the comment
        content: {
            type: String, // Content is a string
            required: true, // Ensure this field is required
            maxLength: 280, // Limit the content length to 280 characters
        },
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

// Export the Comment model based on the Comment schema
export default mongoose.model('Comment', CommentSchema);
