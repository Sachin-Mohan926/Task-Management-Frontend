import React from "react";
import { Link } from "react-router-dom";
import '../assets/NavBar.css';

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <div classname="navBarCss"> 
            <span>Hello {currUser.fullName}</span>

            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <button onClick={handleLogout}>Log Out</button>
            <Link to="/sign-up">Sign up</Link>
            <Link to='/tasks'>Tasks</Link>
        </div>
    );
};

export default Navbar;