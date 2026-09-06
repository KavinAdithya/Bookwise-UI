import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

function Header() {
    const {isAuthenticated, user} = useContext(AuthContext)
    const isAdmin = user.role == "ADMIN";
    const isAuthor = user.role == "AUTHOR";
    const isUser = user.role == "USER";

        return (
        <header className="header">

            {/* Logo */}
            <div className="header-logo">
                <Link to="/home">📚 BookWise</Link>
            </div>

            {/* Navigation */}
            <nav className="header-nav">

                <Link to="/home">Home</Link>

                {isUser && (
                    <>
                        <Link to="/books">Books</Link>
                        <Link to="/history">History</Link>
                        <Link to="/subscription">
                            Subscription
                        </Link>
                    </>
                )}

                {isAuthor && (
                    <>
                        <Link to="/author/books">
                            My Books
                        </Link>
                        <Link to="/author/revenue">
                            Revenue
                        </Link>
                    </>
                )}

                {isAdmin && (
                    <>
                        <Link to="/admin/users">
                            Users
                        </Link>
                        <Link to="/admin/authors">
                            Authors
                        </Link>
                    </>
                )}

            </nav>

            {/* Right side */}
            <div className="header-right">

                <span className="username">
                    {user?.name}
                </span>

                <button>
                    <Link to="/logout">Logout</Link>
                </button>

            </div>

        </header>
    );

}

export default Header;