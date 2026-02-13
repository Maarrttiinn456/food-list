import { Outlet } from "react-router";
import { Container } from "@mui/material";
import Navigation from "../components/Navigation";

const MainLayout = () => {
    return (
        <Container>
            <Outlet />
            <Navigation />
        </Container>
    );
};

export default MainLayout;
