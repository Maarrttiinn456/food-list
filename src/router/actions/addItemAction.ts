import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";
import { userContextMiddleware } from "../context/authContext";
import type { ActionResponse } from "../../types";

export async function addItemAction({
    request,
    context,
}: ActionFunctionArgs): Promise<ActionResponse> {
    //Contrext
    const user = context.get(userContextMiddleware);

    if (!user) {
        return { ok: false, message: "Nejste přihlášen." };
    }

    //Form input
    const form = await request.formData();
    const item = form.get("itemName");

    //Checked blank input
    if (!item || typeof item !== "string" || item.trim() === "") {
        return { ok: false, message: "Název položky nesmí být prázdný." };
    }

    const nameTrimmed = item.trim();
    const nameLower = nameTrimmed.toLowerCase();

    // Duplicita: porovnání bez ohledu na velikost písmen
    const { data: existingItems } = await supabase
        .from("items")
        .select("name")
        .eq("user_id", user.id);

    const isDuplicate = existingItems?.some((row) => row.name?.toLowerCase() === nameLower);
    if (isDuplicate) {
        return { ok: false, message: "Tato položka již v seznamu existuje." };
    }

    const { error: supabaseError } = await supabase
        .from("items")
        .insert([{ name: nameTrimmed, user_id: user.id }])
        .select()
        .single();

    if (supabaseError) {
        console.error("Supabase error:", supabaseError);
        return { ok: false, message: "Nepodařilo se uložit položku." };
    }

    return { ok: true, message: "Položka byla úspěšně přidána." };
}
