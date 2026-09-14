import { useState, useEffect } from "react";
import "../../css/Author/AuthorBookDetail.css";
import { fetchBook } from "../../apiservice/books/Book";
import { useParams, useNavigate } from "react-router-dom";

function AuthorBookDetail() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);

    useEffect(() => {

        async function loadBook() {

            try {

                const response = await fetchBook(bookId);

                console.log(response.data.data);

                setBook(response.data.data);

            } catch (error) {

                console.error("Failed to fetch book:", error);

            }

        }

        loadBook();

    }, [bookId]);


    if (!book) {
        return <div>Loading...</div>;
    }


    function handleBack() {
        navigate("/author/books");
    }


    function handleEdit(id) {
        navigate(`/author/books/${id}/edit`);
    }


    function handleDeactivate(id) {
        console.log("Deactivate book:", id);
    }


    return (
        <div className="author-book-detail-page">

            <button
                className="back-btn"
                onClick={handleBack}
            >
                ← Back to My Books
            </button>


            <div className="book-detail-card">

                {/* Header */}

                <div className="book-detail-header">

                    <div className="book-cover1">

                        <img
                            src={`http://localhost:8080/${book.coverImageUrl}`}
                            alt={book.title}
                        />

                    </div>


                    <div className="book-main-info">

                        <h1>{book.title}</h1>

                        <p className="book-category">
                            {book.categoryName}
                        </p>

                        <span
                            className={`book-status ${book.bookStatus.toLowerCase()}`}
                        >
                            {book.bookStatus}
                        </span>

                    </div>

                </div>


                {/* Description */}

                <div className="book-section">

                    <h2>Description</h2>

                    <p className="book-description">
                        {book.description}
                    </p>

                </div>


                {/* Book Information */}

                <div className="book-section">

                    <h2>Book Information</h2>

                    <div className="book-info-grid">

                        <div className="book-info-item">
                            <label>ISBN</label>
                            <p>{book.ISBN}</p>
                        </div>


                        <div className="book-info-item">
                            <label>Language</label>
                            <p>{book.language}</p>
                        </div>


                        {book.publishDate && (
                            <div className="book-info-item">
                                <label>Publish Date</label>

                                <p>
                                    {new Date(book.publishDate)
                                        .toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                </p>
                            </div>
                        )}


                        <div className="book-info-item">
                            <label>Total Copies</label>
                            <p>{book.totalCopies}</p>
                        </div>


                        <div className="book-info-item">
                            <label>Available Copies</label>
                            <p>{book.availableCopies}</p>
                        </div>


                        <div className="book-info-item">
                            <label>Purchase Price</label>
                            <p>₹{book.purchasePrice}</p>
                        </div>


                        <div className="book-info-item">
                            <label>Borrow Fee</label>
                            <p>₹{book.borrowFee}</p>
                        </div>

                    </div>

                </div>


                {/* Actions */}

                <div className="book-detail-actions">

                    <button
                        className="edit-book-btn"
                        onClick={() => handleEdit(book.id)}
                    >
                        Edit Book
                    </button>


                    {book.bookStatus === "PUBLISHED" && (
                        <button
                            className="deactivate-book-btn"
                            onClick={() => handleDeactivate(book.id)}
                        >
                            Deactivate
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default AuthorBookDetail;