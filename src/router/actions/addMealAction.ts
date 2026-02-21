import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";
import { userContextMiddleware } from "../context/authContext";
import type { ActionResponse } from "./addItemAction";
import type { MealItem } from "../../types";
import type { Category } from "../../types";

export const addMealAction = async ({
    request,
    context,
}: ActionFunctionArgs): Promise<ActionResponse> => {
    //Contrext
    const user = context.get(userContextMiddleware);

    if (!user) {
        return { ok: false, message: "Nejste přihlášen." };
    }

    const data = await request.formData();
    const mealName = data.get("name") as string;
    const mealDescription = data.get("description") as string | null;
    const itemsRaw = data.get("items") as string;
    const categoriesRaw = data.get("categories") as string;

    if (!mealName) {
        return { ok: false, message: "Název jídla je povinný." };
    }

    if (!itemsRaw || itemsRaw === "[]") {
        return { ok: false, message: "Suroviny jsou povinné." };
    }

    const items = JSON.parse(itemsRaw);
    const categories = JSON.parse(categoriesRaw);

    const { data: mealData, error: mealError } = await supabase
        .from("meals")
        .insert([{ name: mealName, description: mealDescription, user_id: user.id }])
        .select()
        .single();

    if (mealError) {
        console.error("Supabase error:", mealError);
        return { ok: false, message: "Nepodařilo se uložit jídlo." };
    }

    const { error: itemsError } = await supabase
        .from("meal_items")
        .insert(
            items.map((item: MealItem) => ({
                meal_id: mealData.id,
                item_id: item.id,
                quantity: item.quantity,
            }))
        )
        .select();

    if (itemsError) {
        console.error("Supabase error:", itemsError);
        return { ok: false, message: "Nepodařilo se uložit suroviny." };
    }

    const { error: categoriesError } = await supabase
        .from("meal_categories")
        .insert(
            categories.map((category: Category) => ({
                meal_id: mealData.id,
                category_id: category.id,
            }))
        )
        .select();

    if (categoriesError) {
        console.error("Supabase error:", categoriesError);
        return { ok: false, message: "Nepodařilo se uložit kategorie." };
    }

    return { ok: true, message: "Jídlo bylo úspěšně přidáno." };
};
