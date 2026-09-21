import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookDetail } from "../../apiservice/books/Book";
import "../../css/User/UserBookDetail.css";

function UserBookDetail() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    useEffect(() => {

        async function fetchBook() {

            try {

                const response = await fetchBookDetail(bookId);

                setBook(response.data.data);

            } catch (error) {

                console.error(
                    "Error fetching book details:",
                    error
                );

            }
        }

        fetchBook();

    }, [bookId]);


    function handleBorrow() {
        console.log("Borrow book:", book.id);

        // Borrow API will be called here
    }


    function handleBuy() {
        console.log("Buy book:", book.id);

        // Purchase API will be called here
    }


    if (!book) {
        return (
            <div className="user-book-detail-loading">
                Loading book details...
            </div>
        );
    }


    return (

        <div className="user-book-detail-page">


            {/* =========================
                Back
            ========================= */}

            <button
                className="user-book-back-btn"
                onClick={() => navigate("/books")}
            >
                ← Back to Books
            </button>


            {/* =========================
                Main Book Card
            ========================= */}

            <div className="user-book-detail-card">


                {/* =========================
                    Book Main Section
                ========================= */}

                <div className="user-book-main">


                    {/* Cover */}

                    <div className="user-book-detail-cover">

                        <img
                            src={`http://localhost:8080/${book.coverImageUrl}`}
                            alt={book.title}
                        />

                    </div>


                    {/* Book Information */}

                    <div className="user-book-main-info">

                        <span className="user-book-detail-category">
                            {book.categoryName}
                        </span>


                        <h1>
                            {book.title}
                        </h1>


                        <p className="user-book-detail-author">
                            By {book.authorName}
                        </p>


                        <div className="user-book-divider"></div>


                        {/* Description */}

                        <div className="user-book-description">

                            <h3>
                                About this book
                            </h3>

                            <p>
                                {book.description}
                            </p>

                        </div>


                        {/* Availability */}

                        <div className="user-book-availability">

                            <span>
                                Available Copies
                            </span>

                            <strong>
                                {book.availableCopies}
                                {" "}
                                / {book.totalCopies}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Purchase / Borrow
                ========================= */}

                <div className="user-book-options">


                    {/* Borrow */}

                    <div className="user-book-option">

                        <div>

                            <span className="user-book-option-label">
                                Borrow this book
                            </span>

                            <p>
                                Borrow the book according to
                                your subscription plan.
                            </p>

                        </div>


                        <div className="user-book-option-right">

                            <strong>
                                ₹{book.borrowFee}
                            </strong>

                            <button
                                className="user-borrow-btn"
                                onClick={handleBorrow}
                                disabled={book.availableCopies === 0}
                            >
                                {book.availableCopies === 0
                                    ? "Unavailable"
                                    : "Borrow"
                                }
                            </button>

                        </div>

                    </div>


                    {/* Buy */}

                    <div className="user-book-option">

                        <div>

                            <span className="user-book-option-label">
                                Buy this book
                            </span>

                            <p>
                                Purchase this book and keep
                                it in your collection.
                            </p>

                        </div>


                        <div className="user-book-option-right">

                            <strong>
                                ₹{book.purchasePrice}
                            </strong>

                            <button
                                className="user-buy-btn"
                                onClick={handleBuy}
                            >
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>


                {/* =========================
                    Additional Information
                ========================= */}

                <div className="user-book-meta">

                    <div>

                        <span>ISBN</span>

                        <strong>
                            {book.ISBN}
                        </strong>

                    </div>


                    <div>

                        <span>Category</span>

                        <strong>
                            {book.categoryName}
                        </strong>

                    </div>


                    <div>

                        <span>Total Copies</span>

                        <strong>
                            {book.totalCopies}
                        </strong>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default UserBookDetail;