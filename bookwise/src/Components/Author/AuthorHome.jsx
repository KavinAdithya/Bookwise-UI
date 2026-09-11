import '../../css/Author/AuthorHome.css';
import { useContext } from 'react';
import { AuthContext } from '../General/AuthProvider';
import { useNavigate } from 'react-router-dom';

function AuthorHome() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    
    return (
        <div className="author-home">

    {/* Welcome */}
    <section className="author-welcome">
        <p>BOOKWISE AUTHOR</p>

        <h1>Welcome back, {user?.name} 👋</h1>

        <p>
            Manage your books, track your earnings,
            and reach more readers.
        </p>

        <button onClick={() => navigate("/author/books/register")}>
            + Add New Book
        </button>
    </section>


    {/* Statistics */}
    <section className="author-stats">

        <div className="stat-card">
            <span>📚</span>
            <h2>12</h2>
            <p>Total Books</p>
        </div>

        <div className="stat-card">
            <span>📖</span>
            <h2>8</h2>
            <p>Published Books</p>
        </div>

        <div className="stat-card">
            <span>💰</span>
            <h2>₹24,500</h2>
            <p>Total Revenue</p>
        </div>

        <div className="stat-card">
            <span>👥</span>
            <h2>1,245</h2>
            <p>Total Readers</p>
        </div>

    </section>


    {/* My Books */}
    <section className="author-books">

        <div className="section-header">
            <div>
                <h2>My Books</h2>
                <p>Manage your published and submitted books.</p>
            </div>

            <button onClick={() => navigate("/author/books")}>
                View All
            </button>
        </div>

        <div className="book-list">

            <div className="author-book">
                <div className="book-cover">
                    📘
                </div>

                <div className="book-details">
                    <h3>Java Fundamentals</h3>
                    <p>Technology</p>
                    <span className="status published">
                        Published
                    </span>
                </div>
            </div>


            <div className="author-book">
                <div className="book-cover">
                    📗
                </div>

                <div className="book-details">
                    <h3>Spring Boot Guide</h3>
                    <p>Technology</p>
                    <span className="status published">
                        Published
                    </span>
                </div>
            </div>


            <div className="author-book">
                <div className="book-cover">
                    📕
                </div>

                <div className="book-details">
                    <h3>Advanced Java</h3>
                    <p>Programming</p>
                    <span className="status pending">
                        Pending Approval
                    </span>
                </div>
            </div>

        </div>

    </section>


    {/* Revenue */}
    <section className="revenue-section">

        <div>
            <p>YOUR EARNINGS</p>

            <h2>₹24,500</h2>

            <p>
                Keep track of your book sales and
                borrowing revenue.
            </p>
        </div>

        <button onClick={() => navigate("/author/revenue")}>
            View Revenue
        </button>

    </section>


    {/* Quick Actions */}
    <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-grid">

            <button onClick={() => navigate("/author/books/add")}>
                📚
                <span>Add New Book</span>
            </button>

            <button onClick={() => navigate("/author/books")}>
                📖
                <span>Manage Books</span>
            </button>

            <button onClick={() => navigate("/author/revenue")}>
                💰
                <span>View Revenue</span>
            </button>

            <button onClick={() => navigate("/author/profile")}>
                👤
                <span>My Profile</span>
            </button>

        </div>

    </section>

</div>
    );
}

export default AuthorHome;
