import {
    Card,
    Box,
    Typography,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Stack,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuAction from "./MealMenuAction";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";
import { useState } from "react";

type MealCardProps = {
    meal: MelasWithItemsLoader["mealsWithItems"][number];
};

const MealCard = ({ meal }: MealCardProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const mealId = meal.id;

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Card
                key={meal.id}
                elevation={0}
                sx={{
                    borderRadius: "16px",
                    border: "1.5px solid",
                    borderColor: "divider",
                    background: "#fff",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flex={1} mr={1}>
                            <Typography variant="h6" fontWeight={700}>
                                {meal.name}
                            </Typography>

                            {meal.description && (
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    {meal.description}
                                </Typography>
                            )}
                        </Box>

                        <IconButton
                            size="small"
                            aria-label="možnosti jídla"
                            onClick={handleOpenMenu}
                        >
                            <MoreVertIcon />
                        </IconButton>
                    </Box>
                </Box>

                {meal.meal_items.length > 0 && (
                    <Accordion elevation={0} disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon fontSize="small" />}
                            sx={{
                                pl: 3,
                                pr: 4,
                                minHeight: 44,
                            }}
                        >
                            <Typography variant="body2" fontWeight={700} color="primary">
                                Suroviny
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails sx={{ pl: 3, pr: 5, pb: 2.5, pt: 0 }}>
                            <Divider sx={{ mb: 1.5, borderStyle: "dashed" }} />
                            <Stack spacing={0.75}>
                                {meal.meal_items.map((mItem) => (
                                    <Box
                                        key={mItem.items?.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            color="secondary"
                                        >
                                            {mItem.items?.name}
                                        </Typography>

                                        {mItem.quantity ? (
                                            <Typography
                                                variant="body2"
                                                color="secondary"
                                                fontWeight={700}
                                            >
                                                {mItem.quantity}
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                color="secondary"
                                                fontWeight={700}
                                            >
                                                --
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                )}
            </Card>

            <MenuAction anchorEl={anchorEl} setAnchorEl={setAnchorEl} mealId={mealId} />
        </>
    );
};

export default MealCard;
