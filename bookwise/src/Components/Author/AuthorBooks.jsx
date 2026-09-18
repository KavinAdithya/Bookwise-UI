import { useEffect, useState } from "react";
import { fetchAllAuthorBooks } from "../../apiservice/books/Book";
import "../../css/Author/AuthorBooks.css";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/General/DataTable/DataTable";

function AuthorBooks() {

    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    async function fetchAuthorAllBooks() {
        try {
            const response = await fetchAllAuthorBooks();
            setBooks(response.data.data);
        } catch (error) {
            console.error("Error fetching author books:", error);
        }
    }

    useEffect(() => {
        fetchAuthorAllBooks();
    }, []);

    function handleViewBook(bookId) {
        navigate(`/author/book/${bookId}`);
    }

    const bookColumns = [
        {
            key: "coverImageUrl",
            label: "Cover",
            render: (book) => (
                <div className="book-cover-cell">
                    <img
                        src={`http://localhost:8080/${book.coverImageUrl}`}
                        alt={book.title}
                    />
                </div>
            )
        },
        {
            key: "title",
            label: "Title",
            render: (book) => (
                <div className="book-title">
                    {book.title}
                </div>
            )
        },
        {
            key: "categoryName",
            label: "Category"
        },
        {
            key: "copies",
            label: "Copies",
            render: (book) => (
                <span>
                    {book.availableCopies}/{book.totalCopies}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (book) => (
                <span
                    className={`book-status ${book.status.toLowerCase()}`}
                >
                    {book.status}
                </span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: (book) => (
                <button
                    className="view-book-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleViewBook(book.id);
                    }}
                >
                    View
                </button>
            )
        }
    ];

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
                    onClick={() => navigate("/author/books/register")}
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

                    <button>
                        All
                    </button>

                    <button>
                        Pending
                    </button>

                    <button>
                        Published
                    </button>

                    <button>
                        Rejected
                    </button>

                </div>

            </div>


            {/* Reusable DataTable */}
            <DataTable
                columns={bookColumns}
                data={books}
                onRowClick={(book) => handleViewBook(book.id)}
                columnWidths="0.7fr 1.8fr 1.2fr 0.9fr 1fr 0.8fr"
            />

        </div>
    );
}

export default AuthorBooks;