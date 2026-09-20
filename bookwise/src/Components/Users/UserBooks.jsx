import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllBooks } from "../../apiservice/books/Book";
import "../../css/User/UserBooks.css";

function UserBooks() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    async function fetchBooks() {
        try {
            const response = await fetchAllBooks();
            setBooks(response.data.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    useEffect(() => {
        fetchBooks();
    }, []);


    function handleViewDetails(bookId) {
        // navigate(`/books/${bookId}`);
    }


    function handleBorrow(bookId) {
        console.log("Borrow book:", bookId);

        // Borrow API will come here
    }


    function handleBuy(bookId) {
        console.log("Buy book:", bookId);

        // Buy API will come here
    }


    return (
        <div className="user-books-page">

            {/* =========================
                Page Header
            ========================= */}

            <div className="user-books-header">

                <div>

                    <span className="user-books-label">
                        BOOKWISE LIBRARY
                    </span>

                    <h1>Discover Books</h1>

                    <p>
                        Explore books available to borrow or purchase.
                    </p>

                </div>

            </div>


            {/* =========================
                Search + Filters
            ========================= */}

            <div className="user-books-toolbar">

                <div className="user-books-search">

                    <input
                        type="text"
                        placeholder="Search books by title or author..."
                    />

                </div>


                <div className="user-books-filters">

                    <select>
                        <option value="">
                            All Categories
                        </option>

                        <option value="fiction">
                            Fiction
                        </option>

                        <option value="technology">
                            Technology
                        </option>

                        <option value="finance">
                            Finance
                        </option>

                    </select>


                    <select>

                        <option value="">
                            Sort By
                        </option>

                        <option value="title">
                            Title
                        </option>

                        <option value="price-low">
                            Price: Low to High
                        </option>

                        <option value="price-high">
                            Price: High to Low
                        </option>

                    </select>

                </div>

            </div>


            {/* =========================
                Results Header
            ========================= */}

            <div className="user-books-results-header">

                <h2>Browse Books</h2>

                <span>
                    {books.length} books
                </span>

            </div>


            {/* =========================
                Book Grid
            ========================= */}

            <div className="user-books-grid">

                {books.map((book) => (

                    <div
                        className="user-book-card"
                        key={book.id}
                    >

                        {/* Cover */}

                        <div className="user-book-cover">

                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                            />

                        </div>


                        {/* Book Content */}

                        <div className="user-book-content">

                            <h3>
                                {book.title}
                            </h3>


                            <p className="user-book-author">
                                {book.authorName}
                            </p>


                            <span className="user-book-category">
                                {book.categoryName}
                            </span>


                            {/* Pricing */}

                            <div className="user-book-pricing">

                                <div className="user-book-price">

                                    <span>Buy</span>

                                    <strong>
                                        ₹{book.purchasePrice}
                                    </strong>

                                </div>


                                <div className="user-book-price">

                                    <span>Borrow</span>

                                    <strong>
                                        ₹{book.borrowFee}
                                    </strong>

                                </div>

                            </div>


                            {/* View Details */}

                            <button
                                className="user-book-details-btn"
                                onClick={() => handleViewDetails(book.id)}
                            >
                                View Details →
                            </button>


                            {/* Actions */}

                            <div className="user-book-actions">

                                <button
                                    className="borrow-book-btn"
                                    onClick={() => handleBorrow(book.id)}
                                >
                                    Borrow
                                </button>


                                <button
                                    className="buy-book-btn"
                                    onClick={() => handleBuy(book.id)}
                                >
                                    Buy
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>


            {/* =========================
                Empty State
            ========================= */}

            {books.length === 0 && (

                <div className="user-books-empty">

                    <h3>No books found</h3>

                    <p>
                        There are currently no books available.
                    </p>

                </div>

            )}

        </div>
    );
}

export default UserBooks;