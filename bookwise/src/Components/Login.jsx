import { useContext, useState } from "react";
import { authenitcateUser } from "../apiservice/users/userservice";
import { AuthContext } from "./AuthProvider";

function Login() {
    const [username, setUsername] = useState("Techcrack")
    const [password, setPassword] = useState();
    const {login} = useContext(AuthContext)

    async function authenticate() {
        const credential = {
            "username" : username,
            "password" :  password
        }

        const response = await authenitcateUser(credential)
        
        login(response.data.data.token)
    }

    return <>
        <h3>Log in</h3>
        <div>
            <label> Username : </label>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/> <br/>
        </div>
        <div>
            <label>Password : </label>
            <input type="text" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/> <br/>          
        </div>
        <button type="submit" onClick={authenticate}>Submit</button>
    </>
}

export default Login;