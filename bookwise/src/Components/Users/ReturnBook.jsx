import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    fetchReturnBookDetails,
    returnBorrowBook
} from "../../apiservice/borrowbook/borrowbook";
import '../../css/User/ReturnBook.css'

import { formatDate, formatDateTime } from "../../Utils/Formats";


function ReturnBook() {

    const { borrowBookId } = useParams();
    const navigate = useNavigate();

    const [borrowBook, setBorrowBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBorrowDetails();
    }, [borrowBookId]);

    async function fetchBorrowDetails() {

        try {

            const response =
                await fetchReturnBookDetails(borrowBookId);

            setBorrowBook(response.data.data);

        } catch (error) {

            console.log(
                "Failed to fetch borrow details"
            );

        } finally {

            setLoading(false);

        }
    }


    if (loading) {

        return (
            <div className="return-book-loading">
                Loading return details...
            </div>
        );
    }


    if (!borrowBook) {

        return (
            <div className="return-book-loading">
                Borrow record not found.
            </div>
        );
    }


    const overdueDays = borrowBook.dueAmountDetails.daysDelayed;

    const finePerDay = borrowBook.dueAmountDetails.daysFineAmount || 0;

    const dueAmount = borrowBook.dueAmountDetails.totalDueAmount;


    const isOverdue =
        overdueDays > 0;


    async function handleConfirmReturn() {

        const data = {
            "borrowBookId" : borrowBook.id,
            "amount" : borrowBook.dueAmountDetails.totalDueAmount
        }

        console.log(data)

        try {
            const response = await returnBorrowBook(data)
            alert(response.data.message)
            navigate("/borrow-books")
        } catch (error) {
            console.log("Failed to return book " + error)
        }

    }


    return (
        <div className="return-book-page">

            {/* BACK */}

            <button
                className="return-back-btn"
                onClick={() => navigate("/borrow-books")}
            >
                ← Back to My Books
            </button>


            {/* HEADER */}

            <div className="return-book-header">

                <span>MY LIBRARY / RETURN</span>

                <h1>Return Book</h1>

                <p>
                    Review the borrowing details and
                    outstanding amount before returning.
                </p>

            </div>


            <div className="return-book-layout">

                {/* =========================
                    LEFT CARD
                ========================= */}

                <div className="return-book-card">

                    <div className="return-book-main">

                        {/* COVER */}

                        <div className="return-cover-container">

                            <img
                                src={`http://localhost:8080/${borrowBook.book.coverImageUrl}`}
                                alt={borrowBook.book.title}
                                className="return-book-cover"
                            />

                        </div>


                        {/* BOOK INFO */}

                        <div className="return-book-info">

                            <span className="return-book-category">
                                {borrowBook.book.categoryName}
                            </span>

                            <h2>
                                {borrowBook.book.title}
                            </h2>

                            <p className="return-book-author">
                                by {borrowBook.book.authorName}
                            </p>

                            <p className="return-book-description">
                                {borrowBook.book.description}
                            </p>

                        </div>

                    </div>


                    <div className="return-divider" />


                    {/* BORROWING INFORMATION */}

                    <div className="return-section">

                        <h3>Borrowing Information</h3>

                        <div className="return-info-grid">

                            <div className="return-info-item">

                                <span>
                                    Borrowed On
                                </span>

                                <strong>
                                    {formatDateTime(
                                        borrowBook.borrowedDate
                                    )}
                                </strong>

                            </div>


                            <div className="return-info-item">

                                <span>
                                    Due Date
                                </span>

                                <strong>
                                    {formatDateTime(
                                        borrowBook.dueDate
                                    )}
                                </strong>

                            </div>


                            <div className="return-info-item">

                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {borrowBook.quantity}
                                </strong>

                            </div>


                            <div className="return-info-item">

                                <span>
                                    Borrow Duration
                                </span>

                                <strong>
                                     {borrowBook.dueAmountDetails.totalDays} Days
                                </strong>

                            </div>

                        </div>

                    </div>


                    <div className="return-divider" />


                    {/* RETURN DATE */}

                    <div className="return-section">

                        <h3>Return Information</h3>

                        <div className="return-info-grid">

                            <div className="return-info-item">

                                <span>
                                    Return Date
                                </span>

                                <strong>
                                    {formatDateTime(
                                        new Date().toISOString()
                                    )}
                                </strong>

                            </div>


                            <div className="return-info-item">

                                <span>
                                    Overdue Days
                                </span>

                                <strong
                                    className={
                                        isOverdue
                                            ? "overdue-value"
                                            : "normal-value"
                                    }
                                >
                                    {overdueDays} Days
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RIGHT SUMMARY
                ========================= */}

                <div className="return-summary-card">

                    <h2>Return Summary</h2>


                    <div className="return-summary-book">

                        <div className="return-summary-cover">

                            <img
                                src={`http://localhost:8080/${borrowBook.book.coverImageUrl}`}
                                alt={borrowBook.book.title}
                            />

                        </div>

                        <div>

                            <h3>
                                {borrowBook.book.title}
                            </h3>

                            <p>
                                {borrowBook.book.authorName}
                            </p>

                        </div>

                    </div>


                    <div className="return-summary-divider" />


                    <div className="return-summary-row">

                        <span>
                            Quantity
                        </span>

                        <strong>
                            {borrowBook.quantity}
                        </strong>

                    </div>


                    <div className="return-summary-row">

                        <span>
                            Due Date
                        </span>

                        <strong>
                            {formatDate(
                                borrowBook.dueDate
                            )}
                        </strong>

                    </div>


                    <div className="return-summary-row">

                        <span>
                            Overdue Days
                        </span>

                        <strong
                            className={
                                isOverdue
                                    ? "summary-overdue"
                                    : ""
                            }
                        >
                            {overdueDays}
                        </strong>

                    </div>


                    <div className="return-summary-row">

                        <span>
                            Fine / Day
                        </span>

                        <strong>
                            ₹{finePerDay}
                        </strong>

                    </div>


                    <div className="return-summary-divider" />


                    <div className="return-due-amount">

                        <span>
                            Due Amount
                        </span>

                        <strong>
                            ₹{dueAmount}
                        </strong>

                    </div>


                    {/* STATUS MESSAGE */}

                    {isOverdue ? (

                        <div className="return-overdue-notice">

                            <span>!</span>

                            <p>
                                This book is overdue by{" "}
                                <strong>
                                    {overdueDays}{" "}
                                    {overdueDays === 1
                                        ? "day"
                                        : "days"}
                                </strong>.
                                A fine of ₹{dueAmount} is
                                currently due.
                            </p>

                        </div>

                    ) : (

                        <div className="return-success-notice">

                            <span>✓</span>

                            <p>
                                This book is being returned
                                before the due date. No fine
                                is currently due.
                            </p>

                        </div>

                    )}


                    <button
                        className="confirm-return-btn"
                        onClick={handleConfirmReturn}
                    >
                        Confirm Return
                    </button>


                    <button
                        className="cancel-return-btn"
                        onClick={() => navigate("/borrow-books")}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ReturnBook;