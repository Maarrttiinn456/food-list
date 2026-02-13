import { createContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../supabase/client";

import router from "../routes";

type User = {
    id: string;
    name: string;
    email: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    logOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) return;

            const user: User = {
                id: session?.user.id,
                name: session.user.user_metadata.full_name,
                email: session.user.user_metadata.email,
            };

            setUser(user);

            setIsLoading(false);
        };

        initAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session) {
                setUser(null);
                setIsLoading(false);
                console.log("Uživatel odhlášen");
                return;
            }

            const user: User = {
                id: session?.user.id,
                name: session.user.user_metadata.full_name,
                email: session.user.user_metadata.email,
            };

            console.log("_event:", _event);
            console.log("seasson:", session);

            setUser(user);
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const logOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Chyba při odhlašování:", error.message);
        } else {
            router.navigate("/auth");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, logOut }}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
