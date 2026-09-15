import { useNavigate } from "react-router-dom";
import "../../css/General/NotFound.css";

function NotFound() {

    const navigate = useNavigate();

    return (
        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-code">
                    404
                </div>

                <h1>Page Not Found</h1>

                <p>
                    The page you're looking for doesn't exist or may have
                    been moved.
                </p>

                <button
                    className="not-found-home-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>

            </div>

        </div>
    );
}

export default NotFound;