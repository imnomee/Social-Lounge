import User from '../models/User.model.js';

export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        if (!userToFollow)
            return res.status(404).json({ message: 'User not found' });
        if (req.user.following.includes(userToFollow._id)) {
            req.user.following.pull(userToFollow._id);
            userToFollow.followers.pull(req.user._id);
        } else {
            req.user.following.push(userToFollow._id);
            userToFollow.followers.push(req.user._id);
        }
        await req.user.save();
        await userToFollow.save();
        return res.status(200).json({ following: req.user.following });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
