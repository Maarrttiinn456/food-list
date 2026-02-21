import { Box, Grid, Typography, Stack, alpha } from "@mui/material";
import { Outlet } from "react-router";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const AuthLayout = () => {
    return (
        <Grid container minHeight="100vh">
            {/* ── Left decorative panel ── */}
            <Grid
                size={{ xs: 12, md: 6 }}
                display={{ xs: "none", md: "flex" }}
                sx={{ position: "relative", overflow: "hidden" }}
            >
                {/* Gradient background */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background: (theme) =>
                            `linear-gradient(145deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${alpha(theme.palette.primary.light, 0.85)} 100%)`,
                    }}
                />

                {/* Decorative blurred blobs */}
                <Box
                    sx={{
                        position: "absolute",
                        width: 380,
                        height: 380,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                        top: -80,
                        right: -100,
                        filter: "blur(2px)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        width: 260,
                        height: 260,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        bottom: 40,
                        left: -80,
                        filter: "blur(4px)",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        width: 140,
                        height: 140,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        bottom: 200,
                        right: 60,
                    }}
                />

                {/* Content */}
                <Stack
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        px: 6,
                        color: "#fff",
                        gap: 3,
                    }}
                >
                    {/* Logo mark */}
                    <Box
                        sx={{
                            width: 72,
                            height: 72,
                            borderRadius: "20px",
                            background: "rgba(255,255,255,0.18)",
                            backdropFilter: "blur(8px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1.5px solid rgba(255,255,255,0.3)",
                        }}
                    >
                        <RestaurantMenuIcon sx={{ fontSize: 36 }} />
                    </Box>

                    <Box>
                        <Typography
                            variant="h3"
                            fontWeight={800}
                            letterSpacing="-0.5px"
                            lineHeight={1.15}
                        >
                            FoodList
                        </Typography>
                        <Typography variant="h6" fontWeight={400} sx={{ opacity: 0.8, mt: 1 }}>
                            Tvůj chytrý potravinový deník
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            opacity: 0.65,
                            maxWidth: 320,
                            lineHeight: 1.7,
                        }}
                    >
                        Spravuj seznam potravin, plánuj jídla a nikdy nezapomeň, co nakoupit.
                    </Typography>
                </Stack>
            </Grid>

            {/* ── Right form panel ── */}
            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f7f8fa",
                    minHeight: "100vh",
                    px: { xs: 2, sm: 4 },
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 420 }}>
                    {/* Mobile-only logo */}
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.5}
                        mb={4}
                        display={{ xs: "flex", md: "none" }}
                    >
                        <RestaurantMenuIcon color="primary" sx={{ fontSize: 36 }} />
                        <Typography
                            fontWeight={800}
                            variant="h4"
                            color="primary.main"
                            letterSpacing="-0.5px"
                        >
                            FoodList
                        </Typography>
                    </Stack>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
