import '../../css/Admin/AdminHome.css';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
    const navigate = useNavigate();

    return (
        <div className="admin-home">

    {/* Welcome */}
    <section className="admin-welcome">

        <div>
            <p>BOOKWISE ADMIN</p>

            <h1>Welcome back, Admin 👋</h1>

            <p>
                Manage users, authors, books, subscriptions,
                and the BookWise platform.
            </p>
        </div>

    </section>


    {/* Statistics */}
    <section className="admin-stats">

        <div className="stat-card">
            <span>👥</span>
            <h2>1,245</h2>
            <p>Total Users</p>
        </div>

        <div className="stat-card">
            <span>✍️</span>
            <h2>84</h2>
            <p>Total Authors</p>
        </div>

        <div className="stat-card">
            <span>📚</span>
            <h2>3,421</h2>
            <p>Total Books</p>
        </div>

        <div className="stat-card">
            <span>💰</span>
            <h2>₹1,25,500</h2>
            <p>Total Revenue</p>
        </div>

    </section>


    {/* Pending Author Requests */}
    <section className="admin-section">

        <div className="section-header">

            <div>
                <h2>Pending Author Requests</h2>

                <p>
                    Review authors waiting for approval.
                </p>
            </div>

            <button
                onClick={() => navigate("/admin/authors")}
            >
                View All
            </button>

        </div>


        <div className="request-list">

            <div className="request-card">

                <div>
                    <h3>John David</h3>
                    <p>john@example.com</p>
                </div>

                <span className="status pending">
                    Pending
                </span>

                <button
                    onClick={() =>
                        navigate("/admin/authors")
                    }
                >
                    Review
                </button>

            </div>


            <div className="request-card">

                <div>
                    <h3>David Kumar</h3>
                    <p>david@example.com</p>
                </div>

                <span className="status pending">
                    Pending
                </span>

                <button
                    onClick={() =>
                        navigate("/admin/authors")
                    }
                >
                    Review
                </button>

            </div>

        </div>

    </section>


    {/* Book Management */}
    <section className="admin-section">

        <div className="section-header">

            <div>
                <h2>Book Management</h2>

                <p>
                    Monitor books added by authors.
                </p>
            </div>

            <button
                onClick={() => navigate("/admin/books")}
            >
                Manage Books
            </button>

        </div>


        <div className="book-summary">

            <div>
                <span>📚</span>
                <h3>3,421</h3>
                <p>Total Books</p>
            </div>

            <div>
                <span>✅</span>
                <h3>3,250</h3>
                <p>Approved</p>
            </div>

            <div>
                <span>⏳</span>
                <h3>120</h3>
                <p>Pending</p>
            </div>

            <div>
                <span>❌</span>
                <h3>51</h3>
                <p>Rejected</p>
            </div>

        </div>

    </section>


    {/* Revenue */}
    <section className="admin-revenue">

        <div>
            <p>PLATFORM REVENUE</p>

            <h2>₹1,25,500</h2>

            <p>
                Monitor purchases, borrowing fees,
                and platform earnings.
            </p>
        </div>

        <button
            onClick={() => navigate("/admin/reports")}
        >
            View Reports
        </button>

    </section>


    {/* Quick Actions */}
    <section className="quick-actions">

        <h2>Quick Actions</h2>

        <div className="action-grid">

            <button
                onClick={() => navigate("/admin/users")}
            >
                <span>👥</span>
                Manage Users
            </button>

            <button
                onClick={() => navigate("/admin/authors")}
            >
                <span>✍️</span>
                Manage Authors
            </button>

            <button
                onClick={() => navigate("/admin/books")}
            >
                <span>📚</span>
                Manage Books
            </button>

            <button
                onClick={() => navigate("/admin/reports")}
            >
                <span>📊</span>
                View Reports
            </button>

        </div>

    </section>

</div>
    )
}

export default AdminHome;