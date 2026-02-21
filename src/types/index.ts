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

export type Category = Tables<"categories">;

export type Meal = Tables<"meals">;
