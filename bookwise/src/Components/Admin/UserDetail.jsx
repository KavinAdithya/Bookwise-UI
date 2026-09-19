import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../apiservice/users/userservice";
import "../../css/Admin/UserDetail.css";

function UserDetail() {

    const { userId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    async function fetchUser() {
        try {
            const response = await getUserById(userId);
            setUser(response.data.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (!user) {
        return (
            <div className="user-detail-loading">
                Loading user details...
            </div>
        );
    }

    return (
        <div className="user-detail-page">

            {/* Page Header */}
            <div className="user-detail-header">

                <div>
                    <span className="user-detail-label">
                        ADMIN / USERS
                    </span>

                    <h1>User Details</h1>

                    <p>
                        View account and subscription information
                    </p>
                </div>

                <button
                    className="user-back-btn"
                    onClick={() => navigate("/admin/users")}
                >
                    ← Back to Users
                </button>

            </div>


            {/* Profile Summary */}
            <div className="user-profile-card">

                <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                </div>

                <div className="user-profile-info">

                    <h2>{user.name}</h2>

                    <p>@{user.username}</p>

                </div>

                <div className="user-profile-status">

                    <span className={`user-role ${user.role?.toLowerCase()}`}>
                        {user.role}
                    </span>

                </div>

            </div>


            {/* Basic Information */}
            <div className="user-detail-card">

                <div className="detail-card-header">
                    <h2>Basic Information</h2>
                    <p>Personal and contact information</p>
                </div>

                <div className="user-info-grid">

                    <div className="user-info-item">
                        <span>Name</span>
                        <strong>{user.name}</strong>
                    </div>

                    <div className="user-info-item">
                        <span>Username</span>
                        <strong>{user.username}</strong>
                    </div>

                    <div className="user-info-item">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className="user-info-item">
                        <span>Contact</span>
                        <strong>{user.contact || "Not provided"}</strong>
                    </div>

                    <div className="user-info-item full-width">
                        <span>Address</span>
                        <strong>{user.address || "Not provided"}</strong>
                    </div>

                </div>

            </div>


            {/* Account Information */}
            <div className="user-detail-card">

                <div className="detail-card-header">
                    <h2>Account Information</h2>
                    <p>Account status and registration details</p>
                </div>

                <div className="user-info-grid">

                    <div className="user-info-item">
                        <span>Role</span>

                        <span className={`user-role ${user.role?.toLowerCase()}`}>
                            {user.role}
                        </span>
                    </div>

                    <div className="user-info-item">
                        <span>Registered On</span>

                        <strong>
                            {user.createdAt
                                ? user.createdAt.split("T")[0]
                                : "N/A"}
                        </strong>
                    </div>

                </div>

            </div>


            {/* Subscription */}
            <div className="user-detail-card">

                <div className="detail-card-header">
                    <h2>Subscription</h2>
                    <p>User's current subscription plan</p>
                </div>

                <div className="subscription-detail">

                    <div>
                        <span>Plan</span>

                        <strong>
                            {user.subscription?.plan || "FREE"}
                        </strong>
                    </div>

                    {user.subscription?.startDate && (
                        <div>
                            <span>Start Date</span>
                            <strong>
                                {user.subscription.startDate.split("T")[0]}
                            </strong>
                        </div>
                    )}

                    {user.subscription?.endDate && (
                        <div>
                            <span>End Date</span>
                            <strong>
                                {user.subscription.endDate.split("T")[0]}
                            </strong>
                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}

export default UserDetail;