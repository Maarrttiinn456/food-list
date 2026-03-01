import { useState, useEffect } from "react";
import { useFetcher, useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import type { Item, MealItem, Category, MealWithRelations } from "../types";

const useMealsForm = (initialData?: MealWithRelations) => {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    //Jednotlivé polžky ze kterých se skládá jídlo
    //Pokud dostanu initial data pak vypisu co v nich dostanu
    //Pokud ne tak bud to co mam  v locale storage nebo prazdny array
    const [itemsList, setItemsList] = useState<MealItem[]>(() => {
        if (initialData) {
            return initialData.meal_items.map((mi) => ({
                ...mi.items,
                quantity: mi.quantity,
            }));
        }
        const storageData = localStorage.getItem("itemsList");
        return JSON.parse(storageData ?? "[]");
    });

    const [mealName, setMealName] = useState(initialData?.name ?? "");
    const [mealDescription, setMealDescription] = useState(initialData?.description ?? "");

    //Pokud dostanu initial data pak vypisu co v nich dostanu
    //Pokud ne tak bud to co mam  v locale storage nebo prazdny array
    const [categories, setCategories] = useState<Category[]>(() => {
        if (initialData) {
            return initialData.meal_categories.map((mc) => mc.categories);
        }
        return [];
    });

    const handleAddItem = (item: Item | null) => {
        if (!item) return;
        const newItem: MealItem = {
            ...item,
            quantity: "",
        };

        const isAlreadyAdded = itemsList.some((i) => i.id === item.id);
        if (isAlreadyAdded) return;

        setItemsList((prev) => [...prev, newItem]);
        if (!initialData) {
            localStorage.setItem("itemsList", JSON.stringify([...itemsList, newItem]));
        }
    };

    const handleDeleteItem = (id: string) => {
        const filteredItems = itemsList.filter((item) => item.id !== id);
        setItemsList(filteredItems);
        if (!initialData) {
            localStorage.setItem("itemsList", JSON.stringify(filteredItems));
        }
    };

    const handleQuantityChange = (id: string, quantity: string) => {
        const updatedItems = itemsList.map((item) =>
            item.id === id ? { ...item, quantity } : item
        );
        setItemsList(updatedItems);
        if (!initialData) {
            localStorage.setItem("itemsList", JSON.stringify(updatedItems));
        }
    };

    const handleCategoryChange = (category: Category[]) => {
        setCategories(category);
    };

    const handleSubmit = () => {
        if (!mealName?.trim()) {
            enqueueSnackbar("Vyplň název", { variant: "error" });
            return;
        }
        if (itemsList.length === 0) {
            enqueueSnackbar("Přidej suroviny", { variant: "error" });
            return;
        }

        const payload: Record<string, string> = {
            name: mealName,
            description: mealDescription,
            items: JSON.stringify(itemsList.map((i) => ({ id: i.id, quantity: i.quantity }))),
            categories: JSON.stringify(categories.map((c) => c.id)),
        };

        if (initialData?.id) {
            payload.id = initialData.id;
        }

        fetcher.submit(payload, { method: initialData ? "put" : "post" });
    };

    useEffect(() => {
        const actionData = fetcher.data;

        if (!actionData) return;

        if (actionData?.ok) {
            if (!initialData) {
                localStorage.setItem("itemsList", JSON.stringify([]));
            }
            enqueueSnackbar(actionData.message, { variant: "success" });
            navigate("/meals");
        } else {
            enqueueSnackbar(actionData.message, { variant: "error" });
        }
    }, [fetcher.data, enqueueSnackbar, navigate, initialData]);

    return {
        state: {
            itemsList,
            mealName,
            mealDescription,
            categories,
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
