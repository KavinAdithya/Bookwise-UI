import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const navigation = {
    USER: [
        { label: "Home", path: "/home"},
        { label: "Books", path: "/books" },
        { label: "History", path: "/history" },
        { label: "Subscription", path: "/subscription" }
    ],

    AUTHOR: [
        { label: "Home", path: "/author/home"},
        { label: "My Books", path: "/author/books" },
        { label: "Revenue", path: "/author/revenue" }
    ],

    ADMIN: [
        { label: "Home", path: "/admin/home"},
        { label: "Users", path: "/admin/users" },
        { label: "Authors", path: "/admin/authors" }
    ]
};


function Navigation() {

    const { user } = useContext(AuthContext);

    const links = navigation[user?.role] || [];

    return (
        <nav className="header-nav">

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