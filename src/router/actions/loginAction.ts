import { supabase } from "../../supabase/client";
import type { AuthFormInputs } from "../../types";
import { redirect, type ActionFunctionArgs } from "react-router";

export async function loginAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const password = String(formData.get("password") || "");
    const email = String(formData.get("email") || "");

    const errors: Partial<Record<keyof AuthFormInputs | "serverError", string>> = {};

    if (!password) {
        errors.password = "Vyplňte prosím heslo";
    }

    if (!email) {
        errors.email = "Vyplňte prosím email";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        errors.serverError = error.message;
        return errors;
    }

    //console.log("Data:", data);
    //console.log("Error", error);

    if (data.session) {
        return redirect(`/`);
    }
}
