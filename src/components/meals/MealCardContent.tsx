import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Divider,
    Stack,
    Typography,
    alpha,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { MelasWithItemsLoader } from "../../router/loaders/mealsLoader";

type MealsCardContentProps = {
    meal: MelasWithItemsLoader["mealsWithItems"][number];
};

const MealsCardContent = ({ meal }: MealsCardContentProps) => {
    if (meal.meal_items.length === 0) return null;

    return (
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
                                textTransform="capitalize"
                                color="text.primary"
                            >
                                {mItem.items?.name}
                            </Typography>

                            <Typography variant="body2" color="primary.main" fontWeight={700}>
                                {mItem.quantity ?? "—"}
                            </Typography>
                        </Box>
                    ))}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};

export default MealsCardContent;
