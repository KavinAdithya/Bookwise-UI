import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    computePurchaseBookDetails,
    registerPurchaseBook
} from "../../apiservice/purchasebook/PurchaseBook";

import '../../css/User/PurchaseBook.css'

function PurchaseBook() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [purchaseDetails, setPurchaseDetails] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [quantityLoading, setQuantityLoading] = useState(false);

    useEffect(() => {
        fetchPurchaseDetails(1);
    }, [bookId]);


    async function fetchPurchaseDetails(quantity) {
        try {

            setLoading(true);

            const response =
                await computePurchaseBookDetails(bookId, quantity);

            setPurchaseDetails(
                response.data.data
            );

        } catch (error) {

            console.log(
                "Failed to fetch purchase details"
            );

        } finally {

            setLoading(false);
        }
    }


    async function updateQuantity(newQuantity) {

        if (newQuantity < 1) {
            return;
        }

        try {
            setQuantityLoading(true);
            fetchPurchaseDetails(newQuantity)
            setQuantity(newQuantity)
        } catch (error) {

            console.log(
                "Failed to update quantity"
            );

        } finally {

            setQuantityLoading(false);
        }
    }


    function decreaseQuantity() {

        const currentQuantity =
            purchaseDetails.price.quantity;

        if (currentQuantity <= 1) {
            return;
        }

        updateQuantity(
            currentQuantity - 1
        );
    }


    function increaseQuantity() {

        const currentQuantity =
            purchaseDetails.price.quantity;

        updateQuantity(
            currentQuantity + 1
        );
    }


    function handleQuantityChange(event) {

        const value =
            Number(event.target.value);

        if (!value || value < 1) {
            return;
        }

        updateQuantity(value);
    }


    function formatAmount(amount) {

        return Number(amount).toLocaleString(
            "en-IN",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );
    }


    async function handleConfirmPurchase() {

        console.log(
            "Confirm purchase:",
            purchaseDetails
        );

        const data = {
            "bookId" : bookId,
            "quantity" : quantity,
            "purchaseAmount" : purchaseDetails.price.amount
        }

        try {
            const response = await registerPurchaseBook(data)
            alert(response.data.message)
            navigate('/borrow-books')
        } catch(error) {
            console.log("Failed to purchase book " + error)
        }
    } 


    if (loading || quantityLoading) {

        return (
            <div className="purchase-book-loading">
                Loading purchase details...
            </div>
        );
    }


    if (!purchaseDetails) {

        return (
            <div className="purchase-book-loading">
                Purchase details not found.
            </div>
        );
    }


    const book =
        purchaseDetails.book;

    const price =
        purchaseDetails.price;


    return (
        <div className="purchase-book-page">

            {/* =========================
                BACK
            ========================= */}

            <button
                className="purchase-back-btn"
                onClick={() =>
                    navigate(`/books/${book.id}`)
                }
            >
                ← Back to Book
            </button>


            {/* =========================
                HEADER
            ========================= */}

            <div className="purchase-book-header">

                <span>
                    BOOKS / PURCHASE
                </span>

                <h1>
                    Purchase Book
                </h1>

                <p>
                    Review your order details before
                    completing the purchase.
                </p>

            </div>


            {/* =========================
                MAIN
            ========================= */}

            <div className="purchase-book-layout">

                {/* =========================
                    LEFT CARD
                ========================= */}

                <div className="purchase-book-card">

                    <div className="purchase-book-main">

                        {/* COVER */}

                        <div className="purchase-cover-container">

                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                                className="purchase-book-cover"
                            />

                        </div>


                        {/* BOOK INFO */}

                        <div className="purchase-book-info">

                            <span className="purchase-book-category">
                                {book.categoryName}
                            </span>

                            <h2>
                                {book.title}
                            </h2>

                            <p className="purchase-book-author">
                                by {book.authorName}
                            </p>

                            <p className="purchase-book-description">
                                {book.description}
                            </p>

                        </div>

                    </div>


                    <div className="purchase-divider" />


                    {/* =========================
                        QUANTITY
                    ========================= */}

                    <div className="purchase-section">

                        <div className="quantity-header">

                            <div>

                                <h3>
                                    Quantity
                                </h3>

                                <p>
                                    Select the number of copies
                                    you want to purchase.
                                </p>

                            </div>

                        </div>


                        <div className="quantity-control">

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={
                                    quantityLoading ||
                                    price.quantity <= 1
                                }
                            >
                                −
                            </button>


                            <input
                                type="number"
                                min="1"
                                value={price.quantity}
                                disabled={quantityLoading}
                                onChange={
                                    handleQuantityChange
                                }
                            />


                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={quantityLoading}
                            >
                                +
                            </button>

                        </div>


                        {quantityLoading && (

                            <p className="quantity-updating">
                                Updating price...
                            </p>

                        )}

                    </div>


                    <div className="purchase-divider" />


                    {/* =========================
                        BOOK INFORMATION
                    ========================= */}

                    <div className="purchase-section">

                        <h3>
                            Book Information
                        </h3>


                        <div className="purchase-info-grid">

                            <div className="purchase-info-item">

                                <span>
                                    Category
                                </span>

                                <strong>
                                    {book.categoryName}
                                </strong>

                            </div>


                            <div className="purchase-info-item">

                                <span>
                                    Author
                                </span>

                                <strong>
                                    {book.authorName}
                                </strong>

                            </div>


                            <div className="purchase-info-item">

                                <span>
                                    Quantity
                                </span>

                                <strong>
                                    {price.quantity}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RIGHT SUMMARY
                ========================= */}

                <div className="purchase-summary-card">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="purchase-summary-book">

                        <div className="purchase-summary-cover">

                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                            />

                        </div>


                        <div>

                            <h3>
                                {book.title}
                            </h3>

                            <p>
                                {book.authorName}
                            </p>

                        </div>

                    </div>


                    <div className="purchase-summary-divider" />


                    <div className="purchase-summary-row">

                        <span>
                            Quantity
                        </span>

                        <strong>
                            {price.quantity}
                        </strong>

                    </div>


                    <div className="purchase-summary-row">

                        <span>
                            Price per Book
                        </span>

                        <strong>
                            ₹{formatAmount(
                                price.singleBookAmount
                            )}
                        </strong>

                    </div>


                    <div className="purchase-summary-divider" />


                    <div className="purchase-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹{formatAmount(
                                price.amount
                            )}
                        </strong>

                    </div>


                    <button
                        className="confirm-purchase-btn"
                        onClick={handleConfirmPurchase}
                        disabled={quantityLoading}
                    >
                        Confirm Purchase
                    </button>


                    <button
                        className="cancel-purchase-btn"
                        onClick={() =>
                            navigate(`/books/${book.id}`)
                        }
                        disabled={quantityLoading}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PurchaseBook;