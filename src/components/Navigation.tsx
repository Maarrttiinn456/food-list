import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FormatListBulletedAddIcon from "@mui/icons-material/FormatListBulletedAdd";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { useLocation, useNavigate } from "react-router";

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const value = location.pathname;

    return (
        <Box sx={{ width: "100%", position: "fixed", bottom: 0, left: 0 }}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(_, newValue) => navigate(newValue)}
            >
                <BottomNavigationAction
                    label="Seznam"
                    value="/"
                    icon={<FormatListBulletedAddIcon />}
                />
                <BottomNavigationAction label="Jídla" value="/food" icon={<DinnerDiningIcon />} />
                <BottomNavigationAction label="Položky" value="/items" icon={<AddIcon />} />
                <BottomNavigationAction label="Recepty" value="/recipes" icon={<MenuBookIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default Navigation;
