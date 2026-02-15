import { type SyntheticEvent } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Snackbar, type SnackbarCloseReason, type AlertColor } from "@mui/material";

type ToastProps = {
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    severity?: AlertColor;
};

const Toast = ({
    isOpen,
    onClose,
    message = "Akce byla úspěšná!",
    severity = "success",
}: ToastProps) => {
    const handleClose = (_event: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === "clickaway") return;
        onClose();
    };

    return (
        <Snackbar
            open={isOpen}
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <Alert
                icon={severity === "success" ? <CheckIcon fontSize="inherit" /> : undefined}
                severity={severity}
                variant="standard"
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Toast;
