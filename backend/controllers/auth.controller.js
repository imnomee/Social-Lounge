import User from '../models/User.model.js'; // Import the User model
import jwt from 'jsonwebtoken'; // Import JSON Web Token library

// User Registration
export const register = async (req, res, next) => {
    // Destructure required fields from request body
    const { username, email, password, bio, profilePicture, dateOfBirth } =
        req.body;

    // Validate input data - ensure required fields are provided
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: 'Username, email, and password are required.' });
    }

    try {
        // Create a new user in the database
        const user = await User.create({
            username,
            email,
            password,
            bio,
            profilePicture,
            dateOfBirth,
        });

        // Respond with a success message and the created user data
        return res
            .status(201)
            .json({ message: 'User registered successfully', user });
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// User Login
export const login = async (req, res, next) => {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Validate input data - ensure required fields are provided
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        // Check if user exists and password matches
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token with the user's ID, expires in 1 day
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        // Set the token in a cookie for the client (httpOnly for security)
        res.cookie('token', token, {
            httpOnly: true, // Prevent client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
        });

        // Respond with a success message and the token
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};

// Update User Profile
export const updateProfile = async (req, res, next) => {
    // Destructure bio and profilePicture from request body
    const { bio, profilePicture } = req.body;

    try {
        // Update user profile information based on the authenticated user's ID
        const user = await User.findByIdAndUpdate(
            req.user.id, // Assuming req.user is populated with the authenticated user's ID
            { bio, profilePicture },
            { new: true, runValidators: true } // Return the updated document and validate fields
        );

        // Check if user was found and updated
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with a success message and the updated user data
        return res.status(200).json({ message: 'Profile updated', user });
    } catch (error) {
        // Throw error to be caught by centralized error handler
        next(error);
    }
};
