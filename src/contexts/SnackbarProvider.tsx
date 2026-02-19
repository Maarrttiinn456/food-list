import { forwardRef, type ReactNode } from "react";
import { SnackbarProvider as NotistackProvider, type CustomContentProps } from "notistack";
import { Alert } from "@mui/material";

const components = {
    success: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
        <Alert ref={ref} severity="success" variant="standard" sx={{ width: "100%" }}>
            {message}
        </Alert>
    )),
    error: forwardRef<HTMLDivElement, CustomContentProps>(({ message }, ref) => (
        <Alert ref={ref} severity="error" variant="standard" sx={{ width: "100%" }}>
            {message}
        </Alert>
    )),
};

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    return (
        <NotistackProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            Components={components}
        >
            {children}
        </NotistackProvider>
    );
};

export default SnackbarProvider;
