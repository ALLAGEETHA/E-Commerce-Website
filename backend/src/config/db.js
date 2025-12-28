import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/**
 * Connect to MongoDB using the MONGODB_URI environment variable.
 * If no URI is provided, start an in-memory MongoDB for development/testing.
 * Example .env value:
 * MONGODB_URI=mongodb://127.0.0.1:27017/shoppyglobe
 */
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;

    // If no external Mongo URI provided, start an in-memory server
    if (!uri) {
      // mongodb-memory-server will download or use cached binaries on first run
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      // eslint-disable-next-line no-console
      console.log('No MONGODB_URI provided — using in-memory MongoDB instance');
    }

    await mongoose.connect(uri, {
      dbName: 'shoppyglobe',
    });

    // eslint-disable-next-line no-console
    console.log('MongoDB connected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection error:', error.message);
    // Do not exit the process — allow the server to start for non-DB route testing
  }
};

export default connectDB;


