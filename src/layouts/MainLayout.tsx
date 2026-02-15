import { Outlet } from "react-router";
import { Container } from "@mui/material";
import Navigation from "../components/Navigation";

const MainLayout = () => {
    return (
        <Container sx={{ pt: 4, pb: 10 }}>
            <Outlet />
            <Navigation />
        </Container>
    );
};

export default MainLayout;
