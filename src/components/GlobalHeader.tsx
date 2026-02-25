import { Link } from "react-router";
import { AppBar, Toolbar, Typography, Box, IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
    const { user, logOut } = useAuth();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ justifyContent: "space-between", px: 2, minHeight: 56 }}>
                <Box
                    component={Link}
                    to="/"
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{ textDecoration: "none" }}
                >
                    <RestaurantMenuIcon sx={{ color: "primary.main", fontSize: 26 }} />
                    <Typography
                        variant="h6"
                        fontWeight={800}
                        letterSpacing="-0.5px"
                        color="text.primary"
                    >
                        Food
                        <Box component="span" color="primary.main">
                            List
                        </Box>
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        Vítej,{" "}
                        <Box component="span" fontWeight={700} color="text.primary">
                            {user?.name.split(" ")[0] ?? ""}
                        </Box>
                    </Typography>

                    <Tooltip title="Odhlásit se">
                        <IconButton
                            size="small"
                            onClick={logOut}
                            sx={{ color: "text.primary", "&:hover": { color: "error.main" } }}
                        >
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
