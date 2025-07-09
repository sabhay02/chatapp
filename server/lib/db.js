import mongoose from 'mongoose';

// Function to connect to the MongoDB database
export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    console.log('✅ Database Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
  }
};
