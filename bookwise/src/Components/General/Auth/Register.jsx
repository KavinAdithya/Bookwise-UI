import UserRegistration from "../../Users/UserRegistration";
import RoleToggle from "../Templates/RoleToggle";
import { useState } from "react";
import AuthorRegistration from "../../Author/AuthorRegistration";
import "../../../css/General/Register.css";

function Register() {

    const [role, setRole] = useState("USER");

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-header">
                    <h1>BookWise</h1>
                    <h2>Create your account</h2>
                    <p>
                        Join BookWise and discover a better way to manage your reading.
                    </p>
                </div>

                <div className="register-role-section">
                    <span className="register-role-label">
                        I want to register as
                    </span>

                    <RoleToggle
                        role={role}
                        setRole={setRole}
                    />
                </div>

                <div className="register-form-container">

                    {role === "USER" && (
                        <UserRegistration />
                    )}

                    {role === "AUTHOR" && (
                        <AuthorRegistration />
                    )}

                </div>

            </div>

        </div>
    );
}

export default Register;