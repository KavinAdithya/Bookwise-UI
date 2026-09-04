import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const {logout} = useContext(AuthContext)

    logout();

    const navigate = useNavigate()

    navigate("/welcome")
}