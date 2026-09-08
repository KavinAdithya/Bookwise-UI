import UserRegistration from "../Users/UserRegistration";
import RoleToggle from "./RoleToggle";
import { useState } from "react";
import AuthorRegistration from "../Author/AuthorRegistration";

function Register() {
    const [role, setRole] = useState("USER")

    return (
        <>
            <RoleToggle 
                role={role} 
                setRole={setRole}/>
            {role === "USER"  && <UserRegistration />}
            {role === "AUTHOR" && <AuthorRegistration />}
        </>
    );
}

export default Register;