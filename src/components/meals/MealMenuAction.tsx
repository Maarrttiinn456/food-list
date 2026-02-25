import { Menu, MenuItem, ListItemIcon, Typography, Divider } from "@mui/material";
import { Link } from "react-router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useDelete from "../../hooks/useDelete";
import ConfromDialog from "../ConfromDialog";

type MenuActionProps = {
    anchorEl: HTMLElement | null;
    setAnchorEl: (anchorEl: HTMLElement | null) => void;
    mealId: string;
};

const MenuAction = ({ anchorEl, setAnchorEl, mealId }: MenuActionProps) => {
    const { confrimOpen, handleClose, handleConfirmDelete, handleClickOpen } = useDelete({
        action: "/meals/delete",
    });

    return (
        <>
            <ConfromDialog
                title="Smazat položku?"
                text="Tato akce je nevratná. Opravdu chcete položku odstranit z katalogu?"
                open={confrimOpen}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
            />
            <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            borderRadius: "12px",
                            border: "1.5px solid",
                            borderColor: "divider",
                            minWidth: 180,
                            bgcolor: "background",
                            overflow: "visible",
                        },
                    },
                }}
            >
                <MenuItem
                    component={Link}
                    to={`/meals/edit/${mealId}`}
                    onClick={() => setAnchorEl(null)}
                    sx={{ py: 1.25 }}
                >
                    <ListItemIcon>
                        <EditOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={500}>
                        Upravit jídlo
                    </Typography>
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem
                    onClick={() => {
                        setAnchorEl(null);
                        handleClickOpen(mealId);
                    }}
                    sx={{ color: "error" }}
                >
                    <ListItemIcon>
                        <DeleteOutlineIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <Typography variant="body2" fontWeight={500} color="error">
                        Smazat jídlo
                    </Typography>
                </MenuItem>
            </Menu>
        </>
    );
};

export default MenuAction;
