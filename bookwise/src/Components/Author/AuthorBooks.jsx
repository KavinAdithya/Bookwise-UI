import { useEffect, useState } from "react";
import { fetchAllAuthorBooks } from "../../apiservice/books/Book";
import '../../css/Author/AuthorBooks.css'
import { useNavigate } from "react-router-dom";

function AuthorBooks() {
    const [books, setBooks] = useState([])
    const navigate = useNavigate()

    async function fetchAuthorAllBooks() {
        try {
            const response = await fetchAllAuthorBooks();
            setBooks(response.data.data)
        }  catch (error) { 
            console.error("Error fetching author books:", error);
        }   
    }

    useEffect(() => {fetchAuthorAllBooks()}, [])

    function handleViewBook(bookId) {
        navigate(`/author/book/${bookId}`)
    }

    // if (!books)
    //     return <div>Loading...</div>
    

    return (
        <div className="author-books-page">

            {/* Header */}
            <div className="books-page-header">
                <div>
                    <h1>My Books</h1>
                    <p>Manage your books and track their status</p>
                </div>

                <button
                    className="add-book-btn"
                    onClick={() => navigate("/author/books/register") }
                >
                    + Add Book
                </button>
            </div>


            {/* Search + Filters */}
            <div className="books-toolbar">

                <input
                    type="text"
                    placeholder="Search books..."
                />

                <div className="book-status-filters">

                    <button
                    >
                        All
                    </button>

                    <button
                    >
                        Pending
                    </button>

                    <button
                    >
                        Published
                    </button>

                    <button
                        // className={status === "REJECTED" ? "active" : ""}
                        // onClick={() => setStatus("REJECTED")}
                    >
                        Rejected
                    </button>

                </div>

            </div>


            {/* Books Table */}
            <div className="books-table">

                {/* Table Header */}
                <div className="book-row book-table-header">

                    <div>Cover</div>
                    <div>Title</div>
                    <div>Category</div>
                    <div>Copies</div>
                    <div>Status</div>
                    <div>Action</div>

                </div>


                {/* Book Rows */}
                {books.map((book) => (

                    <div
                        className="book-row"
                        key={book.id}
                    >

                        {/* Cover */}
                        <div className="book-cover-cell">
                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                            />
                        </div>


                        {/* Title */}
                        <div className="book-title">
                            {book.title}
                        </div>


                        {/* Category */}
                        <div>
                            {book.categoryName}
                        </div>


                        {/* Copies */}
                        <div>
                            {book.totalCopies}/{book.availableCopies}
                        </div>


                        {/* Status */}
                        <div>
                            <span
                                className={`book-status ${book.status.toLowerCase()}`}
                            >
                                {book.status}
                            </span>
                        </div>


                        {/* Action */}
                        <div>
                            <button
                                className="view-book-btn"
                                onClick={() => handleViewBook(book.id)}
                            >
                                View
                            </button>
                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AuthorBooks;