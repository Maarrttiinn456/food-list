import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useLoaderData } from "react-router";
import useMealsForm from "../../hooks/useMealsForm";
import { Box, TextField, Typography, Stack, IconButton, Button, Chip, alpha } from "@mui/material";
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
            {/* ── Název a popis ── */}
            <Box
                sx={{
                    p: 3,
                    borderRadius: "16px",
                    border: "1.5px solid",
                    borderColor: "divider",
                    background: "#fff",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Stack spacing={1.5}>
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
                                    fontSize: "1.75rem",
                                    fontWeight: 800,
                                    letterSpacing: "-0.5px",
                                    color: "text.primary",
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
                        placeholder="Stručný popis nebo poznámka…"
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: { fontSize: "1rem", color: "text.secondary" },
                            },
                        }}
                    />
                </Stack>
            </Box>

            {/* ── Kategorie ── */}
            {categories && (
                <MultiSelectCheckmarks
                    categories={categories}
                    onChange={actions.handleCategoryChange}
                />
            )}

            {/* ── Přidat surovinu ── */}
            {items && <Autocomplete items={items} actions={actions} />}

            {/* ── Seznam surovin ── */}
            <Stack spacing={1}>
                {state.itemsList.length === 0 ? (
                    <Box
                        sx={{
                            py: 3,
                            textAlign: "center",
                            borderRadius: "12px",
                            border: "1.5px dashed",
                            borderColor: "divider",
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Zatím žádné suroviny — přidej je výše
                        </Typography>
                    </Box>
                ) : (
                    state.itemsList.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                px: 2.5,
                                py: 1.5,
                                borderRadius: "12px",
                                border: "1.5px solid",
                                borderColor: "divider",
                                background: "#fff",
                            }}
                        >
                            <Typography sx={{ fontWeight: 600, flex: 1 }}>{item.name}</Typography>

                            <Box display="flex" alignItems="center" gap={1}>
                                <TextField
                                    variant="outlined"
                                    size="small"
                                    placeholder="množství"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        actions.handleQuantityChange(item.id, e.target.value)
                                    }
                                    sx={{
                                        width: 110,
                                        "& .MuiOutlinedInput-root": { borderRadius: "8px" },
                                    }}
                                />

                                <IconButton
                                    aria-label="odstranit surovinu"
                                    size="small"
                                    onClick={() => actions.handleDeleteItem(item.id)}
                                    sx={{
                                        color: "error.main",
                                        borderRadius: "8px",
                                        "&:hover": {
                                            background: (theme) =>
                                                alpha(theme.palette.error.main, 0.1),
                                        },
                                    }}
                                >
                                    <DeleteOutlineIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    ))
                )}
            </Stack>

            {/* ── Sumarizační řádek ── */}
            {state.itemsList.length > 0 && (
                <Box display="flex" gap={1} flexWrap="wrap">
                    <Chip
                        label={`${state.itemsList.length} surovin`}
                        size="small"
                        variant="outlined"
                        color="primary"
                        sx={{ borderRadius: "8px", fontWeight: 600 }}
                    />
                </Box>
            )}

            {/* ── Submit ── */}
            <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                disabled={state.isSubmitting}
                onClick={() => actions.handleSubmit()}
                sx={{
                    py: 1.5,
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "1rem",
                    boxShadow: (theme) => `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                    "&:hover": {
                        boxShadow: (theme) =>
                            `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                    },
                }}
            >
                {state.isSubmitting ? "Ukládám…" : "Uložit jídlo"}
            </Button>
        </Stack>
    );
};

export default MealsForm;
