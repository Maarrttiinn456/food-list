import { useEffect } from "react";
import { Form, useActionData } from "react-router";
import { Box, InputBase, alpha, useTheme, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import type { ActionResponse } from "../../router/actions/addItemAction";
import { useSnackbar } from "notistack";

type ItemSearchAndAddProps = {
    value: string;
    onChange: (e: string) => void;
};

export default function ItemSearchAndAdd({ value, onChange }: ItemSearchAndAddProps) {
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();

    const actionData = useActionData<ActionResponse>();

    useEffect(() => {
        if (!actionData) return;

        if (actionData?.ok) {
            onChange("");
            enqueueSnackbar(actionData.message, { variant: "success" });
        }
        if (!actionData?.ok) {
            enqueueSnackbar(actionData?.message, { variant: "error" });
        }
    }, [actionData, onChange, enqueueSnackbar]);

    return (
        <Form method="post">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    background: "#fff",
                    border: "1.5px solid",
                    borderColor: "divider",
                    borderRadius: "14px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                    px: 2,
                    py: 1,
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    "&:focus-within": {
                        borderColor: "primary.main",
                        boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.12)}`,
                    },
                }}
            >
                <SearchIcon sx={{ color: "text.secondary", flexShrink: 0 }} />

                <InputBase
                    sx={{
                        flex: 1,
                        fontSize: "1rem",
                        fontWeight: 500,
                        "& input::placeholder": {
                            color: "text.secondary",
                            opacity: 0.8,
                        },
                    }}
                    placeholder="Vyhledej nebo přidej položku…"
                    name="itemName"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete="off"
                    inputProps={{ "aria-label": "vyhledávání nebo přidání položky" }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    startIcon={<AddIcon />}
                    sx={{ px: 1.5, py: 0.75, fontSize: "0.78rem" }}
                >
                    Přidat
                </Button>
            </Box>
        </Form>
    );
}
