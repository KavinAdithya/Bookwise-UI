import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    computePurchaseBookDetails,
    registerPurchaseBook
} from "../../apiservice/purchasebook/PurchaseBook";

import "../../css/User/PurchaseBook.css";

function PurchaseBook() {

    const { bookId } = useParams();
    const navigate = useNavigate();

    const [purchaseDetails, setPurchaseDetails] = useState(null);


    const [quantity, setQuantity] = useState("1");

    const [loading, setLoading] = useState(true);
    const [quantityLoading, setQuantityLoading] = useState(false);



    useEffect(() => {
        fetchPurchaseDetails(1, true);
    }, [bookId]);


    async function fetchPurchaseDetails(
        requestedQuantity,
        initialLoad = false
    ) {

        try {

            if (initialLoad) {
                setLoading(true);
            }

            const response =
                await computePurchaseBookDetails(
                    bookId,
                    requestedQuantity
                );

            const data = response.data.data;

            setPurchaseDetails(data);

            setQuantity(
                String(data.price.quantity)
            );

        } catch (error) {

            console.log(
                "Failed to fetch purchase details",
                error
            );

        } finally {

            if (initialLoad) {
                setLoading(false);
            }
        }
    }



    async function updateQuantity(newQuantity) {

        if (!newQuantity || newQuantity < 1) {
            return;
        }

        try {

            setQuantityLoading(true);

            const response =
                await computePurchaseBookDetails(
                    bookId,
                    newQuantity
                );

            const data = response.data.data;

            setPurchaseDetails(data);

            setQuantity(
                String(data.price.quantity)
            );

        } catch (error) {

            console.log(
                "Failed to update quantity",
                error
            );

            if (purchaseDetails) {
                setQuantity(
                    String(
                        purchaseDetails.price.quantity
                    )
                );
            }

        } finally {

            setQuantityLoading(false);
        }
    }


    function decreaseQuantity() {

        const currentQuantity =
            Number(quantity);

        if (
            currentQuantity <= 1 ||
            quantityLoading
        ) {
            return;
        }

        updateQuantity(
            currentQuantity - 1
        );
    }

    function increaseQuantity() {

        const currentQuantity =
            Number(quantity);

        if (quantityLoading) {
            return;
        }

        updateQuantity(
            currentQuantity + 1
        );
    }

    function handleQuantityChange(event) {

        const value =
            event.target.value;

        setQuantity(value);
    }



    async function handleQuantityBlur() {

        const newQuantity =
            Number(quantity);

        if (
            !quantity ||
            !newQuantity ||
            newQuantity < 1
        ) {

            setQuantity(
                String(
                    purchaseDetails.price.quantity
                )
            );

            return;
        }

        if (
            newQuantity ===
            purchaseDetails.price.quantity
        ) {
            return;
        }

        await updateQuantity(
            newQuantity
        );
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

        const data = {
            bookId: bookId,
            quantity: purchaseDetails.price.quantity,
            purchaseAmount: purchaseDetails.price.amount
        };

        try {

            const response =
                await registerPurchaseBook(data);

            alert(response.data.message);

            navigate("/my-books");

        } catch (error) {

            console.log(
                "Failed to purchase book",
                error
            );
        }
    }

    if (loading) {

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

            <button
                className="purchase-back-btn"
                onClick={() =>
                    navigate(`/books/${book.id}`)
                }
            >
                ← Back to Book
            </button>


            {/* =================================================
                HEADER
            ================================================= */}

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


            {/* =================================================
                MAIN LAYOUT
            ================================================= */}

            <div className="purchase-book-layout">


                {/* =================================================
                    LEFT CARD
                ================================================= */}

                <div className="purchase-book-card">

                    {/* =================================================
                        BOOK
                    ================================================= */}

                    <div className="purchase-book-main">

                        {/* COVER */}

                        <div className="purchase-cover-container">

                            <img
                                src={`http://localhost:8080/${book.coverImageUrl}`}
                                alt={book.title}
                                className="purchase-book-cover"
                            />

                        </div>


                        {/* BOOK INFORMATION */}

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


                    {/* =================================================
                        QUANTITY
                    ================================================= */}

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

                            {/* DECREASE */}

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={
                                    quantityLoading ||
                                    Number(quantity) <= 1
                                }
                            >
                                −
                            </button>


                            {/* INPUT */}

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={
                                    handleQuantityChange
                                }
                                onBlur={
                                    handleQuantityBlur
                                }
                                disabled={quantityLoading}
                            />


                            {/* INCREASE */}

                            <button
                                type="button"
                                onClick={increaseQuantity}
                                disabled={quantityLoading}
                            >
                                +
                            </button>

                        </div>


                        {/* PRICE UPDATE STATUS */}

                        <div className="quantity-status">
                                <p className="quantity-updating">
                                    {quantityLoading ?
                                        'Updating price...' : ''}
                                </p>

                        </div>

                    </div>


                    <div className="purchase-divider" />


                    {/* =================================================
                        BOOK INFORMATION
                    ================================================= */}

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


                {/* =================================================
                    RIGHT SUMMARY
                ================================================= */}

                <div className="purchase-summary-card">

                    <h2>
                        Order Summary
                    </h2>


                    {/* SUMMARY BOOK */}

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


                    {/* QUANTITY */}

                    <div className="purchase-summary-row">

                        <span>
                            Quantity
                        </span>

                        <strong>
                            {price.quantity}
                        </strong>

                    </div>


                    {/* PRICE PER BOOK */}

                    <div className="purchase-summary-row">

                        <span>
                            Price per Book
                        </span>

                        <strong>
                            ₹
                            {formatAmount(
                                price.singleBookAmount
                            )}
                        </strong>

                    </div>


                    <div className="purchase-summary-divider" />


                    {/* TOTAL */}

                    <div className="purchase-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹
                            {formatAmount(
                                price.amount
                            )}
                        </strong>

                    </div>


                    {/* CONFIRM */}

                    <button
                        className="confirm-purchase-btn"
                        onClick={
                            handleConfirmPurchase
                        }
                        disabled={
                            quantityLoading
                        }
                    >
                        Confirm Purchase
                    </button>


                    {/* CANCEL */}

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