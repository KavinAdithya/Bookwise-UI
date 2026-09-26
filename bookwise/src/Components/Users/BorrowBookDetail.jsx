import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBorrowDetails } from "../../apiservice/borrowbook/borrowbook";
import { formatDate, formatDateTime } from "../../Utils/Formats";

import "../../css/User/BorrowBookDetail.css"

function BorrowBookDetail() {

    const { borrowBookId } = useParams();
    const navigate = useNavigate();

    const [borrow, setBorrow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBorrowDetails();
    }, [borrowBookId]);

    async function fetchBorrowDetails() {

        try {

            const response = await getBorrowDetails(borrowBookId);

            setBorrow(response.data.data);

        } catch (error) {

            console.log("Failed to fetch borrow details");

        } finally {

            setLoading(false);
        }
    }

    function getStatusClass(status) {

        return status
            ? status.toLowerCase()
            : "";
    }


    function handleReturn() {
        navigate(`/borrow-books/${borrow.id}/return/details`);

    }


    if (loading) {

        return (
            <div className="borrow-detail-loading">
                Loading borrow details...
            </div>
        );
    }


    if (!borrow) {

        return (
            <div className="borrow-detail-loading">
                Borrow record not found.
            </div>
        );
    }


    const book = borrow.book;

    const statusClass =
        getStatusClass(borrow.borrowStatus);


    return (
        <div className="borrow-detail-page">

            {/* =========================
                BACK
            ========================= */}

            <button
                className="borrow-detail-back-btn"
                onClick={() => navigate("/my-books")}
            >
                ← Back to My Books
            </button>


            {/* =========================
                HEADER
            ========================= */}

            <div className="borrow-detail-header">

                <div>

                    <span className="borrow-detail-label">
                        MY LIBRARY / BORROWED BOOK
                    </span>

                    <h1>Borrow Details</h1>

                    <p>
                        View the details of your borrowing.
                    </p>

                </div>


                <span
                    className={`borrow-detail-status ${statusClass}`}
                >
                    {borrow.borrowStatus}
                </span>

            </div>


            {/* =========================
                MAIN LAYOUT
            ========================= */}

            <div className="borrow-detail-layout">

                {/* =========================
                    MAIN CARD
                ========================= */}

                <div className="borrow-detail-main-card">

                    {/* BOOK INFORMATION */}

                    <div className="borrow-detail-book">

                        <div className="borrow-detail-cover-wrapper">

                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                                className="borrow-detail-cover"
                            />

                        </div>


                        <div className="borrow-detail-book-info">

                            <span className="borrow-detail-category">
                                {book.categoryName}
                            </span>

                            <h2>
                                {book.title}
                            </h2>

                            <p className="borrow-detail-author">
                                by {book.authorName}
                            </p>

                            <p className="borrow-detail-description">
                                {book.description}
                            </p>

                        </div>

                    </div>


                    <div className="borrow-detail-divider" />


                    {/* BORROWING INFORMATION */}

                    <div className="borrow-detail-section">

                        <h2>
                            Borrowing Information
                        </h2>


                        <div className="borrow-detail-grid">

                            <div className="borrow-detail-item">

                                <span>
                                    Borrow ID
                                </span>

                                <strong>
                                    #{borrow.id}
                                </strong>

                            </div>


                            <div className="borrow-detail-item">

                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {borrow.borrowQuantity}
                                </strong>

                            </div>


                            <div className="borrow-detail-item">

                                <span>
                                    Borrowed Date
                                </span>

                                <strong>
                                    {formatDate(
                                        borrow.borrowedDate
                                    )}
                                </strong>

                            </div>


                            <div className="borrow-detail-item">

                                <span>
                                    Due Date
                                </span>

                                <strong>
                                    {formatDate(
                                        borrow.dueDate
                                    )}
                                </strong>

                            </div>


                            <div className="borrow-detail-item">

                                <span>
                                    Returned At
                                </span>

                                <strong>
                                    {borrow.returnedAt
                                        ? formatDateTime(
                                            borrow.returnedAt
                                        )
                                        : "Not Returned"}
                                </strong>

                            </div>


                            <div className="borrow-detail-item">

                                <span>
                                    Status
                                </span>

                                <strong>
                                    {borrow.borrowStatus}
                                </strong>

                            </div>

                        </div>

                    </div>

                    {/* PAYMENT INFORMATION */}
                    
                    {borrow.borrowStatus === "RETURNED" && 
                        <div>
                            <div className="borrow-detail-divider" />
                            <div className="borrow-detail-section">

                                <h2>
                                    Payment Information
                                </h2>

                                
                                <div className="payment-summary">

                                    <div className="payment-summary-item">

                                        <span>
                                            Total Amount Paid
                                        </span>

                                        <strong>
                                            ₹{borrow.totalAmountPaid}
                                        </strong>

                                    </div>

                                </div>

                            </div>
                        </div>
                    }   

                </div>


                {/* =========================
                    SIDE CARD
                ========================= */}

                <div className="borrow-detail-side">

                    {/* STATUS */}

                    <div className="borrow-status-card">

                        <span className="side-card-label">
                            BORROW STATUS
                        </span>


                        <span
                            className={`borrow-detail-status ${statusClass}`}
                        >
                            {borrow.borrowStatus}
                        </span>


                        {borrow.borrowStatus === "BORROWED" && (

                            <p>
                                This book is currently borrowed.
                                Please return it before the due date.
                            </p>

                        )}


                        {borrow.borrowStatus === "OVERDUE" && (

                            <p className="overdue-message">
                                This book has passed its due date.
                            </p>

                        )}


                        {borrow.borrowStatus === "RETURNED" && (

                            <p>
                                This book has already been returned.
                            </p>

                        )}

                    </div>


                    {/* BORROW SUMMARY */}

                    <div className="borrow-summary-card">

                        <h2>
                            Borrow Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Quantity
                            </span>

                            <strong>
                                {borrow.borrowQuantity}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Borrowed
                            </span>

                            <strong>
                                {formatDate(
                                    borrow.borrowedDate
                                )}
                            </strong>

                        </div>


                        <div className="summary-row">

                            <span>
                                Due Date
                            </span>

                            <strong>
                                {formatDate(
                                    borrow.dueDate
                                )}
                            </strong>

                        </div>


                        <div className="summary-divider" />


                        <div className="summary-total">

                            <span>
                                Amount Paid
                            </span>

                            <strong>
                                ₹{borrow.totalAmountPaid}
                            </strong>

                        </div>


                        {/* RETURN */}

                        {borrow.borrowStatus === "BORROWED" && (

                            <button
                                className="return-book-btn"
                                onClick={handleReturn}
                            >
                                Return Book
                            </button>

                        )}

                    </div>

                </div>

            </div>

        </div>
    );
}

export default BorrowBookDetail;