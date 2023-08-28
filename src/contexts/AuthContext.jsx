import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return { ...state, user: action.payload, isAuthenticated: true }

        case 'logout':
            return { ...state, user: null, isAuthenticated: false }

        default: throw new Error('unknown action')
    }
}


function AuthProvider({ children }) {

    const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, {});


    function login(email, password) { }


    function logout() { }


    return <AuthContext.Provider value={{ user, login, isAuthenticated, logout }}>{children}</AuthContext.Provider>
}


function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) throw new Error('Failed to support the auth context');

}