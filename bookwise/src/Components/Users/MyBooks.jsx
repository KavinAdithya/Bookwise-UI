import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DataTable from "../General/DataTable/DataTable";

import {fetchMyBorrowedBooks} from "../../apiservice/borrowbook/borrowbook.js";
import '../../css/User/MyBooks.css'


function MyBooks() {

    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("BORROWED");

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [purchasedBooks, setPurchasedBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    async function fetchBooks() {

        try {

            const [
                borrowedResponse
            ] = await Promise.all([
                fetchMyBorrowedBooks()
            ]);

            setBorrowedBooks(
                borrowedResponse.data.data
            );

            // setPurchasedBooks(
            //     purchasedResponse.data.data
            // );

        } catch (error) {

            console.log("Failed to fetch my books");

        } finally {

            setLoading(false);

        }
    }

    function formatDate(dateTime) {

        if (!dateTime) {
            return "-";
        }

        return new Date(dateTime).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }

    function getBorrowStatus(book) {

        if (book.returnedAt) {
            return "RETURNED";
        }

        if (new Date(book.dueDate) < new Date()) {
            return "OVERDUE";
        }

        return "BORROWED";
    }

    function getDaysRemaining(dueDate) {

        if (!dueDate) {
            return null;
        }

        const difference =
            new Date(dueDate).getTime() -
            new Date().getTime();

        return Math.ceil(
            difference / (1000 * 60 * 60 * 24)
        );
    }

    function handleViewBook(book) {
        navigate(`/books/${book.bookId}`);
    }

    function handleReturn(book) {
        console.log("Return:", book);

        navigate(`/borrow-books/${book.borrowBookId}/return/details`)
    }

    function handlePayFine(book) {
        console.log("Pay fine:", book);

        // payment API
    }


    /*
     * ============================
     * BORROWED BOOK COLUMNS
     * ============================
     */

    const borrowedBookColumns = [

        {
            key: "coverImageUrl",
            label: "Cover",
            render: (book) => (
                <div className="my-books-cover-cell">
                    <img
                        src={`http://localhost:8080/${book.coverImageUrl}`}
                        alt={book.title}
                        className="my-books-cover"
                    />
                </div>
            )
        },

        {
            key: "title",
            label: "Book",
            render: (book) => (
                <div className="my-books-title-cell">

                    <span className="my-books-title">
                        {book.bookTitle}
                    </span>

                    <span className="my-books-author">
                        {book.authorName}
                    </span>

                </div>
            )
        },

        {
            key: "quantity",
            label: "Quantity",
            render: (book) => (
                <span>
                    {book.borrowedQuantity}
                </span>
            )
        },

        {
            key: "borrowedAt",
            label: "Borrowed On",
            render: (book) => (
                <span>
                    {formatDate(book.borrowedDate)}
                </span>
            )
        },

        {
            key: "dueDate",
            label: "Due Date",
            render: (book) => (
                <span>
                    {formatDate(book.dueDate)}
                </span>
            )
        },

        {
            key: "status",
            label: "Status",
            render: (book) => {

                const status =
                    getBorrowStatus(book);

                return (
                    <div className="borrow-status-cell">

                        <span
                            className={`my-borrow-status ${status.toLowerCase()}`}
                        >
                            {status}
                        </span>

                        {status === "BORROWED" && (
                            <span className="days-remaining">
                                {getDaysRemaining(book.dueDate)} days
                            </span>
                        )}

                        {status === "OVERDUE" && (
                            <span className="overdue-fine">
                                Fine ₹{book.fineAmount || 0}
                            </span>
                        )}

                    </div>
                );
            }
        },

        {
            key: "action",
            label: "Action",
            render: (book) => {

                const status =
                    getBorrowStatus(book);

                return (
                    <div className="my-books-actions">

                        <button
                            className="my-view-btn"
                            onClick={(event) => {
                                event.stopPropagation();
                                handleViewBook(book);
                            }}
                        >
                            View
                        </button>

                        {status !== "RETURNED" && (
                            <button
                                className="my-return-btn"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleReturn(book);
                                }}
                            >
                                Return
                            </button>
                        )}

                        {status === "OVERDUE" &&
                            book.fineAmount > 0 && (

                                <button
                                    className="my-fine-btn"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handlePayFine(book);
                                    }}
                                >
                                    Pay Fine
                                </button>
                            )}

                    </div>
                );
            }
        }
    ];


    /*
     * ============================
     * PURCHASED BOOK COLUMNS
     * ============================
     */

    // const purchasedBookColumns = [

    //     {
    //         key: "coverImageUrl",
    //         label: "Cover",
    //         render: (book) => (
    //             <div className="my-books-cover-cell">

    //                 <img
    //                     src={`http://localhost:8080/${book.coverImageUrl}`}
    //                     alt={book.title}
    //                     className="my-books-cover"
    //                 />

    //             </div>
    //         )
    //     },

    //     {
    //         key: "title",
    //         label: "Book",
    //         render: (book) => (
    //             <div className="my-books-title-cell">

    //                 <span className="my-books-title">
    //                     {book.title}
    //                 </span>

    //                 <span className="my-books-author">
    //                     {book.authorName}
    //                 </span>

    //             </div>
    //         )
    //     },

    //     {
    //         key: "categoryName",
    //         label: "Category"
    //     },

    //     {
    //         key: "purchasePrice",
    //         label: "Price",
    //         render: (book) => (
    //             <span>
    //                 ₹{book.purchasePrice}
    //             </span>
    //         )
    //     },

    //     {
    //         key: "purchasedAt",
    //         label: "Purchased On",
    //         render: (book) => (
    //             <span>
    //                 {formatDate(book.purchasedAt)}
    //             </span>
    //         )
    //     },

    //     {
    //         key: "action",
    //         label: "Action",
    //         render: (book) => (
    //             <button
    //                 className="my-view-btn"
    //                 onClick={(event) => {
    //                     event.stopPropagation();
    //                     handleViewBook(book);
    //                 }}
    //             >
    //                 View
    //             </button>
    //         )
    //     }

    // ];


    if (loading) {
        return (
            <div className="my-books-loading">
                Loading your books...
            </div>
        );
    }


    return (
        <div className="my-books-page">

            {/* HEADER */}

            <div className="my-books-header">

                <span className="my-books-label">
                    MY LIBRARY
                </span>

                <h1>My Books</h1>

                <p>
                    Manage your borrowed and purchased books.
                </p>

            </div>


            {/* TABS */}

            <div className="my-books-tabs">

                <button
                    className={
                        activeTab === "BORROWED"
                            ? "my-books-tab active"
                            : "my-books-tab"
                    }
                    onClick={() => setActiveTab("BORROWED")}
                >
                    Borrowed Books

                    <span className="tab-count">
                        {borrowedBooks.length}
                    </span>
                </button>


                <button
                    className={
                        activeTab === "PURCHASED"
                            ? "my-books-tab active"
                            : "my-books-tab"
                    }
                    onClick={() => setActiveTab("PURCHASED")}
                >
                    Purchased Books

                    <span className="tab-count">
                        {purchasedBooks.length}
                    </span>
                </button>

            </div>


            {/* BORROWED */}

            {activeTab === "BORROWED" && (

                <section className="my-books-section">

                    <div className="section-heading">

                        <h2>Borrowed Books</h2>

                        <p>
                            Books currently borrowed from BookWise.
                        </p>

                    </div>


                    {borrowedBooks.length === 0 ? (

                        <div className="my-books-empty">
                            No borrowed books found.
                        </div>

                    ) : (

                        <DataTable
                            columns={borrowedBookColumns}
                            data={borrowedBooks}
                            onRowClick={handleViewBook}
                            columnWidths="0.7fr 1.8fr 0.8fr 1.2fr 1.2fr 1.2fr 1.5fr"
                        />

                    )}

                </section>

            )}


            {/* PURCHASED */}

            {/* {activeTab === "PURCHASED" && (

                <section className="my-books-section">

                    <div className="section-heading">

                        <h2>Purchased Books</h2>

                        <p>
                            Books you have purchased from BookWise.
                        </p>

                    </div>


                    {purchasedBooks.length === 0 ? (

                        <div className="my-books-empty">
                            No purchased books found.
                        </div>

                    ) : (

                        <DataTable
                            columns={purchasedBookColumns}
                            data={purchasedBooks}
                            onRowClick={handleViewBook}
                            columnWidths="0.7fr 2fr 1.2fr 1fr 1.3fr 1fr"
                        />

                    )}

                </section>

            )} */}

        </div>
    );
}

export default MyBooks;