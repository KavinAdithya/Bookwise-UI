import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {fetchBorrowBookConfirmationDetails} from '../../apiservice/borrowbook/borrowbook'
import "../../css/User/BorrowBook.css"
import { formatDateTime } from "../../Utils/Formats";

function BorrowBook() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [borrowBook, setBorrowBook] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchBorrowBookConfirmDetails();
    }, [bookId]);

    async function fetchBorrowBookConfirmDetails() {
        try {
            const response = await fetchBorrowBookConfirmationDetails(bookId, quantity);
            setBorrowBook(response.data.data);
        } catch (error) {
            console.log("Failed to fetch book");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="borrow-loading">
                Loading...
            </div>
        );
    }

    if (!borrowBook) {
        return (
            <div className="borrow-loading">
                Book not found
            </div>
        );
    }

    function decreaseQuantity() {
        setQuantity((current) => Math.max(1, current - 1));
    }

    function increaseQuantity() {
        setQuantity((current) =>
            Math.min(borrowBook.subscription.availableBorrowBookCount, current + 1)
        );
    }

    function handleQuantityChange(event) {
        const value = Number(event.target.value);

        if (!value) {
            setQuantity(1);
            return;
        }

        setQuantity(
            Math.min(
                Math.max(value, 1),
                borrowBook.subscription.availableBorrowBookCount
            )
        );
    }

    function handleConfirmBorrow() {
        console.log({
            bookId: book.id,
            quantity
        });
    }

    const canBorrow = borrowBook.subscription.availableBorrowBookCount > 0;
    const totalBorrowCount = borrowBook.subscription.totalBorrowBookCount;
    const availableBorrowCount = borrowBook.subscription.availableBorrowBookCount;
    const usedBorrowCount = totalBorrowCount - availableBorrowCount;

    return (
        <div className="borrow-book-page">

            <button
                className="borrow-back-btn"
                onClick={() => navigate(`/books/${borrowBook.bookId}`)}
            >
                ← Back to Book
            </button>

            <div className="borrow-book-header">
                <span>BOOKS / BORROW</span>
                <h1>Borrow Book</h1>
                <p>
                    Confirm your borrowing details before continuing.
                </p>
            </div>

            <div className="borrow-book-layout">

                {/* LEFT SIDE */}
                <div className="borrow-book-card">

                    <div className="borrow-book-info">

                        <div className="borrow-cover-container">
                            <img
                                src={`http://localhost:8080/${borrowBook.coverImageUrl}`}
                                alt={borrowBook.title}
                                className="borrow-book-cover"
                            />
                        </div>

                        <div className="borrow-book-details">

                            <span className="borrow-book-category">
                                {borrowBook.categoryName}
                            </span>

                            <h2>{borrowBook.title}</h2>

                            <p className="borrow-book-author">
                                by {borrowBook.authorName}
                            </p>

                            <p className="borrow-book-description">
                                {borrowBook.description}
                            </p>

                        </div>

                    </div>

                    <div className="borrow-divider" />

                    {/* BORROWING DETAILS */}
                    <div className="borrow-section">

                        <h3>Borrowing Details</h3>

                        <div className="borrow-detail-row">
                            <span>Subscription</span>
                            <strong>Premium</strong>
                        </div>

                        <div className="borrow-detail-row">
                            <span>Borrow Limit</span>
                            <strong>
                                {totalBorrowCount} books
                            </strong>
                        </div>

                        <div className="borrow-detail-row">
                            <span>Currently Borrowed</span>
                            <strong>
                                {usedBorrowCount} books
                            </strong>
                        </div>

                        <div className="borrow-detail-row">
                            <span>Remaining Slots</span>
                            <strong className="remaining-slots">
                                {availableBorrowCount} books
                            </strong>
                        </div>

                        <div className="borrow-detail-row">
                            <span>Borrow Duration</span>
                            <strong>30 Days</strong>
                        </div>

                    </div>

                    <div className="borrow-divider" />

                    {/* QUANTITY */}
                    <div className="borrow-section">

                        <div className="quantity-header">
                            <div>
                                <h3>Quantity</h3>
                                <p>
                                    Select how many copies you want
                                    to borrow.
                                </p>
                            </div>

                            <span className="available-copies">
                                {borrowBook.availableQuantity} Available
                            </span>
                        </div>

                        <div className="quantity-control">

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                            >
                                −
                            </button>

                            <input
                                type="number"
                                min="1"
                                max={availableBorrowCount}
                                value={quantity}
                                onChange={handleQuantityChange}
                            />

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={quantity >= availableBorrowCount}
                            >
                                +
                            </button>

                        </div>

                        <p className="quantity-hint">
                            You can borrow up to{" "}
                            <strong>{availableBorrowCount}</strong>{" "}
                            {availableBorrowCount === 1 ? "Copy" : "Copies"}.
                        </p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="borrow-summary-card">

                    <h2>Borrow Summary</h2>

                    <div className="summary-book">
                        <div className="summary-book-cover">
                            <img
                                src={`http://localhost:8080/${borrowBook.coverImageUrl}`}
                                alt={borrowBook.title}
                            />
                        </div>

                        <div>
                            <h3>{borrowBook.title}</h3>
                            <p>{borrowBook.authorName}</p>
                        </div>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-row">
                        <span>Quantity</span>
                        <strong>{quantity}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Borrow Duration</span>
                        <strong>30 Days</strong>
                    </div>

                    <div className="summary-row">
                        <span>Due Date</span>
                        <strong>{formatDateTime(borrowBook.dueDate)}</strong>
                    </div>

                    <div className="summary-row">
                        <span>Borrow Fee</span>
                        <strong>₹0</strong>
                    </div>

                    <div className="summary-divider" />

                    <div className="summary-total">
                        <span>Total</span>
                        <strong>₹0</strong>
                    </div>

                    <div className="fine-notice">
                        <span>!</span>

                        <p>
                            Please return the book before the due
                            date. Overdue books may incur a daily
                            fine according to your subscription
                            terms.
                        </p>
                    </div>

                    <button
                        className="confirm-borrow-btn"
                        onClick={handleConfirmBorrow}
                        disabled={!canBorrow}
                    >
                        {canBorrow
                            ? "Confirm Borrow"
                            : "Borrowing Unavailable"}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default BorrowBook;