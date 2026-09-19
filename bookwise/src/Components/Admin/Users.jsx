import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/General/DataTable/DataTable";
import "../../css/Admin/Users.css";
import { getAllUsers } from "../../apiservice/users/userservice";

function Users() {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    async function fetchUsers(filter) {
        try {
            const response = await getAllUsers(filter);
            setUsers(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {
        fetchUsers(2);
    }, []);

    function handleView(user) {
        navigate(`/admin/users/${user.id}`);
    }

    const userColumns = [
        {
            key: "name",
            label: "Name"
        },
        {
            key: "username",
            label: "Username"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "role",
            label: "Role",
            render: (user) => (
                <span className={`user-role ${user.role.toLowerCase()}`}>
                    {user.role}
                </span>
            )
        },
        {
            key: "action",
            label: "Action",
            render: (user) => (
                <button
                    className="view-user-btn"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleView(user);
                    }}
                >
                    View
                </button>
            )
        }
    ];

    return (
        <div className="admin-users-page">

            {/* Page Header */}
            <div className="users-page-header">
                <div>
                    <h1>Users</h1>
                    <p>View and manage registered users</p>
                </div>
            </div>

            {/* Search + Filters */}
            <div className="users-toolbar">

                <input
                    type="text"
                    placeholder="Search users..."
                />

                <div className="user-filters">

                    <button className="active" onClick={() => fetchUsers(2)}>
                        All
                    </button>

                    <button onClick={() => fetchUsers(1)}>
                        Active
                    </button>

                    <button onClick={() => fetchUsers(0)}>
                        Inactive
                    </button>

                </div>

            </div>

            <DataTable
                columns={userColumns}
                data={users}
                onRowClick={handleView}
                columnWidths="1.2fr 1.2fr 1.8fr 1fr 0.8fr"
            />

        </div>
    );
}

export default Users;