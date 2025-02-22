import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import '../assets/SignUpPage.css';

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            if (e.target.password.value !== e.target.confirmPassword.value) {
                alert("Password does not match!");
                return;
            }

            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/register", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    fullName,
                    otp: e.target.otp.value,
                    password: e.target.password.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            console.log(resp);
            const respObj = await resp.json();
            console.log(respObj);
            if (respObj.status === "success") {
                navigate("/login");
            } else {
                alert(respObj.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const handleSendOtp = async (e) => {
        try {
            e.preventDefault();

            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({
                    email: e.target.userEmail.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            const respObj = await response.json();
            
            if (respObj.status === "success") {
                setIsOtpSent(true);
                setFullName(e.target.fullName.value);
                setEmail(e.target.userEmail.value);
            } else {
                alert("Error " + respObj.message);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="card">
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <h1>Create an Account</h1>
                    <div className="form1">
                        <label htmlFor="fullname">Name</label>
                        <input type="text" value={fullName} readOnly />

                        <label htmlFor="email">Email</label>
                        <input type="text" value={email} readOnly />

                        <label htmlFor="OTP">OTP</label>
                        <input type="text" name="otp" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required />
                        
                        <label htmlFor="Confirm Password">Confirm Password</label>
                        <input type="password" name="confirmPassword" required />
                        
                        <button><b>Sign Up</b></button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <div className="form1">
                        <label htmlFor="fullname">Name</label>
                        <input type="text" placeholder="Full Name" name="fullName" required />
                        {/* Uncontrolled Inputs */}
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" name="userEmail" required />
                    
                    </div>
                    <button>Send OTP</button>
                    <p>Already have an Account? <Link to="/login">Login</Link></p>
                </form>
            )}
        </div>
    );
};

export default SignUpPage;