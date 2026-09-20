import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAuthorById,
    approveAuthor,
    rejectAuthor
} from "../../apiservice/authors/AuthorService";

import "../../css/Admin/AuthorDetailView.css";

function AuthorDetailView() {

    const { authorId } = useParams();
    const navigate = useNavigate();

    const [author, setAuthor] = useState(null);

    useEffect(() => {

        async function fetchAuthor() {
            try {

                const response = await getAuthorById(authorId);

                setAuthor(response.data.data);

            } catch (error) {

                console.error(
                    "Error fetching author details:",
                    error
                );

            }
        }

        fetchAuthor();

    }, [authorId]);


    async function handleApprove() {

        try {

            await approveAuthor(author.id);

            setAuthor({
                ...author,
                status: "APPROVED"
            });

        } catch (error) {

            console.error(
                "Error approving author:",
                error
            );

        }
    }


    async function handleReject() {

        try {

            await rejectAuthor(author.id);

            setAuthor({
                ...author,
                status: "REJECTED"
            });

        } catch (error) {

            console.error(
                "Error rejecting author:",
                error
            );

        }
    }


    if (!author) {
        return (
            <div className="author-detail-loading">
                Loading author details...
            </div>
        );
    }


    return (

        <div className="author-detail-page">


            {/* =========================
                Page Header
            ========================= */}

            <div className="author-detail-page-header">

                <div>

                    <span className="author-detail-label">
                        ADMIN / AUTHORS
                    </span>

                    <h1>Author Review</h1>

                    <p>
                        Review author registration information
                    </p>

                </div>


                <button
                    className="author-back-btn"
                    onClick={() => navigate("/admin/authors")}
                >
                    ← Back to Authors
                </button>

            </div>


            {/* =========================
                Main Card
            ========================= */}

            <div className="author-detail-card">


                {/* =========================
                    Author Summary
                ========================= */}

                <div className="author-summary">

                    <div className="author-avatar">

                        {author.authorName
                            ?.charAt(0)
                            .toUpperCase()
                        }

                    </div>


                    <div className="author-summary-info">

                        <h2>
                            {author.authorName}
                        </h2>

                        <p>
                            @{author.username}
                        </p>

                    </div>


                    <span
                        className={`author-status ${author.status.toLowerCase()}`}
                    >
                        {author.status}
                    </span>

                </div>


                {/* =========================
                    Personal Information
                ========================= */}

                <div className="author-info-section">

                    <div className="author-section-header">

                        <h3>Personal Information</h3>

                        <p>
                            Registration and contact information
                        </p>

                    </div>


                    <div className="author-info-grid">


                        <div className="author-info-item">

                            <span>Name</span>

                            <strong>
                                {author.authorName}
                            </strong>

                        </div>


                        <div className="author-info-item">

                            <span>Email</span>

                            <strong>
                                {author.email}
                            </strong>

                        </div>


                        <div className="author-info-item">

                            <span>Username</span>

                            <strong>
                                {author.username}
                            </strong>

                        </div>


                        <div className="author-info-item">

                            <span>Contact</span>

                            <strong>
                                {author.contact || "Not provided"}
                            </strong>

                        </div>


                        <div className="author-info-item">

                            <span>Registered Date</span>

                            <strong>
                                {new Date(
                                    author.createdAt
                                ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </strong>

                        </div>


                        <div className="author-info-item author-full-width">

                            <span>Address</span>

                            <strong>
                                {author.address || "Not provided"}
                            </strong>

                        </div>


                    </div>

                </div>


                {/* =========================
                    Review Decision
                ========================= */}

                {author.status === "PENDING" && (

                    <div className="author-review-section">

                        <div className="author-review-content">

                            <h3>
                                Review Decision
                            </h3>

                            <p>
                                Review the information above before
                                approving or rejecting this author
                                registration request.
                            </p>

                        </div>


                        <div className="author-review-actions">

                            <button
                                className="author-reject-btn"
                                onClick={handleReject}
                            >
                                Reject
                            </button>


                            <button
                                className="author-approve-btn"
                                onClick={handleApprove}
                            >
                                Approve
                            </button>

                        </div>

                    </div>

                )}


                {/* =========================
                    Completed Status
                ========================= */}

                {author.status !== "PENDING" && (

                    <div className="author-completed-section">

                        <span
                            className={`author-status ${author.status.toLowerCase()}`}
                        >
                            {author.status}
                        </span>

                        <p>
                            This author registration request has already
                            been reviewed.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AuthorDetailView;