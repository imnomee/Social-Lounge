import User from '../models/User.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    const { username, email, password, bio, profilePicture, dateOfBirth } =
        req.body;
    try {
        const user = await User.create({
            username,
            email,
            password,
            bio,
            profilePicture,
            dateOfBirth,
        });
        return res
            .status(201)
            .json({ message: 'User registered successfully', user });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.cookie('token', token, {
            httpOnly: true,
        });
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { bio, profilePicture } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { bio, profilePicture },
            { new: true }
        );
        return res.status(200).json({ message: 'Profile updated', user });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
