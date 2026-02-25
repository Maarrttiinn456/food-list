import type { LoaderFunctionArgs } from "react-router";
import { itemsAndCategoriesLoader } from "./itemsAndCatagories";
import { loadItemLoader } from "./mealLoader";

export const updateMealLoader = async (args: LoaderFunctionArgs) => {
    const commonData = await itemsAndCategoriesLoader(args);
    const mealData = await loadItemLoader(args);

    return { ...commonData, ...mealData };
};
