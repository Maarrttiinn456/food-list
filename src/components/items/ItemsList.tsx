import { Box, Typography, IconButton, Stack } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import ConfromDialog from "../ConfromDialog";
import type { ItemsLoaderData } from "../../router/loaders/itemsLoader";
import useDelete from "../../hooks/useDelete";

const ItemsList = ({ items }: { items: ItemsLoaderData }) => {
    const { handleClickOpen, handleClose, handleConfirmDelete, confrimOpen } = useDelete({
        action: "/items/delete",
    });

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

            <Stack spacing={1}>
                {items.map((item) => (
                    <Box
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            px: 2.5,
                            py: 1.5,
                            borderRadius: "14px",
                            background: "#fff",
                            boxShadow:
                                "0 1px 3px rgba(15,23,42,0.05), 0 2px 8px rgba(15,23,42,0.05)",
                            transition: "box-shadow 0.2s ease, transform 0.2s ease",
                            "&:hover": {
                                boxShadow:
                                    "0 2px 8px rgba(15,23,42,0.08), 0 6px 20px rgba(15,23,42,0.08)",
                                transform: "translateY(-1px)",
                            },
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                fontWeight: 500,
                                color: "text.primary",
                                textTransform: "capitalize",
                            }}
                        >
                            {item.name}
                        </Typography>

                        <IconButton
                            aria-label="smazat"
                            size="small"
                            onClick={() => handleClickOpen(item.id)}
                            color="error"
                            sx={{ opacity: 0.6, "&:hover": { opacity: 1 } }}
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
