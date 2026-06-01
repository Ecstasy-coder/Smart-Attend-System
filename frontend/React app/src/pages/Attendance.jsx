import Webcam from "react-webcam";
import { useRef, useState } from "react";
import axios from "axios";
import '../styles/Attendance.css';

export default function Attendance() {

    const webcamRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [attendanceRecord, setAttendanceRecord] = useState(null);

    const handleAttendance = (action) => {
        setMessageType("info");
        setMessage(`Getting location for ${action}...`);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    setLoading(true);
                    const image = webcamRef.current.getScreenshot();

                    const response = await axios.post(
                        "http://localhost:5000/api/attendance/mark",
                        {
                            image,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            action
                        }
                    );

                    if (response.data.success) {
                        setMessageType("success");
                        setMessage(`✓ ${action === 'check-in' ? 'Check-in' : 'Check-out'} recorded for ${response.data.user.name}`);
                        setAttendanceRecord({
                            ...response.data,
                            action
                        });
                    } else {
                        setMessageType("error");
                        setMessage("✗ " + response.data.message);
                    }
                } catch (error) {
                    setMessageType("error");
                    setMessage("✗ Error: " + (error.response?.data?.message || error.message));
                } finally {
                    setLoading(false);
                }
            },
            (error) => {
                setMessageType("error");
                setMessage("✗ Location access denied: " + error.message);
            }
        );
    };

    return (
        <div className="attendance-container">
            <div className="attendance-form">
                <h2>Mark Attendance</h2>

                <div className="webcam-box">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="attendance-actions">
                    <button
                        onClick={() => handleAttendance('check-in')}
                        disabled={loading}
                        className="btn-primary"
                    >
                        {loading ? "Processing..." : "Check In"}
                    </button>
                    <button
                        onClick={() => handleAttendance('check-out')}
                        disabled={loading}
                        className="btn-secondary"
                    >
                        {loading ? "Processing..." : "Check Out"}
                    </button>
                </div>

                {message && <div className={`message ${messageType === 'success' ? 'success' : messageType === 'error' ? 'error' : ''}`}>{message}</div>}

                {attendanceRecord && (
    <div className="attendance-record">
        <h3>Attendance Confirmed</h3>

        <p>
            <strong>Type:</strong>{" "}
            {attendanceRecord.action === 'check-in' ? 'Check In' : 'Check Out'}
        </p>

        <p>
            <strong>Employee Name:</strong>{" "}
            {attendanceRecord.user.name}
        </p>

        <p>
            <strong>Employee ID:</strong>{" "}
            {attendanceRecord.user.employeeId || attendanceRecord.user._id}
        </p>

        <p>
            <strong>Date:</strong>{" "}
            {new Date(attendanceRecord.attendance.checkInTime).toLocaleDateString()}
        </p>

        <p>
            <strong>Time:</strong>{" "}
            {new Date(attendanceRecord.attendance.checkInTime).toLocaleTimeString()}
        </p>

        <p>
            <strong>Location:</strong>{" "}
            {attendanceRecord.attendance.location.lat.toFixed(4)},
            {" "}
            {attendanceRecord.attendance.location.lng.toFixed(4)}
        </p>
    </div>
)}
            </div>
        </div>
    );
}
