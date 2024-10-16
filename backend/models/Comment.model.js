import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        tweet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet',
            required: true,
        },
        content: {
            type: String,
            required: true,
            maxLength: 280,
        },
    },
    { timestamps: true }
);

export default mongoose.model('Comment', CommentSchema);
