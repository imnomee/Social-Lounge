import express from 'express';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.route.js';
import tweetRoutes from './routes/tweet.route.js';
import userRoutes from './routes/user.route.js';
import commentRoutes from './routes/comment.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan'; // Middleware for logging HTTP requests

const app = express();
const PORT = process.env.PORT || 7860;

const corsOptions = {
    origin: ['http://yourfrontend.com'], // Specify allowed origin(s)
    credentials: true,
    optionsSuccessStatus: 200,
};

// Middleware order
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies
app.use(cors(corsOptions)); // Enable CORS with specified options

// Mounting routes
app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);
app.use('/api/comments', commentRoutes);

// Global error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the stack trace for debugging
    res.status(err.status || 500).json({
        // Send a JSON response with the error details
        message: err.message || 'Internal Server Error',
    });
});

// Function to start the server with error handling for database connection
const startServer = async () => {
    try {
        await connectDB(); // Attempt to connect to the database
        app.listen(PORT, () =>
            // Start the server
            console.log(`Server is running on: http://localhost:${PORT}`)
        );
    } catch (error) {
        // Handle the error if the database connection fails
        console.error(
            'Failed to start the server due to database connection error:',
            error.message
        );
        process.exit(1); // Exit the process with failure
    }
};

// Call the function to start the server
startServer();

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        // Close the server and finish ongoing requests
        console.log('Closed out remaining connections');
        process.exit(0); // Exit the process successfully
    });
});
