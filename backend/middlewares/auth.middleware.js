import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res
            .status(401)
            .json({ message: 'Not authorized, token failed' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.user = await User.findById(req.userId).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};
