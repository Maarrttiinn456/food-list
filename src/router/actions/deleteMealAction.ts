import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";

export const deleteMealAction = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId") as string;

    if (!itemId) {
        return {
            ok: false,
            message: "Chybí ID jídla",
        };
    }

    const { error } = await supabase.from("meals").delete().eq("id", itemId);

    if (error) {
        return {
            ok: false,
            message: error.message,
        };
    }

    return {
        ok: true,
        message: "Jídlo smazáno",
    };
};
