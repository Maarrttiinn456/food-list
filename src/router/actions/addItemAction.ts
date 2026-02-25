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
        console.log("Prázdno");

        return { ok: false, message: "Název položky nesmí být prázdný." };
    }

    //Connect database and push
    const { error: supabaseError } = await supabase
        .from("items")
        .insert([{ name: item.trim(), user_id: user.id }])
        .select()
        .single();

    if (supabaseError) {
        if (supabaseError.code === "23505") {
            console.log("Duplicita");
            return { ok: false, message: "Tato položka již v seznamu existuje." };
        }

        console.error("Supabase error:", supabaseError);
        return { ok: false, message: "Nepodařilo se uložit položku." };
    }

    return { ok: true, message: "Položka byla úspěšně přidána." };
}
