import { Link } from "react-router-dom";
import "../../css/Users/UserHome.css"

function UserHome() {
    return (
        <div className="user-home">

            {/* Welcome */}
            <section className="home-welcome">

                <div>
                    <p className="home-label">
                        BOOKWISE
                    </p>

                    <h1>
                        Welcome back 👋
                    </h1>

                    <p>
                        Find something great to read today.
                    </p>
                </div>

                <Link
                    to="/books"
                    className="home-search-button"
                >
                    🔎 Explore Books
                </Link>

            </section>


            {/* Featured Books */}
            <section className="home-section">

                <div className="section-header">

                    <div>
                        <h2>Featured Books</h2>
                        <p>
                            Discover books you might enjoy.
                        </p>
                    </div>

                    <Link to="/books">
                        View All
                    </Link>

                </div>


                <div className="book-grid">

                    <div className="book-card">
                        <div className="user-book-cover">
                            📖
                        </div>

                        <h3>Clean Code</h3>

                        <p>Robert C. Martin</p>
                    </div>


                    <div className="book-card">
                        <div className="user-book-cover">
                            📕
                        </div>

                        <h3>Atomic Habits</h3>

                        <p>James Clear</p>
                    </div>


                    <div className="book-card">
                        <div className="user-book-cover">
                            📗
                        </div>

                        <h3>The Psychology of Money</h3>

                        <p>Morgan Housel</p>
                    </div>


                    <div className="book-card">
                        <div className="user-book-cover">
                            📘
                        </div>

                        <h3>Deep Work</h3>

                        <p>Cal Newport</p>
                    </div>

                </div>

            </section>


            {/* Categories */}
            <section className="home-section">

                <div className="section-header">
                    <div>
                        <h2>Browse Categories</h2>
                        <p>
                            Explore books by category.
                        </p>
                    </div>
                </div>


                <div className="category-grid">

                    <Link to="/books?category=fiction">
                        Fiction
                    </Link>

                    <Link to="/books?category=technology">
                        Technology
                    </Link>

                    <Link to="/books?category=business">
                        Business
                    </Link>

                    <Link to="/books?category=history">
                        History
                    </Link>

                    <Link to="/books?category=romance">
                        Romance
                    </Link>

                    <Link to="/books?category=self-help">
                        Self Help
                    </Link>

                </div>

            </section>


            {/* Subscription */}
            <section className="subscription-card">

                <div>
                    <p className="home-label">
                        YOUR SUBSCRIPTION
                    </p>

                    <h2>
                        Manage your reading plan
                    </h2>

                    <p>
                        Check your current plan and
                        explore available subscription options.
                    </p>
                </div>

                <Link
                    to="/subscription"
                    className="home-search-button"
                >
                    View Subscription
                </Link>

            </section>

        </div>
    );
}

export default UserHome;