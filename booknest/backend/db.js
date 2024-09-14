const mongoose = require('mongoose');
require('dotenv').config(); // For loading environment variables

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/booknest';

// Set the `strictQuery` option
mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Export the connectDB function for use in other files
module.exports = connectDB;
