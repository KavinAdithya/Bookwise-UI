import { useEffect, useState } from "react";

import { getAdminRevenueSummary } from "../../apiservice/adminRevenue/AdminRevenue";

import "../../css/Admin/AdminRevenueDashboard.css";

function AdminRevenueDashboard() {

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [startDate, setStartDate] = useState("2021-10-25T14:30");
    const [endDate, setEndDate] = useState("2026-11-25T14:30");
    const [incomeType, setIncomeType] = useState("UNKNOWN");

    useEffect(() => {
        fetchRevenueSummary();
    }, []);

    async function fetchRevenueSummary() {
        try {
            setLoading(true);
            setError("");

            const response = await getAdminRevenueSummary(startDate, endDate, incomeType);

            setSummary(response.data.data);
        } catch (err) {
            console.error("Failed to fetch admin revenue summary", err);
            setError(
                err.response?.data?.message ||
                "Unable to load the revenue dashboard."
            );
        } finally {
            setLoading(false);
        }
    }

    // ---------------------------------------------------------
    // FORMAT CURRENCY
    // ---------------------------------------------------------

    function formatCurrency(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number(value ?? 0));
    }

    // ---------------------------------------------------------
    // FORMAT DATE
    // ---------------------------------------------------------

    function formatDate(dateTime) {
        if (!dateTime) return "-";

        const date = new Date(dateTime);

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    // ---------------------------------------------------------
    // FORMAT INCOME TYPE
    // ---------------------------------------------------------

    function formatIncomeType(incomeType) {
        const labels = {
            USER_SUBSCRIPTION: "User Subscriptions",
            BOOK_PURCHASE_FEE: "Book Purchases",
            BOOK_BORROW_FEE: "Book Borrowing"
        };

        return labels[incomeType] || incomeType;
    }

    // ---------------------------------------------------------
    // LOADING / ERROR STATES
    // ---------------------------------------------------------

    if (loading) {
        return (
            <div className="admin-revenue-state">
                <div className="revenue-loading-indicator" />
                <p>Loading revenue dashboard...</p>
            </div>
        );
    }

    if (error || !summary) {
        return (
            <div className="admin-revenue-state">
                <div className="revenue-error-card">
                    <h2>Revenue Dashboard Unavailable</h2>
                    <p>{error || "No revenue data is available."}</p>

                    <button
                        className="revenue-retry-btn"
                        onClick={fetchRevenueSummary}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    const incomeTypes = summary.incomeTypeBasedRevenues || [];

    // Calculate revenue share for the visual breakdown.
    // A negative or zero total is handled safely.
    const totalRevenue = Number(summary.totalRevenue) || 0;

    return (
        <div className="admin-revenue-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <header className="admin-revenue-header">

                <div>
                    <span className="admin-revenue-eyebrow">
                        ADMIN / ANALYTICS
                    </span>

                    <h1>Revenue Dashboard</h1>

                    <p>
                        Monitor BookWise revenue, author earnings,
                        and business performance.
                    </p>
                </div>

                <button
                    className="revenue-refresh-btn"
                    onClick={fetchRevenueSummary}
                >
                    ↻ Refresh Data
                </button>

            </header>


            {/* =================================================
                REPORT PERIOD
            ================================================= */}

            <div className="revenue-period-banner">

                <div className="revenue-period-icon">
                    ↗
                </div>

                <div>
                    <span>REPORTING PERIOD</span>

                    <strong>
                        {formatDate(summary.startDate)}
                        {" — "}
                        {formatDate(summary.endDate)}
                    </strong>
                </div>

            </div>


            {/* =================================================
                KPI CARDS
            ================================================= */}

            <section className="revenue-kpi-grid">

                {/* TOTAL REVENUE */}

                <article className="revenue-kpi-card">

                    <div className="revenue-kpi-top">
                        <span>Total Revenue</span>

                        <div className="revenue-kpi-icon navy-icon">
                            ₹
                        </div>
                    </div>

                    <h2>
                        {formatCurrency(summary.totalRevenue)}
                    </h2>

                    <p>
                        Revenue across all income sources
                    </p>

                </article>


                {/* PROFIT / LOSS */}

                <article className="revenue-kpi-card">

                    <div className="revenue-kpi-top">
                        <span>Profit / Loss</span>

                        <div
                            className={`revenue-kpi-icon ${
                                Number(summary.profitOrLossAmount) >= 0
                                    ? "green-icon"
                                    : "red-icon"
                            }`}
                        >
                            {Number(summary.profitOrLossAmount) >= 0
                                ? "↗"
                                : "↘"}
                        </div>
                    </div>

                    <h2
                        className={
                            Number(summary.profitOrLossAmount) >= 0
                                ? "revenue-positive"
                                : "revenue-negative"
                        }
                    >
                        {formatCurrency(summary.profitOrLossAmount)}
                    </h2>

                    <p>
                        Revenue less author revenue
                    </p>

                </article>


                {/* BOOKS SOLD */}

                <article className="revenue-kpi-card">

                    <div className="revenue-kpi-top">
                        <span>Books Sold</span>

                        <div className="revenue-kpi-icon gold-icon">
                            ▤
                        </div>
                    </div>

                    <h2>{summary.totalBooksSold ?? 0}</h2>

                    <p>
                        Total books purchased
                    </p>

                </article>


                {/* BOOKS BORROWED */}

                <article className="revenue-kpi-card">

                    <div className="revenue-kpi-top">
                        <span>Books Borrowed</span>

                        <div className="revenue-kpi-icon blue-icon">
                            ⇄
                        </div>
                    </div>

                    <h2>{summary.totalBooksBorrowed ?? 0}</h2>

                    <p>
                        Total books borrowed
                    </p>

                </article>

            </section>


            {/* =================================================
                AUTHOR REVENUE
            ================================================= */}

            <section className="author-revenue-section">

                <div className="revenue-section-heading">
                    <div>
                        <h2>Author Revenue</h2>

                        <p>
                            Track author earnings and their release status.
                        </p>
                    </div>
                </div>


                <div className="author-revenue-grid">

                    <article className="author-revenue-card">

                        <span className="author-revenue-label">
                            Total Author Revenue
                        </span>

                        <h3>
                            {formatCurrency(
                                summary.totalAuthorRevenue
                            )}
                        </h3>

                        <p>
                            Total author earnings calculated
                        </p>

                    </article>


                    <article className="author-revenue-card released-card">

                        <span className="author-revenue-label">
                            Revenue Released
                        </span>

                        <h3 className="revenue-positive">
                            {formatCurrency(
                                summary.totalAuthorRevenueReleased
                            )}
                        </h3>

                        <p>
                            Author revenue marked as released
                        </p>

                    </article>


                    <article className="author-revenue-card hold-card">

                        <span className="author-revenue-label">
                            Revenue On Hold
                        </span>

                        <h3>
                            {formatCurrency(
                                summary.totalAuthorRevenueHold
                            )}
                        </h3>

                        <p>
                            Author revenue currently held
                        </p>

                    </article>

                </div>

            </section>


            {/* =================================================
                REVENUE SOURCES
            ================================================= */}

            <section className="revenue-sources-section">

                <div className="revenue-section-heading">
                    <div>
                        <h2>Revenue Sources</h2>

                        <p>
                            Revenue contribution by income type.
                        </p>
                    </div>
                </div>


                <div className="revenue-sources-card">

                    {incomeTypes.length === 0 ? (

                        <p className="revenue-empty-message">
                            No income-source data available.
                        </p>

                    ) : (

                        incomeTypes.map((income, index) => {

                            const revenue =
                                Number(income.totalRevenue) || 0;

                            const percentage =
                                totalRevenue > 0
                                    ? Math.max(
                                        0,
                                        (revenue / totalRevenue) * 100
                                    )
                                    : 0;

                            return (

                                <div
                                    className="revenue-source-item"
                                    key={income.incomeType}
                                >

                                    <div className="revenue-source-heading">

                                        <div className="revenue-source-name">
                                            <span
                                                className={`revenue-source-dot source-${index % 3}`}
                                            />

                                            <strong>
                                                {formatIncomeType(
                                                    income.incomeType
                                                )}
                                            </strong>
                                        </div>

                                        <div className="revenue-source-amount">
                                            <strong>
                                                {formatCurrency(revenue)}
                                            </strong>

                                            <span>
                                                {percentage.toFixed(1)}%
                                            </span>
                                        </div>

                                    </div>


                                    <div className="revenue-source-track">

                                        <div
                                            className={`revenue-source-fill source-fill-${index % 3}`}
                                            style={{
                                                width: `${Math.min(percentage, 100)}%`
                                            }}
                                        />

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </section>


            {/* =================================================
                INCOME BREAKDOWN TABLE
            ================================================= */}

            <section className="income-breakdown-section">

                <div className="revenue-section-heading">
                    <div>
                        <h2>Income Breakdown</h2>

                        <p>
                            Detailed financial breakdown for each
                            revenue source.
                        </p>
                    </div>
                </div>


                <div className="income-table-wrapper">

                    <table className="income-breakdown-table">

                        <thead>
                            <tr>
                                <th>Income Type</th>
                                <th>Total Revenue</th>
                                <th>Author Revenue</th>
                                <th>Released</th>
                                <th>Not Held</th>
                                <th>Profit / Loss</th>
                            </tr>
                        </thead>


                        <tbody>

                            {incomeTypes.map((income) => (

                                <tr key={income.incomeType}>

                                    <td>
                                        <span className="income-type-name">
                                            {formatIncomeType(
                                                income.incomeType
                                            )}
                                        </span>
                                    </td>

                                    <td>
                                        {formatCurrency(
                                            income.totalRevenue
                                        )}
                                    </td>

                                    <td>
                                        {formatCurrency(
                                            income.authorRevenue
                                        )}
                                    </td>

                                    <td>
                                        {formatCurrency(
                                            income.authorRevenueReleased
                                        )}
                                    </td>

                                    <td>
                                        {formatCurrency(
                                            income.authorRevenueNotHold
                                        )}
                                    </td>

                                    <td>
                                        <span
                                            className={`income-profit-value ${
                                                Number(income.profitOrLoss) >= 0
                                                    ? "revenue-positive"
                                                    : "revenue-negative"
                                            }`}
                                        >
                                            {formatCurrency(
                                                income.profitOrLoss
                                            )}
                                        </span>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </section>


            {/* =================================================
                FOOTNOTE
            ================================================= */}

            <p className="revenue-dashboard-footnote">
                Financial values are displayed as returned by the
                revenue summary API. Author revenue release status
                and profit/loss calculations follow the backend
                calculation rules.
            </p>

        </div>
    );
}

export default AdminRevenueDashboard;