import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { useLocation, useNavigate } from "react-router";
import { Paper } from "@mui/material";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const value = location.pathname;

    return (
        <Paper
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
            }}
        >
            <BottomNavigation
                sx={{ width: "100%" }}
                showLabels
                value={value}
                onChange={(_, newValue) => navigate(newValue)}
            >
                <BottomNavigationAction
                    label="Seznam"
                    value="/"
                    icon={<FormatListBulletedAddIcon />}
                />
                <BottomNavigationAction label="Jídla" value="/meals" icon={<DinnerDiningIcon />} />
                <BottomNavigationAction label="Položky" value="/items" icon={<AddIcon />} />
                <BottomNavigationAction label="Recepty" value="/recipes" icon={<MenuBookIcon />} />
            </BottomNavigation>
        </Paper>
    );
};

export default Navigation;
