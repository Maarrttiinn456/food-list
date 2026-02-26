import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";
import { userContextMiddleware } from "../context/authContext";
import type { ActionResponse } from "../../types";

export const addMealAction = async ({
    request,
    context,
}: ActionFunctionArgs): Promise<ActionResponse> => {
    const user = context.get(userContextMiddleware);

    if (!user) {
        return { ok: false, message: "Nejste přihlášen." };
    }

    const data = await request.formData();
    const mealName = data.get("name") as string;
    const mealDescription = data.get("description") as string | null;
    const itemsRaw = data.get("items") as string;
    const categoriesRaw = data.get("categories") as string;
    const mealId = data.get("id") as string | null;
    const isEdit = request.method === "PUT" && mealId;

    if (!mealName) {
        return { ok: false, message: "Název jídla je povinný." };
    }

    if (!itemsRaw || itemsRaw === "[]") {
        return { ok: false, message: "Suroviny jsou povinné." };
    }

    const items = JSON.parse(itemsRaw) as { id: string; quantity: string }[];
    const categories = JSON.parse(categoriesRaw || "[]") as (string | number)[];

    if (isEdit) {
        const { error: updateError } = await supabase
            .from("meals")
            .update({ name: mealName, description: mealDescription || null })
            .eq("id", mealId)
            .eq("user_id", user.id);

        if (updateError) {
            console.error("Supabase error:", updateError);
            return { ok: false, message: "Nepodařilo se aktualizovat jídlo." };
        }

        await supabase.from("meal_items").delete().eq("meal_id", mealId);
        await supabase.from("meal_categories").delete().eq("meal_id", mealId);

        const { error: itemsError } = await supabase.from("meal_items").insert(
            items.map((item) => ({
                meal_id: mealId,
                item_id: item.id,
                quantity: item.quantity,
            }))
        );

        if (itemsError) {
            console.error("Supabase error:", itemsError);
            return { ok: false, message: "Nepodařilo se uložit suroviny." };
        }

        if (categories.length > 0) {
            const { error: categoriesError } = await supabase.from("meal_categories").insert(
                categories.map((categoryId) => ({
                    meal_id: mealId,
                    category_id: Number(categoryId),
                }))
            );

            if (categoriesError) {
                console.error("Supabase error:", categoriesError);
                return { ok: false, message: "Nepodařilo se uložit kategorie." };
            }
        }

        return { ok: true, message: "Jídlo bylo úspěšně upraveno." };
    }

    const { data: mealData, error: mealError } = await supabase
        .from("meals")
        .insert([{ name: mealName, description: mealDescription, user_id: user.id }])
        .select()
        .single();

    if (mealError) {
        console.error("Supabase error:", mealError);
        return { ok: false, message: "Nepodařilo se uložit jídlo." };
    }

    const { error: itemsError } = await supabase.from("meal_items").insert(
        items.map((item) => ({
            meal_id: mealData.id,
            item_id: item.id,
            quantity: item.quantity,
        }))
    );

    if (itemsError) {
        console.error("Supabase error:", itemsError);
        return { ok: false, message: "Nepodařilo se uložit suroviny." };
    }

    if (categories.length > 0) {
        const { error: categoriesError } = await supabase.from("meal_categories").insert(
            categories.map((categoryId) => ({
                meal_id: mealData.id,
                category_id: Number(categoryId),
            }))
        );

        if (categoriesError) {
            console.error("Supabase error:", categoriesError);
            return { ok: false, message: "Nepodařilo se uložit kategorie." };
        }
    }

    return { ok: true, message: "Jídlo bylo úspěšně přidáno." };
};
