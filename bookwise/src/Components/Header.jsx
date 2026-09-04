import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Header() {
    const {isAuthenticated} = useContext(AuthContext)

    return (
        <header>
            <h1>Book Wise Application</h1>
            {!isAuthenticated && <Link to="/login"> Login </Link>}
            {isAuthenticated && <Link to="/logout"> Logout </Link>}
        </header>
    )
}

export default Header;