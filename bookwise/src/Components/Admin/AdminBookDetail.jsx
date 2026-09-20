import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookByIdForAdmin, approveBooks, rejectBooks } from "../../apiservice/books/Book";
import "../../css/Admin/AdminBookDetail.css";

function AdminBookDetail() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    async function fetchBook() {
        try {
            const response = await getBookByIdForAdmin(bookId);
            setBook(response.data.data);
        } catch (error) {
            console.error("Error fetching book:", error);
        }
    }

    useEffect(() => {
        fetchBook();
    }, [bookId]);


    async function handleApprove() {
        console.log("Approve book:", book.id);

        const requestData = {
            bookIds :[bookId]
        }

        try {
            await approveBooks(requestData);
            alert("Book Approved") 
            navigate("/admin/books")
        } catch(error) {
            alert("Failed to Approve book due to " + error)
        }
    }


    async function handleReject() {
        console.log("Reject book:", book.id);
        
        const requestData = {
            bookIds :[bookId]
        }

        try {
            await rejectBooks(requestData);
            alert("Book Rejected") 
            navigate("/admin/books")
        } catch(error) {
            alert("Failed to Reject book due to " + error)
        }
    }


    if (!book) {
        return (
            <div className="admin-book-loading">
                Loading book details...
            </div>
        );
    }


    return (
        <div className="admin-book-detail-page">

            {/* =========================
                Page Header
            ========================= */}

            <div className="admin-book-detail-header">

                <div>

                    <span className="admin-book-detail-label">
                        ADMIN / BOOKS
                    </span>

                    <h1>Book Review</h1>

                    <p>
                        Review the submitted book before approving or rejecting it.
                    </p>

                </div>


                <button
                    className="admin-book-back-btn"
                    onClick={() => navigate("/admin/books")}
                >
                    ← Back to Books
                </button>

            </div>


            {/* =========================
                Main Book Card
            ========================= */}

            <div className="admin-book-detail-card">


                {/* =========================
                    Book Summary
                ========================= */}

                <div className="admin-book-summary">

                    <div className="admin-book-cover">

                        <img
                            src={`http://localhost:8080/${book.coverImageUrl}`}
                            alt={book.title}
                        />

                    </div>


                    <div className="admin-book-summary-content">

                        <div className="admin-book-title-row">

                            <div>

                                <h2>{book.title}</h2>

                                <p className="admin-book-author">
                                    By {book.authorName}
                                </p>

                            </div>


                            <span
                                className={`admin-book-status ${book.status.toLowerCase()}`}
                            >
                                {book.status}
                            </span>

                        </div>


                        <p className="admin-book-description">
                            {book.description}
                        </p>

                    </div>

                </div>


                {/* =========================
                    Book Information
                ========================= */}

                <div className="admin-book-section">

                    <div className="admin-book-section-header">

                        <h3>Book Information</h3>

                        <p>
                            Basic information about the submitted book
                        </p>

                    </div>


                    <div className="admin-book-info-grid">

                        <div className="admin-book-info-item">
                            <span>ISBN</span>
                            <strong>{book.ISBN}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Author</span>
                            <strong>{book.authorName}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Category</span>
                            <strong>{book.categoryName}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Status</span>

                            <span
                                className={`admin-book-status ${book.status.toLowerCase()}`}
                            >
                                {book.status}
                            </span>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Inventory
                ========================= */}

                <div className="admin-book-section">

                    <div className="admin-book-section-header">

                        <h3>Inventory</h3>

                        <p>
                            Current book copy information
                        </p>

                    </div>


                    <div className="admin-book-info-grid">

                        <div className="admin-book-info-item">
                            <span>Total Copies</span>
                            <strong>{book.totalCopies}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Available Copies</span>
                            <strong>{book.availableCopies}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Borrow Fee</span>
                            <strong>₹{book.borrowFee}</strong>
                        </div>


                        <div className="admin-book-info-item">
                            <span>Purchase Price</span>
                            <strong>₹{book.purchasePrice}</strong>
                        </div>

                    </div>

                </div>


                {/* =========================
                    Review Actions
                ========================= */}

                {book.status === "PENDING" && (

                    <div className="admin-book-review-section">

                        <div className="admin-book-review-content">

                            <h3>Review Decision</h3>

                            <p>
                                Review all the information above before
                                making a decision on this book.
                            </p>

                        </div>


                        <div className="admin-book-review-actions">

                            <button
                                className="admin-book-reject-btn"
                                onClick={handleReject}
                            >
                                Reject
                            </button>


                            <button
                                className="admin-book-approve-btn"
                                onClick={handleApprove}
                            >
                                Approve
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default AdminBookDetail;