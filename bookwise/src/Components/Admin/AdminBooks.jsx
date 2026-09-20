import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/General/DataTable/DataTable";
import "../../css/Admin/AdminBooks.css";
import { fetchAllBooksByStatusForAdmin } from "../../apiservice/books/Book";

function AdminBooks() {

    const [books, setBooks] = useState([]);
    const [status, setStatus] = useState("ALL");

    const navigate = useNavigate();

    async function fetchBooks(bookStatus) {
        try {
            const response = await fetchAllBooksByStatusForAdmin(bookStatus);
            setBooks(response.data.data);
            setStatus(bookStatus);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    }

    useEffect(() => {
        fetchBooks("ALL");
    }, []);

    function handleView(book) {
        navigate(`/admin/books/${book.id}`);
    }

    const bookColumns = [
        {
            key: "coverImageUrl",
            label: "Cover",
            render: (book) => (
                <div className="admin-book-cover-cell">
                    <img
                        src={`http://localhost:8080/${book.coverImageUrl}`}
                        alt={book.title}
                    />
                </div>
            )
        },

        {
            key: "title",
            label: "Title"
        },

        {
            key: "authorName",
            label: "Author"
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
                    className={`admin-book-status ${book.status.toLowerCase()}`}
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
                    className="admin-view-book-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleView(book);
                    }}
                >
                    {book.status === "PENDING" ? "Review" : "View"}
                </button>
            )
        }
    ];

    return (
        <div className="admin-books-page">

            {/* Page Header */}

            <div className="admin-books-header">

                <div>
                    <span className="admin-books-label">
                        ADMIN / BOOKS
                    </span>

                    <h1>All Books</h1>

                    <p>
                        View and manage all books submitted to BookWise
                    </p>
                </div>

            </div>


            {/* Search + Filters */}

            <div className="admin-books-toolbar">

                <input
                    type="text"
                    placeholder="Search books..."
                />

                <div className="admin-book-filters">

                    <button
                        className={status === "ALL" ? "active" : ""}
                        onClick={() => fetchBooks("ALL")}
                    >
                        All
                    </button>

                    <button
                        className={status === "PENDING" ? "active" : ""}
                        onClick={() => fetchBooks("PENDING")}
                    >
                        Pending
                    </button>

                    <button
                        className={status === "PUBLISHED" ? "active" : ""}
                        onClick={() => fetchBooks("PUBLISHED")}
                    >
                        Published
                    </button>

                    <button
                        className={status === "REJECTED" ? "active" : ""}
                        onClick={() => fetchBooks("REJECTED")}
                    >
                        Rejected
                    </button>

                </div>

            </div>


            {/* Books Table */}

            <DataTable
                columns={bookColumns}
                data={books}
                onRowClick={handleView}
                columnWidths="0.7fr 1.6fr 1.3fr 1.2fr 0.8fr 1fr 0.9fr"
            />

        </div>
    );
}

export default AdminBooks;