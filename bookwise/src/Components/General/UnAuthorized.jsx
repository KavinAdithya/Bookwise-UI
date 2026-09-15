import { useNavigate } from "react-router-dom";
import "../../css/General/UnAuthorized.css";

function UnAuthorized() {

    const navigate = useNavigate();

    return (
        <div className="unauthorized-page">

            <div className="unauthorized-card">

                <div className="unauthorized-code">
                    403
                </div>

                <h1>Access Denied</h1>

                <p>
                    You don't have sufficient permission to access this page.
                </p>

                <button
                    className="unauthorized-home-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>

            </div>

        </div>
    );
}

export default UnAuthorized;