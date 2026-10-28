import { useContext, useState, useEffect } from 'react';
import '../../css/Admin/AdminHome.css';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../General/Auth/AuthProvider'
import { getAuthorByStatus } from '../../apiservice/authors/AuthorService';
import { getDashboardDetails } from '../../apiservice/adminRevenue/AdminRevenue';

function AdminHome() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)

    const [authors, setAuthors] = useState([]);
    const [dashboardDetails, setDashboardDetails] = useState();  


        useEffect(() => {
            async function fetchPendingAuthors() {
                try {   
                    const response = await getAuthorByStatus("PENDING");
                    setAuthors(response.data.data);
                }   catch (error) { 
                    console.error("Error fetching authors:", error);
                }   
            }

            async function fetchDashboardDetails() {
                try {
                    const response = await getDashboardDetails();
                    setDashboardDetails(response.data.data);
                } catch (error) {    
                    console.error("Error fetching dashboard details:", error);
                }
            }
            fetchPendingAuthors();
            fetchDashboardDetails();
        }, []);
    
    if (!authors)
        return <div>Loading...</div>

    return (
        <div className="admin-home">

    {/* Welcome */}
    <section className="admin-welcome">

        <div>
            <p>BOOKWISE ADMIN</p>

            <h1>Welcome back, {user?.name} Admin 👋</h1>

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
            <h2>{dashboardDetails?.totalUsers || 0}</h2>
            <p>Total Users</p>
        </div>

        <div className="stat-card">
            <span>✍️</span>
            <h2>{dashboardDetails?.totalAuthors || 0}</h2>
            <p>Total Authors</p>
        </div>

        <div className="stat-card">
            <span>📚</span>
            <h2>{dashboardDetails?.totalBooks || 0}</h2>
            <p>Total Books</p>
        </div>

        <div className="stat-card">
            <span>💰</span>
            <h2>{dashboardDetails?.totalRevenue ? `₹${dashboardDetails.totalRevenue.toLocaleString()}` : '₹0'}</h2>
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

                <div className="author-table">

                    <div className="table-row1 table-header1">
                        <div>Author</div>
                        <div>Email</div>
                        <div>Submitted On</div>
                        <div>Status</div>
                    </div>

                    {authors.map((author) => (
                        <div className="table-row1" key={author.id}>
                            <div>{author.authorName}</div>
                            <div>{author.email}</div>
                            <div>{author.createdAt.split("T")[0]}</div>

                            <div>
                                <span className={`status ${author.status.toLowerCase()}`}>
                                    {author.status}
                                </span>
                            </div>
                        </div>
                    ))}
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
                <h3>{dashboardDetails?.totalBooks || 0}</h3>
                <p>Total Books</p>
            </div>

            <div>
                <span>✅</span>
                <h3>{dashboardDetails?.totalApprovedBooks || 0}</h3>
                <p>Approved</p>
            </div>

            <div>
                <span>⏳</span>
                <h3>{dashboardDetails?.totalPendingBooks || 0}</h3>
                <p>Pending</p>
            </div>

            <div>
                <span>❌</span>
                <h3>{dashboardDetails?.totalRejectedBooks || 0}</h3>
                <p>Rejected</p>
            </div>

        </div>

    </section>


    {/* Revenue */}
    <section className="admin-revenue">

        <div>
            <p>PLATFORM REVENUE</p>

            <h2>{dashboardDetails?.totalRevenue ? `₹${dashboardDetails.totalRevenue.toLocaleString()}` : '₹0'}</h2>

            <p>
                Monitor purchases, borrowing fees,
                and platform earnings.
            </p>
        </div>

        <button
            onClick={() => navigate("/admin/revenue/summary")}
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
                onClick={() => navigate("/admin/revenue/summary")}
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