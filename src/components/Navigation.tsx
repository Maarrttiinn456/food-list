import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

import { useLocation, useNavigate, Link } from "react-router";
import { Box, Typography, Tooltip, IconButton, alpha } from "@mui/material";
import { useAuth } from "../hooks/useAuth";

const NAV_ITEMS = [
    { label: "Jídla", value: "/meals", icon: <DinnerDiningIcon /> },
    { label: "Položky", value: "/items", icon: <AddIcon /> },
];

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logOut } = useAuth();

    const value = location.pathname;

    return (
        <>
            {/* ── Desktop Sidebar ── */}
            <Box
                component="nav"
                sx={{
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 240,
                    background: "rgba(255,255,255,0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRight: "1px solid rgba(15,23,42,0.06)",
                    boxShadow: "4px 0 24px rgba(15,23,42,0.04)",
                    zIndex: 100,
                    py: 3,
                    px: 2,
                    gap: 0,
                }}
            >
                {/* Logo */}
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        textDecoration: "none",
                        px: 1.5,
                        mb: 4,
                    }}
                >
                    <Box
                        sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "12px",
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <RestaurantMenuIcon sx={{ color: "#fff", fontSize: 20 }} />
                    </Box>
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

                {/* Nav Items */}
                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
                    {NAV_ITEMS.map((item) => {
                        const isActive = value === item.value;
                        return (
                            <Box
                                key={item.value}
                                onClick={() => navigate(item.value)}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    px: 1.5,
                                    py: 1.25,
                                    borderRadius: "12px",
                                    cursor: "pointer",
                                    transition: "all 0.15s ease",
                                    background: isActive
                                        ? (theme) => alpha(theme.palette.primary.main, 0.1)
                                        : "transparent",
                                    color: isActive ? "primary.main" : "text.secondary",
                                    fontWeight: isActive ? 700 : 500,
                                    "&:hover": {
                                        background: (theme) =>
                                            isActive
                                                ? alpha(theme.palette.primary.main, 0.14)
                                                : "rgba(15,23,42,0.04)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: 36,
                                        height: 36,
                                        borderRadius: "10px",
                                        background: isActive
                                            ? (theme) =>
                                                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`
                                            : "rgba(15,23,42,0.05)",
                                        color: isActive ? "#fff" : "text.secondary",
                                        transition: "all 0.15s ease",
                                        flexShrink: 0,
                                        "& .MuiSvgIcon-root": { fontSize: 18 },
                                    }}
                                >
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="body2"
                                    fontWeight="inherit"
                                    color="inherit"
                                    sx={{ userSelect: "none" }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Box>

                {/* User + Logout */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        px: 1.5,
                        py: 1.25,
                        borderRadius: "12px",
                        background: "rgba(15,23,42,0.03)",
                        mt: 1,
                    }}
                >
                    <Box
                        sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <Typography variant="caption" fontWeight={800} color="#fff">
                            {user?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase() ?? "?"}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: 1, overflow: "hidden" }}>
                        <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
                            {user?.name?.split(" ")[0] ?? ""}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" noWrap>
                            {user?.email ?? ""}
                        </Typography>
                    </Box>
                    <Tooltip title="Odhlásit se">
                        <IconButton
                            size="small"
                            onClick={logOut}
                            sx={{
                                color: "text.secondary",
                                "&:hover": { color: "error.main" },
                                flexShrink: 0,
                            }}
                        >
                            <LogoutIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* ── Mobile Bottom Navigation ── */}
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    background: "rgba(255,255,255,0.88)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    boxShadow: "0 -1px 0 rgba(15,23,42,0.07), 0 -8px 24px rgba(15,23,42,0.05)",
                }}
            >
                <BottomNavigation
                    sx={{ width: "100%", background: "transparent", height: 64 }}
                    showLabels
                    value={value}
                    onChange={(_, newValue) => navigate(newValue)}
                >
                    {NAV_ITEMS.map((item) => (
                        <BottomNavigationAction
                            key={item.value}
                            label={item.label}
                            value={item.value}
                            icon={item.icon}
                        />
                    ))}
                </BottomNavigation>
            </Box>
        </>
    );
};

export default Navigation;
