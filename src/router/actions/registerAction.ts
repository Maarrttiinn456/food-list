import { supabase } from "../../supabase/client";
import type { AuthFormInputs } from "../../types/auth";
import { redirect, type ActionFunctionArgs } from "react-router";

export async function registerAction({ request }: ActionFunctionArgs) {
    const formData = await request.formData();

    const fullName = String(formData.get("fullname") || "");
    const password = String(formData.get("password") || "");
    const email = String(formData.get("email") || "");

    const errors: Partial<Record<keyof AuthFormInputs | "serverError", string>> = {};

    if (!fullName) {
        errors.fullname = "Jméno je povinné";
    }

    if (!password) {
        errors.password = "Heslo je povinné";
    }

    if (!email) {
        errors.email = "Email je povinný";
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    //fetch do databáze
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) {
        errors.serverError = error.message;
        return errors;
    }

    console.log("Data:", data);
    console.log("Error", error);

    return redirect(`/auth?register=success`);
}
