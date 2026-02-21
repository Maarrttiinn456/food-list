import type { LoaderFunctionArgs } from "react-router";
import { itemsLoader } from "./itemsLoader";
import { categoriesLoader } from "./catagoriesLoader";

export const itemsAndCategoriesLoader = async (args: LoaderFunctionArgs) => {
    const items = await itemsLoader(args);
    const categories = await categoriesLoader();

    return { items, categories };
};
