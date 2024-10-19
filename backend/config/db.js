import mongoose from 'mongoose'; // Import Mongoose for MongoDB object modeling
import dotenv from 'dotenv'; // Import dotenv to manage environment variables

dotenv.config(); // Load environment variables from a .env file

// Async function to connect to the MongoDB database
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected'); // Log success message upon successful connection
    } catch (error) {
        // Log error message if connection fails
        console.error('MongoDB connection failed:', error.message);
        throw error; // Re-throw the error to handle it at a higher level if needed
    }
};

// Export the connectDB function for use in other modules
export default connectDB;

// Optional: Graceful shutdown for MongoDB connections
process.on('SIGINT', async () => {
    await mongoose.connection.close(); // Close the MongoDB connection
    console.log('MongoDB connection closed due to app termination');
    process.exit(0); // Exit the process successfully
});
