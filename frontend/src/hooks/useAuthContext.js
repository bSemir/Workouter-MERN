import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//it consumes context using useContext hook built into react and returns it
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context)
        throw Error('useAuthContext must be used inside an useAuthContextProvider!');

    return context;
}