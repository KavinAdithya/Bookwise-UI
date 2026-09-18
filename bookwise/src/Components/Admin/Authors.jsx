import { getAllAuthors, getAuthorByStatus } from '../../apiservice/authors/AuthorService';
import { useEffect, useState } from 'react';
import '../../css/Admin/Authors.css';
import { useNavigate } from 'react-router-dom';
import DataTable from '../General/DataTable/DataTable'

function Authors() {

    const [authors, setAuthors] = useState([]);
    const [status, setStatus] = useState("ALL");

    const navigate = useNavigate();

    function handleView(author) {
        navigate(`/admin/authors/review/${author.id}`);
    }

    async function fetchAuthors() {
        try {
            const response = await getAllAuthors();
            setAuthors(response.data.data);
            setStatus("ALL");
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    }

    useEffect(() => {
        fetchAuthors();
    }, []);

    async function filterByStatus(status) {
        try {
            const response = await getAuthorByStatus(status);
            setAuthors(response.data.data);
            setStatus(status);
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    }

    const authorColumns = [
        {
            key: "authorName",
            label: "Author"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "createdAt",
            label: "Submitted On",
            render: (author) => (
                <span>
                    {author.createdAt.split("T")[0]}
                </span>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (author) => (
                <span className={`status ${author.status.toLowerCase()}`}>
                    {author.status}
                </span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: (author) => (
                author.status === "PENDING" ? (
                    <button
                        className="review-btn"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleView(author);
                        }}
                    >
                        Review
                    </button>
                ) : (
                    <button
                        className="view-btn"
                        onClick={(event) => {
                            event.stopPropagation();
                            handleView(author);
                        }}
                    >
                        View
                    </button>
                )
            )
        }
    ];

    return (
        <div className="author-requests">

            <div className="page-header">
                <h1>Author Requests</h1>
                <p>Review and manage author registration requests</p>
            </div>

            <div className="request-toolbar">

                <input
                    type="text"
                    placeholder="Search authors..."
                />

                <div className="status-filters">

                    <button
                        className={status === "ALL" ? "active" : ""}
                        onClick={fetchAuthors}
                    >
                        All
                    </button>

                    <button
                        className={status === "PENDING" ? "active" : ""}
                        onClick={() => filterByStatus("PENDING")}
                    >
                        Pending
                    </button>

                    <button
                        className={status === "APPROVED" ? "active" : ""}
                        onClick={() => filterByStatus("APPROVED")}
                    >
                        Approved
                    </button>

                </div>

            </div>

            <DataTable
                columns={authorColumns}
                data={authors}
                onRowClick={handleView}
                columnWidths="1.5fr 3fr 2fr 2fr 0.8fr"
            />

        </div>
    );
}

export default Authors;