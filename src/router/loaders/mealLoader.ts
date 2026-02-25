import type { LoaderFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";

export const loadItemLoader = async ({ params }: LoaderFunctionArgs) => {
    const { mealId } = params;
    if (!mealId) throw new Response("Chybí ID jídla", { status: 400 });

    const { data, error } = await supabase
        .from("meals")
        .select(
            `
            *,
            meal_items (
                quantity,
                items (*)
            ),
            meal_categories (
                categories (*)
            )
        `
        )
        .eq("id", mealId)
        .single();

    if (error) {
        throw new Response("Jídlo nebylo nalezeno", { status: 404 });
    }

    return { meal: data };
};
