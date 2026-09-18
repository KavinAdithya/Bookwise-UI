import '../../../css/General/RoleToggle.css'

function RoleToggle({ role, setRole }) {

    return (
        <div className="role-toggle">

            <button
                type="button"
                className={role === "USER" ? "active" : ""}
                onClick={() => setRole("USER")}
            >
                User
            </button>

            <button
                type="button"
                className={role === "AUTHOR" ? "active" : ""}
                onClick={() => setRole("AUTHOR")}
            >
                Author
            </button>

        </div>
    );
}

export default RoleToggle;