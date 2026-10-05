import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getSubscriptionDetails
} from "../../apiservice/subscriptions/Subscription";
import { formatDate, formatPrice } from "../../Utils/Formats";

import "../../css/User/Subscription.css";

function Subscription() {

    const navigate = useNavigate();

    const [subscriptionDetails, setSubscriptionDetails] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        fetchSubscriptionDetails();

    }, []);


    async function fetchSubscriptionDetails() {

        try {

            setLoading(true);

            const response =
                await getSubscriptionDetails();

            setSubscriptionDetails(
                response.data.data
            );

        } catch (error) {

            console.log(
                "Failed to fetch subscription details",
                error
            );

        } finally {

            setLoading(false);
        }
    }


    function handleUpgrade(plan) {

        navigate(
            `/subscription/upgrade/${plan.id}`
        );
    }


    if (loading) {

        return (
            <div className="subscription-loading">
                Loading subscription details...
            </div>
        );
    }


    if (!subscriptionDetails) {

        return (
            <div className="subscription-loading">
                Subscription details not found.
            </div>
        );
    }


    const currentPlan =
        subscriptionDetails.currentPlan;

    const availablePlans =
        subscriptionDetails.availablePlans;


    return (

        <div className="subscription-page">

            <div className="subscription-page-header">

                <span>
                    MY ACCOUNT / SUBSCRIPTION
                </span>

                <h1>
                    Subscription
                </h1>

                <p>
                    Manage your BookWise subscription
                    and borrowing benefits.
                </p>

            </div>

            <section className="current-plan-section">

                <div className="subscription-section-heading">

                    <h2>
                        Current Plan
                    </h2>

                    <p>
                        Your currently active BookWise plan.
                    </p>

                </div>


                <div className="current-plan-card">

                    {/* PLAN HEADER */}

                    <div className="current-plan-header">

                        <div>

                            <span className="current-plan-label">
                                CURRENT PLAN
                            </span>

                            <h2>
                                {currentPlan.name}
                            </h2>

                            <p className="current-plan-price">
                                ₹{formatPrice(currentPlan.price)}
                                <span>
                                    / {currentPlan.durationDays === 30
                                        ? "month"
                                        : `${currentPlan.durationDays} days`}
                                </span>
                            </p>

                        </div>


                        <span className="current-plan-badge">
                            ACTIVE
                        </span>

                    </div>


                    {/* PLAN DETAILS */}

                    <div className="current-plan-details">

                        <div className="current-plan-detail">

                            <span>
                                Borrow Limit
                            </span>

                            <strong>
                                {currentPlan.borrowLimit}{" "}
                                {currentPlan.borrowLimit === 1
                                    ? "book"
                                    : "books"}
                            </strong>

                        </div>


                        <div className="current-plan-detail">

                            <span>
                                Duration
                            </span>

                            <strong>
                                {currentPlan.durationDays} days
                            </strong>

                        </div>


                        <div className="current-plan-detail">

                            <span>
                                Started On
                            </span>

                            <strong>
                                {formatDate(
                                    currentPlan.startDate
                                )}
                            </strong>

                        </div>


                        <div className="current-plan-detail">

                            <span>
                                Expires On
                            </span>

                            <strong>
                                {formatDate(
                                    currentPlan.endDate
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                AVAILABLE PLANS
            ================================================= */}

            <section className="available-plans-section">

                <div className="subscription-section-heading">

                    <h2>
                        Available Plans
                    </h2>

                    <p>
                        Choose a plan that suits your
                        borrowing needs.
                    </p>

                </div>


                <div className="subscription-plans-grid">

                    {availablePlans.map((plan) => {

                        const isCurrentPlan =
                            plan.id === currentPlan.planId;

                        const isUpgrade =
                            plan.price > currentPlan.price;

                        return (

                            <div
                                key={plan.id}
                                className={
                                    `subscription-plan-card ${
                                        isCurrentPlan
                                            ? "current"
                                            : ""
                                    }`
                                }
                            >

                                {/* PLAN HEADER */}

                                <div className="subscription-plan-header">

                                    <span className="subscription-plan-name">
                                        {plan.name}
                                    </span>

                                    {isCurrentPlan && (
                                        <span className="subscription-plan-current">
                                            CURRENT
                                        </span>
                                    )}

                                </div>


                                {/* PRICE */}

                                <div className="subscription-plan-price">

                                    <strong>
                                        ₹{formatPrice(plan.price)}
                                    </strong>

                                    <span>
                                        / {plan.durationDays === 30
                                            ? "month"
                                            : `${plan.durationDays} days`}
                                    </span>

                                </div>


                                {/* DETAILS */}

                                <div className="subscription-plan-details">

                                    <div className="subscription-plan-detail">

                                        <span>
                                            Borrow Limit
                                        </span>

                                        <strong>
                                            {plan.borrowLimit}{" "}
                                            {plan.borrowLimit === 1
                                                ? "book"
                                                : "books"}
                                        </strong>

                                    </div>


                                    <div className="subscription-plan-detail">

                                        <span>
                                            Duration
                                        </span>

                                        <strong>
                                            {plan.durationDays} days
                                        </strong>

                                    </div>

                                </div>


                                {/* ACTION */}

                                {isCurrentPlan ? (

                                    <button
                                        className="subscription-plan-btn current-btn"
                                        disabled
                                    >
                                        Current Plan
                                    </button>

                                ) : isUpgrade ? (

                                    <button
                                        className="subscription-plan-btn upgrade-btn"
                                        onClick={() =>
                                            handleUpgrade(plan)
                                        }
                                    >
                                        Upgrade
                                    </button>

                                ) : (

                                    <button
                                        className="subscription-plan-btn unavailable-btn"
                                        disabled
                                    >
                                        Not Available
                                    </button>

                                )}

                            </div>

                        );

                    })}

                </div>

            </section>

        </div>
    );
}

export default Subscription;