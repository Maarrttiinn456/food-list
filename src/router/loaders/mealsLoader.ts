import type { LoaderFunctionArgs } from "react-router";
import { userContextMiddleware } from "../context/authContext";
import { supabase } from "../../supabase/client";

export const mealsLoader = async ({ context }: LoaderFunctionArgs) => {
    const user = context.get(userContextMiddleware);

    const { data, error } = await supabase
        .from("meals")
        .select(
            `
        *,
        meal_items (
            quantity,
            items (
            id,
                name
            )
        ),
        meal_categories (
            categories (
            id,
                name
            )
        )
    `
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        throw new Response("Chyba při načítání jídel", { status: 500 });
    }

    return { mealsWithItems: data || [] };
};

export type MelasWithItemsLoader = Awaited<ReturnType<typeof mealsLoader>>;
