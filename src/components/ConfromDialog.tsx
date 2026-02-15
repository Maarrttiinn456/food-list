import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

type ConfromDialogProps = {
    open: boolean;
    handleClose: () => void;
    title: string;
    text: string;
    handleConfirmDelete: () => void;
};

const ConfromDialog = ({
    open,
    handleClose,
    title,
    text,
    handleConfirmDelete,
}: ConfromDialogProps) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{text}</DialogContentText>
            </DialogContent>
            <DialogActions sx={{ pb: 2, px: 2 }}>
                <Button onClick={handleClose} color="inherit">
                    Zrušit
                </Button>
                <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
                    Smazat
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfromDialog;
