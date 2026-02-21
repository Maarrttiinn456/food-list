import { useState } from "react";
import { useFetcher } from "react-router";
import { useSnackbar } from "notistack";
import { Box, Typography, IconButton, Stack, alpha } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ConfromDialog from "../ConfromDialog";
import type { ItemsLoaderData } from "../../router/loaders/itemsLoader";
import type { AddItemActionData } from "../../router/actions/addItemAction";

const ItemsList = ({ items }: { items: ItemsLoaderData }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [confrimOpen, setConfrimOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fetcher = useFetcher<AddItemActionData>();

    const handleClickOpen = (id: string) => {
        setSelectedId(id);
        setConfrimOpen(true);
    };

    const handleClose = () => {
        setConfrimOpen(false);
        setSelectedId(null);
    };

    const handleConfirmDelete = () => {
        if (selectedId) {
            fetcher.submit({ itemId: selectedId }, { method: "post", action: "/delete-item" });
        }
        handleClose();
        enqueueSnackbar("Položka smazána", { variant: "success" });
    };

    if (items.length === 0) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1.5,
                    py: 8,
                    color: "text.secondary",
                }}
            >
                <LocalGroceryStoreOutlinedIcon sx={{ fontSize: 48, opacity: 0.35 }} />
                <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 500 }}>
                    Žádná položka neodpovídá hledanému výrazu.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <ConfromDialog
                title="Smazat položku?"
                text="Tato akce je nevratná. Opravdu chcete položku odstranit z katalogu?"
                open={confrimOpen}
                handleClose={handleClose}
                handleConfirmDelete={handleConfirmDelete}
            />

            <Stack spacing={0.75}>
                {items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2.5,
                            py: 1.5,
                            borderRadius: "12px",
                            border: "1.5px solid",
                            borderColor: "divider",
                            background: "#fff",
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 500, color: "text.primary" }}>
                            {item.name}
                        </Typography>

                        <IconButton
                            aria-label="smazat"
                            size="small"
                            onClick={() => handleClickOpen(item.id)}
                            sx={{
                                color: "error.main",
                                borderRadius: "8px",
                                "&:hover": {
                                    background: (theme) => alpha(theme.palette.error.main, 0.1),
                                },
                            }}
                        >
                            <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default ItemsList;
