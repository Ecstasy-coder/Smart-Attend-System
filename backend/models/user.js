import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    department: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        default: "employee"
    },
    faceEncoding: {
        type: [Number],
        default: []
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);