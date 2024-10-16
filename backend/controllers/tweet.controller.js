import Tweet from '../models/Tweet.model.js';

export const createTweet = async (req, res) => {
    const { content, image } = req.body;
    try {
        const tweet = await Tweet.create({
            content,
            image,
            author: req.userId,
        });
        return res.status(201).json(tweet);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const likeTweet = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);
        if (tweet.likes.includes(req.userId)) {
            tweet.likes.pull(req.userId);
        } else {
            tweet.likes.push(req.userId);
        }
        await tweet.save();
        return res.status(200).json(tweet);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getFeed = async (req, res) => {
    try {
        const tweets = await Tweet.find({
            author: { $in: req.user.following },
        })
            .populate('author', 'username profilePicture')
            .sort({ createdAt: -1 });

        return res.status(200).json(tweets);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
