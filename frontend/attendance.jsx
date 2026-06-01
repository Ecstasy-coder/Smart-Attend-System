import Webcam from "react-webcam";
import { useRef } from "react";
import axios from "axios";

export default function Attendance() {

    const webcamRef = useRef(null);

    const markAttendance = () => {

        navigator.geolocation.getCurrentPosition(
            async (position) => {

                const image = webcamRef.current.getScreenshot();

                const response = await axios.post(
                    "http://localhost:5000/api/attendance/mark",
                    {
                        image,
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                );

                alert(response.data.message);
            }
        );
    };

    return (
        <div>

            <h1>Attendance</h1>

            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />

            <button onClick={markAttendance}>
                Mark Attendance
            </button>

        </div>
    );
}