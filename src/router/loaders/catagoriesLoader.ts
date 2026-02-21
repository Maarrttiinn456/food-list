import { supabase } from "../../supabase/client";

export const categoriesLoader = async () => {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        throw new Response("Nepodařilo se načíst data z databáze", { status: 500 });
    }

    return data ?? [];
};

export type CategoriesLoaderData = Awaited<ReturnType<typeof categoriesLoader>>;
