import type { LoaderFunctionArgs } from "react-router";
import { mealsLoader } from "./mealsLoader";
import { categoriesLoader } from "./catagoriesLoader";

export const mealsAndCategoriesLoader = async (args: LoaderFunctionArgs) => {
    const { mealsWithItems } = await mealsLoader(args);
    const categories = await categoriesLoader();
    return { mealsWithItems, categories };
};

export type MealsAndCategoriesLoaderData = Awaited<
    ReturnType<typeof mealsAndCategoriesLoader>
>;
