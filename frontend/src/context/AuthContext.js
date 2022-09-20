import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
        case 'LOGOUT':
            return {
                user: null
            }
        default: //if there is no changes
            return state
    }
}

//create custom component thats gonna wrap our entire app and provide a value from this context

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });
    //when the aplication loads and AuthContextProvider component renders, we are running useEffect just once to get user from localstorage
    //because if we refresh the page, react thinks we are not logged in 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user)
            dispatch({ type: 'LOGIN', payload: user });
    }, [])

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}