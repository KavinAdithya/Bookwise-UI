import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import Navigation from "./Navigation";
import Logo from './Logo';
import '../../../css/General/Header.css'


function Header() {
    const {user, logout, isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    function loginNavigate() {
        navigate("/login")
    }

    return (
        <header className="header">

            <Logo/>
            <Navigation/>

            <div className="header-right">
            {
                !isAuthenticated &&
                <>
                    <button onClick={loginNavigate}>
                        Login
                    </button>
                </>
            }

            { isAuthenticated &&
                <>
                    <span className="username">
                        {user?.name}
                    </span>
                    <button onClick={logout}>
                        Logout
                    </button>
                </>
            } 
            
            </div>  

        </header>
    );

}

export default Header;