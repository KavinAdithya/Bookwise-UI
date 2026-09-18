import { Link } from "react-router-dom";
import "../css/Welcome.css"
import { AuthContext } from "./General/Auth/AuthProvider";
import { useContext } from "react";

function Welcome() {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className="welcome-page">

            {/* Hero Section */}
            <section className="welcome-hero">

                <div className="hero-content">

                    <p className="hero-label">
                        WELCOME TO BOOKWISE
                    </p>

                    <h1>
                        Discover your next
                        <span> great book.</span>
                    </h1>

                    <p className="hero-description">
                        Discover, borrow, and buy books from a
                        library built for readers and authors.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/books" className="primary-button">
                            Explore Books
                        </Link>
                        {!isAuthenticated && 
                            <Link to="/login" className="secondary-button">
                                Sign In
                            </Link>
                        }
                    </div>

                </div>

                <div className="hero-image">
                    📚
                </div>

            </section>


            {/* Features */}
            <section className="features-section">

                <h2>Everything you need to enjoy books</h2>

                <p className="section-description">
                    BookWise makes discovering and managing your
                    reading journey simple.
                </p>

                <div className="features">

                    <div className="feature-card">
                        <div className="feature-icon">🔎</div>
                        <h3>Discover</h3>
                        <p>
                            Explore books across different
                            categories and find your next read.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📚</div>
                        <h3>Borrow</h3>
                        <p>
                            Borrow books according to your
                            subscription plan.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🛒</div>
                        <h3>Buy</h3>
                        <p>
                            Purchase books you want to keep
                            permanently.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">✍️</div>
                        <h3>For Authors</h3>
                        <p>
                            Publish books, reach readers and
                            manage your earnings.
                        </p>
                    </div>

                </div>

            </section>


            {/* Author Section */}
            <section className="author-section">

                <div>
                    <p className="hero-label">
                        FOR AUTHORS
                    </p>

                    <h2>
                        Share your stories with readers.
                    </h2>

                    <p>
                        Publish your books on BookWise and
                        build your audience while tracking
                        your revenue.
                    </p>

                    <Link
                        to="/register"
                        className="primary-button"
                    >
                        Become an Author
                    </Link>
                </div>

            </section>


            {/* Final CTA */}
            <section className="welcome-cta">

                <h2>
                    Your next chapter starts here.
                </h2>

                <p>
                    Explore books and discover something
                    worth reading.
                </p>

                <Link
                    to="/books"
                    className="primary-button"
                >
                    Explore Books
                </Link>

            </section>

        </div>
    );
}

export default Welcome;