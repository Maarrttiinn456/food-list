import { Menu, MenuItem, ListItemIcon, Typography, Divider } from "@mui/material";
import { Link } from "react-router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type MenuActionProps = {
    anchorEl: HTMLElement | null;
    setAnchorEl: (anchorEl: HTMLElement | null) => void;
    onDelete: () => void;
};

const MenuAction = ({ anchorEl, setAnchorEl, onDelete }: MenuActionProps) => {
    return (
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
            <MenuItem component={Link} to="#" onClick={() => setAnchorEl(null)} sx={{ py: 1.25 }}>
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
                    onDelete();
                    setAnchorEl(null);
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
    );
};

export default MenuAction;
