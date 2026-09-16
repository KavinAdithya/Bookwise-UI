import { createContext, useEffect, useState } from "react";
import { getCurrentUserDetails } from "../../apiservice/users/userservice";

export const AuthContext = createContext();

function AuthProvider({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    async function fetchCurrentUser(isAuth) {

        if (!isAuthenticated && !isAuth)
            return;

        try {
            const respone = await getCurrentUserDetails();
            setUser(respone.data.data);
        } catch(error) {
            console.log("Failed to fetch current logger in user details");
            logout();
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isAuthenticated)
            fetchCurrentUser(false);
        else
            setLoading(false);
    }, [])

    const login = (data) => {
        localStorage.setItem("token", data.token);
        setUser(data.userDetail)
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setLoading(false)
        setUser({})
    }

    return(
        <AuthContext.Provider
                        value = {{
                            isAuthenticated,
                            login,
                            logout,
                            loading,
                            user
                        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;