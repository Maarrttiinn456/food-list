import { useLoaderData } from "react-router";
import { Box, Typography, Stack } from "@mui/material";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";
import MealCard from "./MealCard";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";

const MealsList = () => {
    const { mealsWithItems } = useLoaderData<MelasWithItemsLoader>();

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
            {mealsWithItems.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
            ))}
        </Stack>
    );
};

export default MealsList;
