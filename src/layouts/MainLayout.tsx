import { Outlet } from "react-router";
import { Container, Box } from "@mui/material";
import Navigation from "../components/Navigation";
import Header from "../components/GlobalHeader";

const SIDEBAR_WIDTH = 240;

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100svh" }}>
            <Navigation />

            {/* Main content area — offset by sidebar on md+ */}
            <Box
                component="main"
                sx={{
                    flex: 1,
                    ml: { xs: 0, md: `${SIDEBAR_WIDTH}px` },
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100svh",
                }}
            >
                {/* Header only on mobile (sidebar has logo+user on desktop) */}
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                    <Header />
                </Box>

                <Container
                    maxWidth="md"
                    sx={{
                        flex: 1,
                        pt: { xs: 3, md: 5 },
                        pb: { xs: 12, md: 6 },
                        px: { xs: 2, sm: 3, md: 4 },
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
