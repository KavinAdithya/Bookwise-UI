import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getSubscriptionUpgradeDetails,
    upgradeSubscription
} from "../../apiservice/subscriptions/Subscription";

import { formatPrice } from "../../Utils/Formats";

import "../../css/User/SubscriptionUpgrade.css";

function SubscriptionUpgrade() {

    const { subscriptionId } = useParams();
    const navigate = useNavigate();

    const [upgradeDetails, setUpgradeDetails] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [upgrading, setUpgrading] =
        useState(false);


    // =========================================================
    // FETCH UPGRADE DETAILS
    // =========================================================

    useEffect(() => {

        fetchUpgradeDetails();

    }, [subscriptionId]);


    async function fetchUpgradeDetails() {

        try {

            setLoading(true);

            const response =
                await getSubscriptionUpgradeDetails(
                    subscriptionId
                );

            setUpgradeDetails(
                response.data.data
            );

        } catch (error) {

            console.log(
                "Failed to fetch subscription upgrade details",
                error
            );

        } finally {

            setLoading(false);
        }
    }



    // =========================================================
    // FORMAT PLAN TYPE
    // =========================================================

    function formatPlanType(planType) {

        if (!planType) {
            return "";
        }

        return planType
            .toLowerCase()
            .replace(/\b\w/g, letter =>
                letter.toUpperCase()
            );
    }


    // =========================================================
    // CONFIRM UPGRADE
    // =========================================================

    async function handleConfirmUpgrade() {

        if (!upgradeDetails || upgrading) {
            return;
        }

        const currentPlan =
            upgradeDetails.currentPlan;

        const newPlan =
            upgradeDetails.newPlan;

        debugger;
        const requestData = {
            currentPlan:
                currentPlan.planType,

            newPlan:
                newPlan.planType,

            amountPaid:
                newPlan.price
        };


        try {

            setUpgrading(true);

            const response =
                await upgradeSubscription(
                    requestData
                );

            alert(
                response.data.message
            );

            navigate("/subscription");

        } catch (error) {

            console.log(
                "Failed to upgrade subscription",
                error
            );

        } finally {

            setUpgrading(false);
        }
    }


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (
            <div className="subscription-upgrade-loading">
                Loading upgrade details...
            </div>
        );
    }


    // =========================================================
    // NO DATA
    // =========================================================

    if (!upgradeDetails) {

        return (
            <div className="subscription-upgrade-loading">
                Upgrade details not found.
            </div>
        );
    }

    function findBookDifference(currentPlan, newPlan) {
        return newPlan.borrowLimit != 'Unlimited' && currentPlan.borrowLimit != 'Unlimited'
            ? newPlan.borrowLimit - currentPlan.borrowLimit
            : newPlan.borrowLimit === 'Unlimited'
                ? 'Unlimited'
                : -currentPlan.borrowLimit;
    }


    const currentPlan =
        upgradeDetails.currentPlan;

    const newPlan =
        upgradeDetails.newPlan;


    // =========================================================
    // UI
    // =========================================================

    return (

        <div className="subscription-upgrade-page">


            {/* =================================================
                BACK
            ================================================= */}

            <button
                className="subscription-upgrade-back-btn"
                onClick={() =>
                    navigate("/subscription")
                }
                disabled={upgrading}
            >
                ← Back to Subscription
            </button>


            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="subscription-upgrade-header">

                <span>
                    SUBSCRIPTION / UPGRADE
                </span>

                <h1>
                    Upgrade Your Plan
                </h1>

                <p>
                    Review your new subscription before
                    confirming the upgrade.
                </p>

            </div>


            {/* =================================================
                MAIN LAYOUT
            ================================================= */}

            <div className="subscription-upgrade-layout">


                {/* =================================================
                    LEFT - PLAN COMPARISON
                ================================================= */}

                <div className="subscription-comparison-card">

                    <div className="subscription-card-heading">

                        <h2>
                            Plan Comparison
                        </h2>

                        <p>
                            See what changes with your
                            new subscription.
                        </p>

                    </div>


                    {/* CURRENT PLAN */}

                    <div className="upgrade-plan current-upgrade-plan">

                        <span className="upgrade-plan-label">
                            CURRENT PLAN
                        </span>

                        <div className="upgrade-plan-header">

                            <h3>
                                {formatPlanType(
                                    currentPlan.planType
                                )}
                            </h3>

                            <strong>
                                ₹{formatPrice(
                                    currentPlan.price
                                )}
                            </strong>

                        </div>


                        <div className="upgrade-plan-details">

                            <div className="upgrade-plan-detail">

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


                            <div className="upgrade-plan-detail">

                                <span>
                                    Duration
                                </span>

                                <strong>
                                    {currentPlan.durationAllowed} days
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* ARROW */}

                    <div className="upgrade-plan-arrow">
                        ↓
                    </div>


                    {/* NEW PLAN */}

                    <div className="upgrade-plan new-upgrade-plan">

                        <span className="upgrade-plan-label">
                            NEW PLAN
                        </span>

                        <div className="upgrade-plan-header">

                            <h3>
                                {formatPlanType(
                                    newPlan.planType
                                )}
                            </h3>

                            <strong>
                                ₹{formatPrice(
                                    newPlan.price
                                )}
                            </strong>

                        </div>


                        <div className="upgrade-plan-details">

                            <div className="upgrade-plan-detail">

                                <span>
                                    Borrow Limit
                                </span>

                                <strong>
                                    {newPlan.borrowLimit}{" "}
                                    {newPlan.borrowLimit === 1
                                        ? "book"
                                        : "books"}
                                </strong>

                            </div>


                            <div className="upgrade-plan-detail">

                                <span>
                                    Duration
                                </span>

                                <strong>
                                    {newPlan.durationAllowed} days
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        BENEFIT DIFFERENCE
                    ================================================= */}

                    <div className="upgrade-difference">

                        <span>
                            Plan Change
                        </span>

                        <strong>
                            {findBookDifference(
                                currentPlan,
                                newPlan
                            )
                            }{" "}
                            borrowing{" "}
                            {Math.abs(
                                newPlan.borrowLimit -
                                currentPlan.borrowLimit
                            ) === 1
                                ? "slot"
                                : "slots"}
                        </strong>

                    </div>

                </div>


                {/* =================================================
                    RIGHT - ORDER SUMMARY
                ================================================= */}

                <div className="subscription-upgrade-summary">

                    <h2>
                        Upgrade Summary
                    </h2>


                    {/* CURRENT PLAN */}

                    <div className="upgrade-summary-row">

                        <span>
                            Current Plan
                        </span>

                        <strong>
                            {formatPlanType(
                                currentPlan.planType
                            )}
                        </strong>

                    </div>


                    {/* NEW PLAN */}

                    <div className="upgrade-summary-row">

                        <span>
                            New Plan
                        </span>

                        <strong>
                            {formatPlanType(
                                newPlan.planType
                            )}
                        </strong>

                    </div>


                    <div className="upgrade-summary-divider" />


                    {/* PRICE */}

                    <div className="upgrade-summary-row">

                        <span>
                            Subscription Price
                        </span>

                        <strong>
                            ₹{formatPrice(
                                newPlan.price
                            )}
                        </strong>

                    </div>


                    <div className="upgrade-summary-divider" />


                    {/* TOTAL */}

                    <div className="upgrade-summary-total">

                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹{formatPrice(
                                newPlan.price
                            )}
                        </strong>

                    </div>


                    {/* CONFIRM */}

                    <button
                        className="confirm-upgrade-btn"
                        onClick={
                            handleConfirmUpgrade
                        }
                        disabled={upgrading}
                    >

                        {upgrading
                            ? "Processing..."
                            : "Confirm Upgrade"
                        }

                    </button>


                    {/* CANCEL */}

                    <button
                        className="cancel-upgrade-btn"
                        onClick={() =>
                            navigate("/subscription")
                        }
                        disabled={upgrading}
                    >
                        Cancel
                    </button>


                    <p className="upgrade-note">
                        Review your plan details carefully
                        before confirming the upgrade.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default SubscriptionUpgrade;