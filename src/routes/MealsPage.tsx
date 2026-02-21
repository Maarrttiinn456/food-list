import { Link } from "react-router";
import { Box, Button, alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import MealsList from "../components/meals/MealsList";
import PageHeader from "../components/PageHeader";

const MealsPage = () => {
    return (
        <Box>
            <PageHeader
                title="Jídla"
                subtitle="Tvůj přehled receptů a jídel"
                icon={<RestaurantOutlinedIcon />}
            />

            <MealsList />

            {/* Fixed FAB-style button */}
            <Box
                sx={{
                    position: "fixed",
                    bottom: { xs: 90, md: 32 },
                    right: { xs: 16, md: 32 },
                    zIndex: 50,
                }}
            >
                <Button
                    component={Link}
                    to="/meals/add"
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        borderRadius: "50px",
                        px: 3,
                        py: 1.25,
                        fontWeight: 700,
                        boxShadow: (theme) =>
                            `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        "&:hover": {
                            boxShadow: (theme) =>
                                `0 8px 28px ${alpha(theme.palette.primary.main, 0.5)}`,
                        },
                    }}
                >
                    Přidat jídlo
                </Button>
            </Box>
        </Box>
    );
};

export default MealsPage;
