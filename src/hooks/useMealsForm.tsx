import { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import type { Item, MealItem } from "../types";
import type { Category } from "../types";

const useMealsForm = () => {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [itemsList, setItemsList] = useState<MealItem[]>(() => {
        const storageData = localStorage.getItem("itemsList");
        return JSON.parse(storageData ?? "[]");
    });

    const [mealName, setMealName] = useState("");
    const [mealDescription, setMealDescription] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    const handleAddItem = (item: Item | null) => {
        if (!item) return;
        const newItem: MealItem = {
            ...item,
            quantity: "",
        };

        const isAlreadyAdded = itemsList.some((i) => i.id === item.id);
        if (isAlreadyAdded) return;

        setItemsList((prev) => [...prev, newItem]);
        localStorage.setItem("itemsList", JSON.stringify([...itemsList, newItem]));
    };

    const handleDeleteItem = (id: string) => {
        const filtredItems = itemsList.filter((item) => item.id !== id);
        setItemsList(filtredItems);
        localStorage.setItem("itemsList", JSON.stringify(filtredItems));
    };

    const handleQuantityChange = (id: string, quantity: string) => {
        const updatedItems = itemsList.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        setItemsList(updatedItems);
        localStorage.setItem("itemsList", JSON.stringify(updatedItems));
    };

    const handleCategoryChange = (category: Category[]) => {
        console.log("category", category);

        setCategories(category);
    };

    const handleSubmit = () => {
        const payload = {
            name: mealName,
            description: mealDescription,
            items: JSON.stringify(itemsList),
            categories: JSON.stringify(categories),
        };

        fetcher.submit(payload, { method: "post" });
    };

    useEffect(() => {
        const actionData = fetcher.data;

        if (!actionData) return;

        if (actionData?.ok) {
            localStorage.setItem("itemsList", JSON.stringify([]));
            enqueueSnackbar(actionData.message, { variant: "success" });
            navigate("/meals");
        } else {
            enqueueSnackbar(actionData.message, { variant: "error" });
        }
    }, [fetcher.data, enqueueSnackbar, navigate]);

    return {
        state: {
            itemsList,
            mealName,
            mealDescription,
            isSubmitting: fetcher.state === "submitting",
        },
        actions: {
            setMealName,
            setMealDescription,
            handleAddItem,
            handleDeleteItem,
            handleQuantityChange,
            handleCategoryChange,
            handleSubmit,
        },
    };
};

export default useMealsForm;
