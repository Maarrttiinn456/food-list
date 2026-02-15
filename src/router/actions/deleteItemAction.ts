import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";
import { userContext } from "../context/authContext";

export const deleteItemAction = async ({ request, context }: ActionFunctionArgs) => {
    const user = context.get(userContext);

    if (!user) {
        return { ok: false, message: "Nejste přihlášen." };
    }

    const form = await request.formData();
    const itemId = form.get("itemId");

    if (!itemId) {
        return { ok: false, message: "Chybí ID položky." };
    }

    const { error } = await supabase.from("items").delete().eq("id", itemId).eq("user_id", user.id);

    if (error) {
        console.error("Chyba při mazání:", error.message);
        return { ok: false, message: "Nepodařilo se smazat položku." };
    }

    return { ok: true, message: "Položka smazána." };
};
