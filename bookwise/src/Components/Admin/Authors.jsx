import {getAllAuthors} from '../../apiservice/authors/AuthorService';
import { useEffect, useState } from 'react';
import '../../css/Admin/Authors.css';
import { useNavigate } from 'react-router-dom';

function Authors() {
    const [authors, setAuthors] = useState([]);
    const navigate = useNavigate();
    
    function handleView(author) {
        navigate(`/admin/authors/review/${author.id}`);
    }

    useEffect(() => {
        async function fetchAuthors() {
            try {   
                const response = await getAllAuthors();
                setAuthors(response.data.data);
            }   catch (error) { 
                console.error("Error fetching authors:", error);
            }   
        }
        fetchAuthors();
    }, []);

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
                    <button>All</button>
                    <button>Pending</button>
                    <button>Approved</button>
                </div>
            </div>

            <div className="author-table">

                <div className="table-row table-header">
                    <div>Author</div>
                    <div>Email</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>Action</div>
                </div>

                {authors.map((author) => (
                    <div className="table-row" key={author.id}>
                        <div>{author.authorName}</div>
                        <div>{author.email}</div>
                        <div>{author.createdAt.split("T")[0]}</div>

                        <div>
                            <span className={`status ${author.status.toLowerCase()}`}>
                                {author.status}
                            </span>
                        </div>

                        <div>
                            {author.status === "PENDING" ? (
                                <button
                                    className="review-btn"
                                    onClick={() => handleView(author)}
                                >
                                    Review
                                </button>
                            ) : (
                                <button
                                    className="view-btn"
                                    onClick={() => handleView(author)}
                                >
                                    View
                                </button>
                            )}
                        </div>
                    </div>
                ))}

            </div>

        </div>
            );
}

export default Authors;