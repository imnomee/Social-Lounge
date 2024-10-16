import mongoose from 'mongoose';

const TweetSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            maxLength: 280,
        },
        image: {
            type: String,
            default: '',
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

export default mongoose.model('Tweet', TweetSchema);
