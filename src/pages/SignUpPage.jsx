import { useState } from "react";
import { Link, useNavigate } from "react-router";

const SignUpPage = () => {
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        try {
            e.preventDefault();

            // do password validation using regex that it must contain ...
            // add some more input fields in registration and store it in database

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
                // use hook to change the page useNavigate
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
            // you can do some validation on email using regex (H.W.)

            // console.log(e.target[0].value, e.target[1].value);
            // console.log(e.target.fullName.value, e.target.userEmail.value);
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/otps", {
                method: "POST",
                body: JSON.stringify({
                    email: e.target.userEmail.value,
                }), // javascript object to json --> JSON.stringify()
                headers: {
                    "content-type": "application/json",
                },
            });

            const respObj = await resp.json();
            // console.log(resp);
            // console.log(respObj);
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
        <div>
            {isOtpSent ? (
                <form onSubmit={handleRegister}>
                    <input type="text" value={email} readOnly />
                    {/* Controlled Inputs but we already have the value */}
                    <input type="text" value={fullName} readOnly />
                    {/* Controlled Inputs but we already have the value */}
                    <input type="text" placeholder="OTP" name="otp" required />
                    {/* Uncontrolled Inputs */}
                    <input type="password" placeholder="Password" name="password" required />
                    {/* Uncontrolled Inputs */}
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
                    {/* Uncontrolled Inputs */}
                    <button>Register</button>
                </form>
            ) : (
                <form onSubmit={handleSendOtp}>
                    <input type="text" placeholder="Full Name" name="fullName" required />
                    {/* Uncontrolled Inputs */}
                    <input type="email" placeholder="Email" name="userEmail" required />
                    {/* Uncontrolled Inputs */}
                    <button>Send OTP</button>
                </form>
            )}
            <Link to="/login">Login</Link>
        </div>
    );
};

export default SignUpPage;