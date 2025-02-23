import React from "react";
import { Link } from "react-router-dom";
import '../assets/NavBar.css';

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <div classname="navBarCss"> 
            <span>Hello {currUser.fullName}</span>

            <Link to="/">Home</Link>
            <button onClick={handleLogout}>Log Out</button>
            <Link to='/tasks'>Tasks</Link>
        </div>
    );
};

export default Navbar;