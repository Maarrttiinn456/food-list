import DeleteIcon from "@mui/icons-material/Delete";
import { useLoaderData } from "react-router";
import useMealsForm from "../../hooks/useMealsForm";
import { Box, TextField, Typography, Stack, IconButton, Paper, Button } from "@mui/material";
import MultiSelectCheckmarks from "../MultiSelectCheckmarks";
import Autocomplete from "../Autocomplete";
import type { CategoriesLoaderData } from "../../router/loaders/catagoriesLoader";
import type { ItemsLoaderData } from "../../router/loaders/itemsLoader";

const MealsForm = () => {
    const { items, categories } = useLoaderData<{
        items: ItemsLoaderData[];
        categories: CategoriesLoaderData[];
    }>();
    const { state, actions } = useMealsForm();

    return (
        <Stack spacing={3} sx={{ width: "100%" }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 5,
                    bgcolor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack spacing={2}>
                    <TextField
                        variant="standard"
                        fullWidth
                        value={state.mealName}
                        onChange={(e) => actions.setMealName(e.target.value)}
                        placeholder="Název jídla"
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: {
                                    fontSize: "1.8rem",
                                    fontWeight: "800",
                                    letterSpacing: "-0.5px",
                                },
                            },
                        }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        value={state.mealDescription}
                        onChange={(e) => actions.setMealDescription(e.target.value)}
                        multiline
                        placeholder="Popis..."
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: { fontSize: "1.1rem", opacity: 0.8 },
                            },
                        }}
                    />
                </Stack>
            </Paper>

            {categories && (
                <MultiSelectCheckmarks
                    categories={categories}
                    onChange={actions.handleCategoryChange}
                />
            )}

            {items && <Autocomplete items={items} actions={actions} />}

            <Stack spacing={1}>
                {state.itemsList.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                        Žádné suroviny
                    </Typography>
                )}
                {state.itemsList.map((item) => (
                    <Box
                        key={item.id}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={2}
                        p={2}
                        sx={{
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ fontWeight: "600" }}>{item.name}</Typography>

                        <Box display="flex" alignItems="center" gap={2} width={130}>
                            <TextField
                                variant="standard"
                                placeholder="kg/ml/ks"
                                value={item.quantity}
                                onChange={(e) =>
                                    actions.handleQuantityChange(item.id, e.target.value)
                                }
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                    },
                                }}
                            />

                            <IconButton
                                edge="end"
                                aria-label="delete"
                                color="error"
                                onClick={() => actions.handleDeleteItem(item.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Stack>

            <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                disabled={state.isSubmitting}
                onClick={() => actions.handleSubmit()}
            >
                {state.isSubmitting ? "Přidávám..." : "Přidat jídlo"}
            </Button>
        </Stack>
    );
};

export default MealsForm;
