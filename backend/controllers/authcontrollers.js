import User from "../models/User.js";
import bcrypt from "bcryptjs";
import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:5001";

export const register = async (req, res) => {

    try {

        const {
            employeeId,
            employeeName,
            email,
            password,
            department,
            image
        } = req.body;

        if (!employeeId || !employeeName || !email || !password || !department || !image) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const aiResponse = await axios.post(
            `${AI_SERVICE_URL}/encode-face`,
            { image }
        );

        if (!aiResponse.data?.success || !Array.isArray(aiResponse.data.encoding) || aiResponse.data.encoding.length === 0) {
            return res.status(400).json({
                success: false,
                message: aiResponse.data?.message || "Face encoding failed. Please use a clear face image."
            });
        }

        const faceEncoding = aiResponse.data.encoding;

        const user = await User.create({
            employeeId,
            name: employeeName,
            email,
            password: hashedPassword,
            department,
            faceEncoding
        });

        res.json({
            success: true,
            user
        });

    } catch (error) {
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || "Internal Server Error";

        console.error("Register error:", statusCode, message, error.response?.data || error);

        res.status(statusCode).json({
            success: false,
            message
        });
    }
};