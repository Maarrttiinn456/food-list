import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Není k dispozici context z authContextu");
    }

    return context;
};
