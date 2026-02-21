import { Link } from "react-router";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MealsList from "../components/meals/MealsList";

const MealsPage = () => {
    return (
        <Box minHeight="100svh" position="relative">
            <Box position="fixed" right={0} bottom={100} px={2} zIndex={50}>
                <Link to="/meals/add" style={{ textDecoration: "none" }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>
            <MealsList />
        </Box>
    );
};

export default MealsPage;
