import React from "react";
import { Link } from "react-router-dom";
import '../assets/NavBar.css';

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <div classname="navBarCss"> 
            <span>Hello {currUser.fullName}</span>

            <Link to="/">Home</Link>
<<<<<<< HEAD
            {/* <Link to="/login">Login</Link> */}
            <button onClick={handleLogout}>Log Out</button>
            {/* <Link to="/sign-up">Sign up</Link> */}
=======
{/*             <Link to="/login">Login</Link> */}
            <button onClick={handleLogout}>Log Out</button>
{/*             <Link to="/sign-up">Sign up</Link> */}
>>>>>>> f38f96dd7360b8e5b7e330f2193c6a99fb0c4fbe
            <Link to='/tasks'>Tasks</Link>
        </div>
    );
};

export default Navbar;
