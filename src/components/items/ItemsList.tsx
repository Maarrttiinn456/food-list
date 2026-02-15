import { useFetcher } from "react-router";
import { useState } from "react";
import { List, ListItem, ListItemText, IconButton, Typography, Paper, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Item } from "../../types/items";
import ConfromDialog from "../ConfromDialog";

const ItemsList = ({ items }: { items: Item[] }) => {
    //Modal
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    //Submit form
    const fetcher = useFetcher();

    const handleClickOpen = (id: string) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedId(null);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            fetcher.submit({ itemId: selectedId }, { method: "post", action: "/delete-item" });
        }
        handleClose();
    };

    if (items.length === 0) {
        return (
            <Typography
                variant="body2"
                sx={{ textAlign: "center", mt: 4, color: "text.secondary" }}
            >
                V seznamu zatím není žádná položka.
            </Typography>
        );
    }

    return (
        <Box>
            <ConfromDialog
                title="Smazat položku?"
                text="Tato akce je nevratná. Opravdu chcete položku odstranit z katalogu?"
                open={open}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
            />
            <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", mt: 2 }}>
                <List sx={{ p: 0 }}>
                    {items.map((item, index) => (
                        <ListItem
                            key={item.id}
                            divider={index !== items.length - 1}
                            secondaryAction={
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleClickOpen(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
};

export default ItemsList;
