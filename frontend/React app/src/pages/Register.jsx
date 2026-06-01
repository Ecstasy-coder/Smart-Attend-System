import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "../styles/Register.css";

export default function Register() {
    const webcamRef = useRef(null);

    const [formData, setFormData] = useState({
        employeeId: "",
        employeeName: "",
        email: "",
        password: "",
        department: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const registerUser = async () => {
        if (
            !formData.employeeId ||
            !formData.employeeName ||
            !formData.email ||
            !formData.password ||
            !formData.department
        ) {
            setMessage("Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const image = webcamRef.current.getScreenshot();

            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    employeeId: formData.employeeId,
                    employeeName: formData.employeeName,
                    email: formData.email,
                    password: formData.password,
                    department: formData.department,
                    image
                }
            );

            setMessage("✓ Registration Successful");

            setFormData({
                employeeId: "",
                employeeName: "",
                email: "",
                password: "",
                department: ""
            });

        } catch (error) {
            setMessage(
                "✗ Registration Failed : " +
                (error.response?.data?.message || error.message)
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>REGISTER EMPLOYEE</h2>

                <div className="webcam-box">
                    <Webcam
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={300}
                        height={300}
                    />
                </div>

                <div className="form-group">
                    <label>Employee ID</label>
                    <input
                        type="text"
                        placeholder="Enter Employee ID"
                        value={formData.employeeId}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                employeeId: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Employee Name</label>
                    <input
                        type="text"
                        placeholder="Enter Employee Name"
                        value={formData.employeeName}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                employeeName: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-group">
    <label>Department</label>

    <select
        value={formData.department}
        onChange={(e) =>
            setFormData({
                ...formData,
                department: e.target.value
            })
        }
    >
        <option value="">Select Department</option>
        <option value="Engineering">Engineering</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="Sales">Sales</option>
        <option value="Operations">Operations</option>
        <option value="IT Support">IT Support</option>
    </select>
</div>

                <button
                    onClick={registerUser}
                    disabled={loading}
                    className="btn-primary"
                >
                    {loading ? "Registering..." : "Register Employee"}
                </button>

                {message && (
                    <div
                        className={`message ${
                            message.includes("✓")
                                ? "success"
                                : "error"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}