import app from './app.js';
import { connectDB } from './config/database.js';
import RazorPay from "razorpay";

connectDB();

export const instance = new RazorPay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen("4000", () => {
    console.log(`Server is working on port: 4000`);
  });