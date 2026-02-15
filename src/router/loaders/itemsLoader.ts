import type { LoaderFunctionArgs } from "react-router";
import { userContext } from "../context/authContext";
import { supabase } from "../../supabase/client";
import type { Item } from "../../types/items";

export const itemsLoader = async ({ context }: LoaderFunctionArgs): Promise<Item[]> => {
    const user = context.get(userContext);

    const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Response("Nepodařilo se načíst data z databáze", { status: 500 });
    }

    return data as Item[];
};
