import jwt from 'jsonwebtoken'; // Importing the jsonwebtoken library for token verification
import User from '../models/User.model.js'; // Importing the User model

// Middleware to protect routes by validating JWT
export const protect = async (req, res, next) => {
    // Extract the token from cookies
    const token = req.cookies.token;

    // Check if the token is provided
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Not authorized, token failed' }); // Unauthorized if no token
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object for later use
        req.userId = decoded.userId;

        // Fetch the user from the database and exclude the password field
        req.user = await User.findById(req.userId).select('-password');

        // If user not found, respond with unauthorized status
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, throw the error to be caught by centralized error handler
        next(error);
    }
};
