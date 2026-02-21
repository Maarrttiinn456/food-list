import type { LoaderFunctionArgs } from "react-router";
import { userContextMiddleware } from "../context/authContext";
import { supabase } from "../../supabase/client";

export const itemsLoader = async ({ context }: LoaderFunctionArgs) => {
    const user = context.get(userContextMiddleware);

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Response("Nepodařilo se načíst data z databáze", { status: 500 });
    }

    return data ?? [];
};

export type ItemsLoaderData = Awaited<ReturnType<typeof itemsLoader>>;
