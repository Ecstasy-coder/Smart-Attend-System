import User from "../models/User.js";
import Attendance from "../models/Attendance.js";
import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://127.0.0.1:5001";

export const markAttendance = async (req, res) => {

    try {

        const {
            image,
            lat,
            lng
        } = req.body;

        const users = await User.find();

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

        const currentEncoding = aiResponse.data.encoding;

        if (!users.length) {
            return res.status(404).json({
                success: false,
                message: "No registered users found. Please register first."
            });
        }

        for (let user of users) {

            if (!Array.isArray(user.faceEncoding) || user.faceEncoding.length === 0) {
                continue;
            }

            let matchResponse;
            try {
                matchResponse = await axios.post(
                    `${AI_SERVICE_URL}/match-face`,
                    {
                        currentEncoding,
                        storedEncoding: user.faceEncoding
                    }
                );
            } catch (matchError) {
                console.warn("Face match skipped due to AI service error:", matchError.response?.data || matchError.message);
                continue;
            }

            if (!matchResponse.data?.success) {
                continue;
            }

            if (matchResponse.data.match) {

                const attendance = await Attendance.create({
                    employeeId: user._id,
                    checkInTime: new Date(),
                    date: new Date().toISOString().split("T")[0],
                    location: {
                        lat,
                        lng
                    },
                    deviceInfo: "Chrome Browser"
                });

                return res.json({
                    success: true,
                    message: "Attendance Marked",
                    user,
                    attendance
                });
            }
        }

        res.status(401).json({
            success: false,
            message: "Face Not Matched"
        });

    } catch (error) {
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || "Internal Server Error";

        console.error("Attendance error:", statusCode, message, error.response?.data || error);

        res.status(statusCode).json({
            success: false,
            message
        });
    }
};