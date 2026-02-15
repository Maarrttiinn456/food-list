import { Box, Grid } from "@mui/material";

import { Outlet } from "react-router";

const AuthLayout = () => {
    return (
        <Grid container minHeight="100svh">
            <Grid
                size={{ xs: 12, md: 6 }}
                p={{ xs: 0, md: 4 }}
                display={{ xs: "none", md: "block" }}
            >
                <Box
                    bgcolor="primary.main"
                    borderRadius={1}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                        textAlign: "center",
                    }}
                ></Box>
            </Grid>

            <Grid
                size={{ xs: 12, md: 6 }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box sx={{ width: "100%", maxWidth: 450 }}>
                    <Outlet />
                </Box>
            </Grid>
        </Grid>
    );
};

export default AuthLayout;
