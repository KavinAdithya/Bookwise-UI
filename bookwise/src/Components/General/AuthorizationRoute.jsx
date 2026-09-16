import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

function AuthorizationRoute({allowedRoles, children}) {
    const {user, isAuthenticated, loading} = useContext(AuthContext);

    console.log("Authorization Part")
    debugger;
    if (loading)
        return <div>Loading...</div>

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;

}

export default AuthorizationRoute;