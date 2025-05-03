import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';  // Changed import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ?
        JSON.parse(localStorage.getItem('authTokens')) :
        null
    );
    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens') ?
        jwtDecode(localStorage.getItem('authTokens')) :  // Changed function name
        null
    );
    const [isAdmin, setIsAdmin] = useState(false);

    const loginUser = async (tokens) => {
        setAuthTokens(tokens);
        setUser(jwtDecode(tokens.token));  // Changed function name
        localStorage.setItem('authTokens', JSON.stringify(tokens));

        // Check if user is admin (in a real app, this would come from the backend)
        if (jwtDecode(tokens.token).username === 'admin') {  // Changed function name
            setIsAdmin(true);
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('authTokens');
    };

    useEffect(() => {
        if (authTokens) {
            const decoded = jwtDecode(authTokens.token);  // Changed function name
            if (decoded.exp * 1000 < Date.now()) {
                logoutUser();
            }
        }
    }, [authTokens]);

    return (
        <AuthContext.Provider value={{
            authTokens,
            user,
            isAdmin,
            loginUser,
            logoutUser,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;