import { useContext } from "react";
import { AuthContext } from "../General/AuthProvider";

function Welcome() {
    const {user} = useContext(AuthContext)
    return <>
        <h1>Welcome to Book Wise Application </h1>
        <h2>Designed and Developed by Techrack</h2>
        <h3>Hi {user.username} looking for interesting books ?</h3>
    </>
}

export default Welcome;