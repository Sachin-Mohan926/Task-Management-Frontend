import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "./SignUpPage.css";

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

            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({
                    email: e.target.userEmail.value,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });

            const respObj = await resp.json();
            
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
            <h1>Create an Account</h1>
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <div className="form1">
                        <label for="fullname">Full Name</label>
                        <input type="text" value={fullName} readOnly />

                        <label for="email">Email</label>
                        <input type="text" value={email} readOnly />

                        <label for="OTP">OTP</label>
                        <input type="text" required />

                        <label for="password">Password</label>
                        <input type="password" required />
                        
                        <label for="Confirm Password">Confirm Password</label>
                        <input type="password" required />
                        
                        <button><b>Sign Up</b></button>
                    </div>
                    <p>Already have an Account? <Link to="/login">Login</Link></p>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <div className="form1">
                        <input type="text" placeholder="Full Name" name="fullName" required />
                        {/* Uncontrolled Inputs */}
                        <input type="email" placeholder="Email" name="userEmail" required />
                        {/* Uncontrolled Inputs */}
                        <button>Send OTP</button>
                    </div>
                </form>
            )}
            <Link to="/login">Login</Link>
        </div>
    );
};

export default SignUpPage;