import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authroutes.js";
import attendanceRoutes from "./routes/attendanceroutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SmartAttend backend API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);

const mongooseOptions = {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

const connectWithRetry = () => {
    mongoose.connect(process.env.MONGO_URI, mongooseOptions)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => {
            console.error("MongoDB connection error. Retrying in 5 seconds...", err.message || err);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});