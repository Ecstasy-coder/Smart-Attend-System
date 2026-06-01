import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function Register() {

    const webcamRef = useRef(null);

    const [formData, setFormData] = useState({
        EmployeeID: "",
        EmployeeName: "",
        Email: "",
        password: "",
        Department: ""
    });

    const registerUser = async () => {

        const image = webcamRef.current.getScreenshot();

        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
                ...formData,
                image
            }
        );

        alert(response.data.message || "Registered");
    };

    return (
        <div>
            <h1>Register</h1>

            <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />

            <input
                placeholder="Name"
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        name: e.target.value
                    })
                }
            />

            <button onClick={registerUser}>
                Register
            </button>
        </div>
    );
}