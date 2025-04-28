import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
  

config({
    path: './backend/config/.env',
  });

  const __dirname=path.resolve();
  console.log(__dirname)

const app=express();

// Using Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());


// console.log(process.env.OPEN_AI_API_KEY)

// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

// Importing & Using Routes
import user from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/Error.js";
import course from "./routes/courseRoutes.js";
import payment from "./routes/paymentRoutes.js";

app.use("/api/v1", user ); 
app.use("/api/v1",course);
app.use("/api/v1",payment)

app.use(express.static(path.join(__dirname, "/AI_Interview/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "AI_Interview", "dist", "index.html"));
});
export default app;

app.use(ErrorMiddleware);