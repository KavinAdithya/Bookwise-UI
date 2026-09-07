import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const navigation = {
    USER: [
        { label: "Books", path: "/books" },
        { label: "History", path: "/history" },
        { label: "Subscription", path: "/subscription" }
    ],

    AUTHOR: [
        { label: "My Books", path: "/author/books" },
        { label: "Revenue", path: "/author/revenue" }
    ],

    ADMIN: [
        { label: "Users", path: "/admin/users" },
        { label: "Authors", path: "/admin/authors" }
    ]
};


function Navigation() {

    const { user } = useContext(AuthContext);

    const links = navigation[user?.role] || [];

    return (
        <nav className="header-nav">

            <Link to="/home">Home</Link>

            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                >
                    {link.label}
                </Link>
            ))}

        </nav>
    );
}

export default Navigation;