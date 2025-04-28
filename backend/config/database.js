import mongoose from "mongoose";

export const connectDB = async () => {
  const {connection}=await mongoose.connect('mongodb+srv://vighnesh2607:yR5oW3288oiMgZU5@aiinterview.mmeor9y.mongodb.net/AI_Mock?retryWrites=true&w=majority&appName=AIInterview');
  console.log(`MongoDB connected with ${connection.host}`);
};