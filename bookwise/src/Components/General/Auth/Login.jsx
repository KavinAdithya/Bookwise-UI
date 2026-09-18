import { useContext, useState } from "react";
import { authenitcateUser } from "../../../apiservice/users/userservice";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import "../../../css/General/Login.css";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    async function authenticate(event) {
        event.preventDefault();

        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return;
        }

        try {
            setLoading(true);

            const credential = {
                username: username,
                password: password
            };

            const response = await authenitcateUser(credential);

            const data = response.data.data;

            login(data);

            debugger;
            const role = data.userDetail.role;

            if (role === "USER") {
                navigate("/home");
            } else if (role === "AUTHOR") {
                navigate("/author/home");
            } else if (role === "ADMIN") {
                navigate("/admin/home");
            } else {
                navigate("/unauthorized");
            }

        } catch (error) {
            console.error("Login failed:", error);

            setError(
                error.response?.data?.message ||
                "Invalid username or password."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <h1>BookWise</h1>
                    <h2>Welcome back</h2>
                    <p>Sign in to continue to your account</p>
                </div>

                <form className="login-form" onSubmit={authenticate}>

                    <div className="login-form-group">
                        <label htmlFor="username">
                            Username
                        </label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="login-form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="login-footer">
                    <p>
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => navigate("/register")}
                        >
                            Create an account
                        </button>
                    </p>
                </div>

            </div>

        </div>
    );
}

export default Login;