import User from '../models/User.model.js'; // Import the User model

// Follow or unfollow a user
export const followUser = async (req, res, next) => {
    try {
        // Find the user to follow/unfollow based on the provided ID
        const userToFollow = await User.findById(req.params.id);
        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user does not exist
        }

        // Check if the authenticated user is already following the user
        if (req.user.following.includes(userToFollow._id)) {
            // Unfollow the user
            req.user.following.pull(userToFollow._id); // Remove user from following list
            userToFollow.followers.pull(req.user._id); // Remove the authenticated user from followers
        } else {
            // Follow the user
            req.user.following.push(userToFollow._id); // Add user to following list
            userToFollow.followers.push(req.user._id); // Add the authenticated user to followers
        }

        // Save changes to both users
        await req.user.save();
        await userToFollow.save();

        // Respond with the updated following list
        return res.status(200).json({ following: req.user.following });
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Get user profile excluding sensitive information
export const getUserProfile = async (req, res, next) => {
    try {
        // Find the user by ID and exclude the password field from the result
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Handle case where user does not exist
        }

        // Respond with the user's profile
        return res.status(200).json(user);
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};
