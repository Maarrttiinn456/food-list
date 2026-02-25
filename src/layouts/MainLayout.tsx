import { Outlet } from "react-router";
import { Container, Box } from "@mui/material";
import Navigation from "../components/Navigation";
import Header from "../components/GlobalHeader";

const MainLayout = () => {
    return (
        <Container maxWidth="md">
            <Header />
            <Box sx={{ pt: 4, pb: 10 }}>
                <Outlet />
                <Navigation />
            </Box>
        </Container>
    );
};

export default MainLayout;
