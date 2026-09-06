import { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState({})

    const login = (user) => {
        console.log("Login ")
        localStorage.setItem("token", user.token);
        setIsAuthenticated(true)
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setUser({})
    }

    return(
        <AuthContext.Provider
                        value = {{
                            isAuthenticated,
                            login,
                            logout,
                            user
                        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;