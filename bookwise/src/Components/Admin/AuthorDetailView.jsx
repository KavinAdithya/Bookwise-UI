import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuthorById } from "../../apiservice/authors/AuthorService";
import "../../css/Admin/AuthorDetailView.css";
import { approveAuthor, rejectAuthor } from "../../apiservice/authors/AuthorService";

function AuthorDetailView() {

    const { authorId } = useParams();
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


    // Loading state
    if (!author) {
        return <div>Loading...</div>;
    }

    async function handleApprove(authorId) {
        try {
            await approveAuthor(authorId);
        } catch (error) {
            console.error("Error approving author:", error);
        }
    }

    async function handleReject(authorId) {
        try {
            await rejectAuthor(authorId);
        } catch (error) {
            console.error("Error rejecting author:", error);
        }
    }

    return (
        <div className="author-detail-page">

            <div className="author-detail-card">

                <div className="author-detail-header">

                    <div>
                        <h1>Author Details</h1>
                        <p>
                            Review author registration information
                        </p>
                    </div>

                    <span
                        className={`status ${author.status.toLowerCase()}`}
                    >
                        {author.status}
                    </span>

                </div>


                <div className="author-info">

                    <h2>Personal Information</h2>

                    <div className="info-grid">

                        <div className="info-item">
                            <label>Name</label>
                            <p>{author.authorName}</p>
                        </div>

                        <div className="info-item">
                            <label>Email</label>
                            <p>{author.email}</p>
                        </div>

                        <div className="info-item">
                            <label>Username</label>
                            <p>{author.username}</p>
                        </div>

                        <div className="info-item">
                            <label>Contact</label>
                            <p>{author.contact}</p>
                        </div>

                        <div className="info-item">
                            <label>Registered Date</label>
                            <p>
                                {new Date(
                                    author.createdAt
                                ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric"
                                })}
                            </p>
                        </div>

                        <div className="info-item full-width">
                            <label>Address</label>
                            <p>{author.address}</p>
                        </div>

                    </div>

                </div>


                {author.status === "PENDING" && (

                    <div className="author-actions">

                        <button
                            className="reject-btn"
                            onClick={() => handleReject(author.id)}
                        >
                            Reject
                        </button>

                        <button
                            className="approve-btn"
                            onClick={() => handleApprove(author.id)}
                        >
                            Approve
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AuthorDetailView;