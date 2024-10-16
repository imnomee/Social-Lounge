import mongoose from 'mongoose'; // Importing mongoose for MongoDB object modeling
import bcrypt from 'bcryptjs'; // Importing bcrypt for password hashing

// Define the User schema
const UserSchema = new mongoose.Schema(
    {
        // Username field
        username: {
            type: String, // Type is String
            required: true, // This field is required
            unique: true, // Ensure username is unique across all users
            trim: true, // Trim whitespace from the username
        },
        // Email field with validation
        email: {
            type: String, // Type is String
            required: true, // This field is required
            unique: true, // Ensure email is unique across all users
            match: [/.+@.+\..+/, 'Please enter a valid email address'], // Regular expression for email validation
        },
        // Password field
        password: {
            type: String, // Type is String
            required: true, // This field is required
        },
        // Bio field
        bio: {
            type: String, // Type is String
            default: '', // Default value is an empty string
            maxLength: 160, // Optional: Limit bio length
        },
        // Profile picture field with validation
        profilePicture: {
            type: String, // Type is String
            default: '', // Default value is an empty string
            validate: {
                validator: function (v) {
                    return /^https?:\/\/.+\..+/i.test(v); // Validate URL format
                },
                message: (props) => `${props.value} is not a valid URL!`, // Error message for invalid URL
            },
        },
        // Date of birth field
        dateOfBirth: {
            type: Date, // Type is Date
        },
        // Followers array referencing User documents
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId, // ObjectId for referencing User
                ref: 'User', // The referenced model
            },
        ],
        // Following array referencing User documents
        following: [
            {
                type: mongoose.Schema.Types.ObjectId, // ObjectId for referencing User
                ref: 'User', // The referenced model
            },
        ],
        // Role field for user permissions
        role: {
            type: String, // Type is String
            enum: ['user', 'admin'], // Allowed values
            default: 'user', // Default role
        },
    },
    {
        timestamps: true, // Automatically create createdAt and updatedAt fields
    }
);

// Pre-save hook to hash password before saving to the database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // If password is not modified, proceed to the next middleware
    try {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
        next(); // Proceed to the next middleware
    } catch (error) {
        // Handle error during password hashing
        next(error); // Pass the error to the next middleware (error handling middleware)
    }
});

// Method to compare provided password with stored hashed password
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password); // Return comparison result
};

// Create indexes for username and email to improve search performance
UserSchema.index({ username: 1, email: 1 }); // Create a compound index for username and email

// Export the User model based on the User schema
export default mongoose.model('User', UserSchema);
