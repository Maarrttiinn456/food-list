import { Box, Avatar, Typography, Stack, IconButton, alpha } from "@mui/material";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import { useState } from "react";
import MenuAction from "./MealMenuAction";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type MealCardHeaderProps = {
    meal: MelasWithItemsLoader["mealsWithItems"][number];
};

const MealCardHeader = ({ meal }: MealCardHeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
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
                        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 0.75 }}>
                            {meal.meal_categories?.map(
                                (mc) =>
                                    mc.categories && (
                                        <Box
                                            key={mc.categories.id}
                                            component="span"
                                            sx={{
                                                px: 1.25,
                                                py: 0.25,
                                                borderRadius: "8px",
                                                fontSize: "0.7rem",
                                                fontWeight: 600,
                                                lineHeight: 1.4,
                                                letterSpacing: "0.04em",
                                                color: "primary.main",
                                                background: (theme) =>
                                                    alpha(theme.palette.primary.main, 0.1),
                                            }}
                                        >
                                            {mc.categories.name}
                                        </Box>
                                    )
                            )}
                            {meal.description && (
                                <Box
                                    component="a"
                                    href={meal.description}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        px: 1.25,
                                        py: 0.25,
                                        borderRadius: "8px",
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        lineHeight: 1.4,
                                        textDecoration: "none",
                                        color: "info.main",
                                        background: (theme) => alpha(theme.palette.info.main, 0.12),
                                        "&:hover": {
                                            background: (theme) =>
                                                alpha(theme.palette.info.main, 0.2),
                                            color: "info.dark",
                                        },
                                    }}
                                >
                                    <LinkOutlinedIcon sx={{ fontSize: 14 }} />
                                    Odkaz na recept
                                </Box>
                            )}
                        </Stack>
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
            <MenuAction anchorEl={anchorEl} setAnchorEl={setAnchorEl} mealId={meal.id} />
        </>
    );
};

export default MealCardHeader;
