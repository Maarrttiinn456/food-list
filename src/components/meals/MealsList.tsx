import { useState } from "react";
import { useLoaderData } from "react-router";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";

const MealsList = () => {
    const { mealsWithItems } = useLoaderData<MelasWithItemsLoader>();

    console.log(mealsWithItems);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [activeMealId, setActiveMealId] = useState<string | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, mealId: string) => {
        setAnchorEl(event.currentTarget);
        setActiveMealId(mealId);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setActiveMealId(null);
        console.log(activeMealId);
    };

    if (mealsWithItems.length === 0) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography color="text.secondary" textAlign="center">
                    Zatím jsi nepřidal žádná jídla.
                </Typography>
            </Box>
        );
    }

    return (
        <Stack spacing={3}>
            {mealsWithItems.map((meal) => (
                <Card
                    key={meal.id}
                    elevation={0}
                    sx={{
                        borderRadius: 5,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <CardContent sx={{ p: 3, pb: 1 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                            <Typography variant="h5" fontWeight="700">
                                {meal.name}
                            </Typography>

                            {/* TLAČÍTKO TŘI TEČKY */}
                            <IconButton
                                onClick={(e) => handleOpenMenu(e, meal.id)}
                                aria-label="settings"
                            >
                                <MoreVertIcon />
                            </IconButton>
                        </Box>

                        {meal.description && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {meal.description}
                            </Typography>
                        )}
                    </CardContent>

                    <Accordion
                        elevation={0}
                        disableGutters
                        sx={{ bgcolor: "transparent", "&:before": { display: "none" } }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
                            <Typography variant="overline" fontWeight="700" color="primary">
                                Suroviny ({meal.meal_items.length})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                            <Divider sx={{ mb: 2, borderStyle: "dashed" }} />
                            <List disablePadding>
                                {meal.meal_items.map((mItem) => (
                                    <ListItem
                                        key={mItem.items?.id}
                                        disableGutters
                                        sx={{
                                            py: 0.5,
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <ListItemText
                                            primary={mItem.items?.name}
                                            primaryTypographyProps={{ variant: "body2" }}
                                        />
                                        <Chip
                                            label={mItem.quantity}
                                            size="small"
                                            variant="outlined"
                                            sx={{ borderRadius: 1.5 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Card>
            ))}

            {/* SAMOTNÉ MENU (plovoucí prvek) */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                        <AddShoppingCartIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    Přidat do košíku
                </MenuItem>

                <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Upravit jídlo
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleCloseMenu} sx={{ color: "error.main" }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    Smazat
                </MenuItem>
            </Menu>
        </Stack>
    );
};

export default MealsList;
