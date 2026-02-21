import { createContext } from "react-router";
import type { User } from "@supabase/supabase-js";

export const userContextMiddleware = createContext<User | null>(null);
