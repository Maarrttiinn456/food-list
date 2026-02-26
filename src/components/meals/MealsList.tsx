import { useLoaderData, useSearchParams } from "react-router";
import { Box, Typography, Stack } from "@mui/material";
import type { MealsAndCategoriesLoaderData } from "../../router/loaders/mealsAndCategoriesLoader";
import MealCard from "./MealCard";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import MealsFilter from "./MealsFilter";

const MealsList = () => {
    const loaderData = useLoaderData<MealsAndCategoriesLoaderData>();
    const mealsWithItems = loaderData?.mealsWithItems ?? [];
    const [searchParams] = useSearchParams();
    const selectedCategoryIds = new Set(
        searchParams.get("categories")?.split(",").filter(Boolean).map(Number) ?? []
    );

    const filteredMeals =
        selectedCategoryIds.size === 0
            ? mealsWithItems
            : mealsWithItems.filter((meal) =>
                  meal.meal_categories?.some(
                      (mc) => mc.categories && selectedCategoryIds.has(mc.categories.id)
                  )
              );

    if (mealsWithItems.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    py: 10,
                    color: "text.secondary",
                }}
            >
                <RestaurantMenuOutlinedIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                <Typography variant="body2" sx={{ opacity: 0.65, fontWeight: 500 }}>
                    Zatím jsi nepřidal žádná jídla.
                </Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={2}>
            <MealsFilter />
            {filteredMeals.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                    Žádná jídla v zvolených kategoriích.
                </Typography>
            ) : (
                filteredMeals.map((meal) => <MealCard key={meal.id} meal={meal} />)
            )}
        </Stack>
    );
};

export default MealsList;
