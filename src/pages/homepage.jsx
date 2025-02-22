import Navbar from "../components/navbar";

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div>
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <h1>Home Page</h1>
        </div>
    );
};

export default HomePage;