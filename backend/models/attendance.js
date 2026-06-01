import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    checkInTime: Date,
    date: String,
    location: {
        lat: Number,
        lng: Number
    },
    deviceInfo: String
});

export default mongoose.model("Attendance", attendanceSchema);