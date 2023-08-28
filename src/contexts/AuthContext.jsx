import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
}


function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, {});


    function login(email, password) { }


    function logout() { }


    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}


function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('Failed to support the auth context');

}