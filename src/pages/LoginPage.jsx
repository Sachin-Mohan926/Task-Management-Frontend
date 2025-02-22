import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ afterLogin }) => {

    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
                headers: {
                    "content-type": "application/json",
                },
            });
            const respObj = await resp.json();
            console.log(resp);
            console.log(respObj);
            if (respObj.status === "success") {
                afterLogin(respObj);
            } else {
                alert(respObj.message);
            }
        }catch(err){
            alert(`Error: ${err.message}`);
        }
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                {/* Uncontrolled Inputs */}
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;