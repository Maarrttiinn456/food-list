import { useState } from "react";
import { useLoaderData, Link } from "react-router";
import {
    Box,
    Typography,
    Card,
    Stack,
    Divider,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Menu,
    MenuItem,
    ListItemIcon,
    alpha,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";

const MealsList = () => {
    const { mealsWithItems } = useLoaderData<MelasWithItemsLoader>();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeMealId, setActiveMealId] = useState<string | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, mealId: string) => {
        setAnchorEl(event.currentTarget);
        setActiveMealId(mealId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setActiveMealId(null);
    };

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
                <Card
                    key={meal.id}
                    elevation={0}
                    sx={{
                        borderRadius: "16px",
                        border: "1.5px solid",
                        borderColor: "divider",
                        background: "#fff",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                        overflow: "hidden",
                    }}
                >
                    {/* ── Card header ── */}
                    <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Box flex={1} mr={1}>
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    letterSpacing="-0.3px"
                                    lineHeight={1.25}
                                >
                                    {meal.name}
                                </Typography>

                                {meal.description && (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 0.5, lineHeight: 1.5 }}
                                    >
                                        {meal.description}
                                    </Typography>
                                )}
                            </Box>

                            <IconButton
                                size="small"
                                onClick={(e) => handleOpenMenu(e, meal.id)}
                                aria-label="možnosti jídla"
                                sx={{
                                    borderRadius: "8px",
                                    color: "text.secondary",
                                    "&:hover": {
                                        background: (theme) => alpha(theme.palette.action.hover, 1),
                                    },
                                }}
                            >
                                <MoreVertIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* ── Accordion se surovinami ── */}
                    {meal.meal_items.length > 0 && (
                        <Accordion
                            elevation={0}
                            disableGutters
                            sx={{
                                background: "transparent",
                                "&:before": { display: "none" },
                                borderTop: "1.5px solid",
                                borderColor: "divider",
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon fontSize="small" />}
                                sx={{
                                    px: 3,
                                    minHeight: 44,
                                    "& .MuiAccordionSummary-content": { my: 0.75 },
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    fontWeight={700}
                                    color="primary.main"
                                    letterSpacing="0.06em"
                                    sx={{ textTransform: "uppercase" }}
                                >
                                    Zobrazit suroviny
                                </Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ px: 3, pb: 2.5, pt: 0 }}>
                                <Divider sx={{ mb: 1.5, borderStyle: "dashed" }} />
                                <Stack spacing={0.75}>
                                    {meal.meal_items.map((mItem) => (
                                        <Box
                                            key={mItem.items?.id}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                py: 0.75,
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                fontWeight={500}
                                                color="text.primary"
                                            >
                                                {mItem.items?.name}
                                            </Typography>

                                            {mItem.quantity && (
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    fontWeight={500}
                                                >
                                                    {mItem.quantity}
                                                </Typography>
                                            )}
                                        </Box>
                                    ))}
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    )}
                </Card>
            ))}

            {/* ── Kontextové menu (mimo iteraci) ── */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            borderRadius: "12px",
                            border: "1.5px solid",
                            borderColor: "divider",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                            minWidth: 180,
                            bgcolor: "background.paper",
                            overflow: "visible",
                        },
                    },
                }}
            >
                <MenuItem onClick={handleCloseMenu} sx={{ py: 1.25 }}>
                    <ListItemIcon>
                        <AddShoppingCartIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={500}>
                        Přidat do košíku
                    </Typography>
                </MenuItem>

                <MenuItem
                    component={Link}
                    to={activeMealId ? `/meals/edit/${activeMealId}` : "#"}
                    onClick={handleCloseMenu}
                    sx={{ py: 1.25 }}
                >
                    <ListItemIcon>
                        <EditOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={500}>
                        Upravit jídlo
                    </Typography>
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem onClick={handleCloseMenu} sx={{ py: 1.25, color: "error.main" }}>
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={500} color="error.main">
                        Smazat jídlo
                    </Typography>
                </MenuItem>
            </Menu>
        </Stack>
    );
};

export default MealsList;
