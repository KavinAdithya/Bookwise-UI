import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getPurchasedBookDetails
} from "../../apiservice/purchasebook/PurchaseBook";

import "../../css/User/PurchasedBookDetail.css";

function PurchasedBookDetail() {

    const { purchaseBookId } = useParams();
    const navigate = useNavigate();

    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const [loading, setLoading] = useState(true);


    // =========================================================
    // FETCH PURCHASE DETAILS
    // =========================================================

    useEffect(() => {

        fetchPurchaseDetails();

    }, [purchaseBookId]);


    async function fetchPurchaseDetails() {

        try {

            setLoading(true);

            const response =
                await getPurchasedBookDetails(purchaseBookId);

            setPurchaseDetails(
                response.data.data
            );

        } catch (error) {

            console.log(
                "Failed to fetch purchased book details",
                error
            );

        } finally {

            setLoading(false);
        }
    }


    // =========================================================
    // FORMAT DATE
    // =========================================================

    function formatDateTime(dateTime) {

        if (!dateTime) {
            return "-";
        }

        return new Date(dateTime).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );
    }


    // =========================================================
    // FORMAT AMOUNT
    // =========================================================

    function formatAmount(amount) {

        return Number(amount).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    }


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="purchased-book-detail-loading">
                Loading purchase details...
            </div>
        );
    }


    // =========================================================
    // NOT FOUND
    // =========================================================

    if (!purchaseDetails) {

        return (
            <div className="purchased-book-detail-loading">
                Purchase details not found.
            </div>
        );
    }


    const book =
        purchaseDetails.book;


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="purchased-book-detail-page">

            {/* =================================================
                BACK
            ================================================= */}

            <button
                className="purchased-book-back-btn"
                onClick={() =>
                    navigate("/my-books")
                }
            >
                ← Back to My Books
            </button>


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="purchased-book-detail-header">

                <span>
                    MY BOOKS / PURCHASE
                </span>

                <h1>
                    Purchase Details
                </h1>

                <p>
                    View the details of your purchased book.
                </p>

            </div>


            {/* =================================================
                MAIN CARD
            ================================================= */}

            <div className="purchased-book-detail-card">


                {/* =================================================
                    BOOK SUMMARY
                ================================================= */}

                <div className="purchased-book-summary">

                    {/* COVER */}

                    <div className="purchased-book-cover-container">

                        <img
                            src={`http://localhost:8080/${book.coverImageUrl}`}
                            alt={book.title}
                            className="purchased-book-cover"
                        />

                    </div>


                    {/* BOOK INFO */}

                    <div className="purchased-book-summary-info">

                        <span className="purchased-book-category">
                            {book.categoryName}
                        </span>

                        <h2>
                            {book.title}
                        </h2>

                        <p className="purchased-book-author">
                            by {book.authorName}
                        </p>

                        <p className="purchased-book-description">
                            {book.description}
                        </p>

                    </div>

                </div>


                <div className="purchased-book-divider" />


                {/* =================================================
                    PURCHASE INFORMATION
                ================================================= */}

                <div className="purchased-book-section">

                    <h3>
                        Purchase Information
                    </h3>

                    <div className="purchased-book-info-grid">

                        {/* PURCHASE ID */}

                        <div className="purchased-book-info-item">

                            <span>
                                Purchase ID
                            </span>

                            <strong>
                                #{purchaseDetails.id}
                            </strong>

                        </div>


                        {/* QUANTITY */}

                        <div className="purchased-book-info-item">

                            <span>
                                Quantity
                            </span>

                            <strong>
                                {purchaseDetails.quantity}
                            </strong>

                        </div>


                        {/* PURCHASE DATE */}

                        <div className="purchased-book-info-item">

                            <span>
                                Purchased On
                            </span>

                            <strong>
                                {formatDateTime(
                                    purchaseDetails.purchasedDate
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="purchased-book-divider" />


                {/* =================================================
                    BOOK INFORMATION
                ================================================= */}

                <div className="purchased-book-section">

                    <h3>
                        Book Information
                    </h3>

                    <div className="purchased-book-info-grid">

                        {/* CATEGORY */}

                        <div className="purchased-book-info-item">

                            <span>
                                Category
                            </span>

                            <strong>
                                {book.categoryName}
                            </strong>

                        </div>


                        {/* AUTHOR */}

                        <div className="purchased-book-info-item">

                            <span>
                                Author
                            </span>

                            <strong>
                                {book.authorName}
                            </strong>

                        </div>


                        {/* BOOK ID */}

                        <div className="purchased-book-info-item">

                            <span>
                                Book ID
                            </span>

                            <strong>
                                #{book.id}
                            </strong>

                        </div>

                    </div>

                </div>


                <div className="purchased-book-divider" />


                {/* =================================================
                    PAYMENT
                ================================================= */}

                <div className="purchased-book-payment">

                    <div>

                        <span>
                            Total Amount Paid
                        </span>

                        <p>
                            {purchaseDetails.quantity}{" "}
                            {purchaseDetails.quantity === 1
                                ? "copy"
                                : "copies"}
                        </p>

                    </div>

                    <strong>
                        ₹{formatAmount(
                            purchaseDetails.totalPurchasedAmount
                        )}
                    </strong>

                </div>

            </div>

        </div>
    );
}

export default PurchasedBookDetail;