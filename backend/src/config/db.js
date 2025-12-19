import mongoose from 'mongoose';

/**
 * Connect to MongoDB using the MONGODB_URI environment variable.
 * Example .env value:
 * MONGODB_URI=mongodb://127.0.0.1:27017/shoppyglobe
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shoppyglobe';

    await mongoose.connect(uri, {
      dbName: 'shoppyglobe',
    });

    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;


