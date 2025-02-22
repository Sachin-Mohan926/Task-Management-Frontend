import Navbar from "../components/navbar";

// we are getting currUser prop from App.jsx
// and we are passing on it to the navbar component
// this way of passing props is called: PROP DRILLING

const HomePage = ({ currUser, handleLogout }) => {
    return (
        <div>
            <Navbar currUser={currUser} handleLogout={handleLogout} />
            <h1>Home Page</h1>
        </div>
    );
};

export default HomePage;