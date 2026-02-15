import type { ActionFunctionArgs } from "react-router";
import { supabase } from "../../supabase/client";
import { userContext } from "../context/authContext";

export type ActionResponse = {
    ok: boolean;
    message: string;
};

export async function addItemAction({
    request,
    context,
}: ActionFunctionArgs): Promise<ActionResponse> {
    //Contrext
    const user = context.get(userContext);

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

    //Connect database and push
    const { error: supabaseError } = await supabase
        .from("items")
        .insert([{ name: item.trim(), user_id: user.id }])
        .select()
        .single();

    //Error from supabase
    if (supabaseError) {
        console.error("Supabase error:", supabaseError);

        if (supabaseError.code === "23505")
            return { ok: false, message: "Tato položka už v katalogu existuje." };
        return { ok: false, message: "Nepodařilo se uložit položku." };
    }

    return { ok: true, message: "Položka byla úspěšně přidána." };
}
