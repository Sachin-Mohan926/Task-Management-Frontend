import { Link } from "react-router";

const Navbar = ({ currUser, handleLogout }) => {
    return (
        <div>
            <span>Hello {currUser.fullName}</span>
            <button onClick={handleLogout}>Logout</button>
            <Link to="/tasks">Tasks</Link>
        </div>
    );
};

export default Navbar;