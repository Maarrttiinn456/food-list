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
    Avatar,
    alpha,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
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
                    borderRadius: "20px",
                    border: "none",
                    background: "#fff",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
                    <Box display="flex" alignItems="flex-start" gap={2}>
                        {/* Category Avatar */}
                        <Avatar
                            sx={{
                                width: 46,
                                height: 46,
                                borderRadius: "14px",
                                background: (theme) =>
                                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.dark, 0.08)})`,
                                flexShrink: 0,
                                mt: 0.25,
                            }}
                        >
                            <DinnerDiningIcon
                                sx={{
                                    color: "primary.main",
                                    fontSize: 22,
                                }}
                            />
                        </Avatar>

                        {/* Title & description */}
                        <Box flex={1} mr={1}>
                            <Typography variant="h6" fontWeight={700} lineHeight={1.3}>
                                {meal.name}
                            </Typography>
                            {meal.description && (
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.4, lineHeight: 1.5 }}
                                >
                                    {meal.description}
                                </Typography>
                            )}
                        </Box>

                        {/* Always-visible menu button */}
                        <IconButton
                            size="small"
                            aria-label="možnosti jídla"
                            onClick={handleOpenMenu}
                            sx={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                background: "rgba(255,255,255,0.9)",
                                backdropFilter: "blur(8px)",
                                boxShadow: "0 2px 8px rgba(15,23,42,0.12)",
                                "&:hover": {
                                    background: "rgba(255,255,255,1)",
                                    color: "primary.main",
                                },
                            }}
                        >
                            <MoreVertIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>

                {meal.meal_items.length > 0 && (
                    <Accordion elevation={0} disableGutters>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon fontSize="small" />}
                            sx={{
                                pl: 3,
                                pr: 3,
                                minHeight: 44,
                                borderTop: "1px solid",
                                borderColor: "divider",
                                "& .MuiAccordionSummary-content": {
                                    my: 1,
                                },
                            }}
                        >
                            <Typography variant="body2" fontWeight={700} color="primary">
                                Suroviny
                            </Typography>
                        </AccordionSummary>

                        <AccordionDetails
                            sx={{
                                pl: 3,
                                pr: 3,
                                pb: 2.5,
                                pt: 0,
                                background: (theme) => alpha(theme.palette.primary.main, 0.025),
                            }}
                        >
                            <Divider sx={{ mb: 1.5, borderStyle: "dashed", opacity: 0.5 }} />
                            <Stack spacing={0.75}>
                                {meal.meal_items.map((mItem) => (
                                    <Box
                                        key={mItem.items?.id}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            px: 1.5,
                                            py: 0.75,
                                            borderRadius: "10px",
                                            "&:hover": {
                                                background: "rgba(15,23,42,0.03)",
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={500}
                                            color="text.primary"
                                        >
                                            {mItem.items?.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="primary.main"
                                            fontWeight={700}
                                        >
                                            {mItem.quantity ?? "—"}
                                        </Typography>
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
