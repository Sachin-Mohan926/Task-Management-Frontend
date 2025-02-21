const LoginPage = ({ afterLogin }) => {
    const handleLogin = async (e) => {
        e.preventDefault();
        const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/users/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
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
    };
    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" name="email" required />
                {/* Uncontrolled Inputs */}
                <input type="password" placeholder="Password" name="password" required />
                {/* Uncontrolled Inputs */}
                <button>Login</button>
            </form>
        </div>
    );
};

export default LoginPage;