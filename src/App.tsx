import { RouterProvider } from "react-router";
import { ThemeProvider } from "@mui/material";
import router from "./routes/index.tsx";
import theme from "./theme.ts";
import AuthProvider from "./contexts/AuthProvider.tsx";

const App = () => {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    );
};

export default App;
