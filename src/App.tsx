import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material";
import router from "./routes/index.tsx";
import theme from "./theme.ts";
import AuthProvider from "./contexts/AuthProvider.tsx";
import SnackbarProvider from "./contexts/SnackbarProvider.tsx";

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    <RouterProvider router={router} />
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
