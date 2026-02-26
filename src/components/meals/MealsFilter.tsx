import { Box, Chip, Stack } from "@mui/material";
import { useLoaderData, useSearchParams } from "react-router";
import type { MealsAndCategoriesLoaderData } from "../../router/loaders/mealsAndCategoriesLoader";

const CATEGORIES_PARAM = "categories";

const MealsFilter = () => {
    const { categories } = useLoaderData<MealsAndCategoriesLoaderData>();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedIds = new Set(
        searchParams.get(CATEGORIES_PARAM)?.split(",").filter(Boolean).map(Number) ?? []
    );

    const handleToggleCategory = (categoryId: number) => {
        const next = new Set(selectedIds);
        if (next.has(categoryId)) {
            next.delete(categoryId);
        } else {
            next.add(categoryId);
        }
        const nextParams = new URLSearchParams(searchParams);
        if (next.size === 0) {
            nextParams.delete(CATEGORIES_PARAM);
        } else {
            nextParams.set(CATEGORIES_PARAM, [...next].join(","));
        }
        setSearchParams(nextParams, { replace: true });
    };

    if (categories.length === 0) return null;

    return (
        <Box>
            <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
                {categories.map((category) => {
                    const selected = selectedIds.has(category.id);
                    return (
                        <Chip
                            key={category.id}
                            label={category.name}
                            onClick={() => handleToggleCategory(category.id)}
                            variant={selected ? "filled" : "outlined"}
                            color={selected ? "primary" : "default"}
                        />
                    );
                })}
            </Stack>
        </Box>
    );
};

export default MealsFilter;
