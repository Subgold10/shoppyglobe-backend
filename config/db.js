import mongoose from "mongoose";

// Utility to establish MongoDB connection
const initializeDatabase = async () => {
  try {
    // Attempt to connect to MongoDB using the connection URI from environment var
    await mongoose.connect(process.env.MONGODB_URI);

    console.info("Database connection established");
  } catch (connectionError) {
    // Log any errors that occur during the connection attempt
    console.error("Failed to connect to MongoDB:", connectionError);

    process.exit(1);
  }
};

export default initializeDatabase;
