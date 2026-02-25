import type { Tables } from "./supabase";

/* Auth */
export type AuthFormInputs = {
    fullname: string;
    password: string;
    email: string;
};

/* Meals */
export type Item = Tables<"items">;

export type MealItem = Item & {
    quantity: string;
};

export type Meal = Tables<"meals">;
export type Category = Tables<"categories">;

/* Relations */
export type MealWithRelations = Meal & {
    meal_items: {
        quantity: string;
        items: Item;
    }[];
    meal_categories: {
        categories: Category;
    }[];
};

/**/
export type ActionResponse = {
    ok: boolean;
    message: string;
};
