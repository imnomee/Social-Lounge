import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import tweetRoutes from './routes/tweet.route.js';
import userRoutes from './routes/user.route.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 7860;

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () =>
    console.log(`Server is running on: http://localhost:${PORT}`)
);
