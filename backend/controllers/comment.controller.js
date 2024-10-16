import Comment from '../models/Comment.model.js';
import Tweet from '../models/Tweet.model.js';

export const createComment = async (req, res) => {
    const { tweetId, content } = req.body;
    try {
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) return res.status(404).json({ message: 'Tweet not found' });
        const comment = await Comment.create({
            user: req.userId,
            tweet: tweetId,
            content,
        });
        return res.status(201).json(comment);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCommentsByTweet = async (req, res) => {
    const { tweetId } = req.params;
    try {
        const comments = await Comment.find({ tweet: tweetId })
            .populate('user', 'username profilePic')
            .sort({ createdAt: -1 });
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        if (comment.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await comment.remove();
        return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
