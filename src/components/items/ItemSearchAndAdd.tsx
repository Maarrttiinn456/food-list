import { useEffect } from "react";
import { Form } from "react-router";
import { Box, InputBase, IconButton, alpha } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useAddItem from "../../hooks/useAddItem";

type ItemSearchAndAddProps = {
    value: string;
    onChange: (e: string) => void;
};

export default function ItemSearchAndAdd({ value, onChange }: ItemSearchAndAddProps) {
    const { actionData } = useAddItem();

    useEffect(() => {
        if (actionData?.ok) {
            onChange("");
        }
    }, [actionData, onChange]);

    const canAdd = value.trim().length > 0;

    return (
        <Form method="post">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderRadius: "16px",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.07)",
                    px: 2,
                    py: 0.75,
                    "&:focus-within": {
                        boxShadow: (theme) =>
                            `0 2px 8px rgba(15,23,42,0.08), 0 8px 24px rgba(15,23,42,0.1), 0 0 0 3px ${alpha(theme.palette.primary.main, 0.15)}`,
                    },
                }}
            >
                <SearchIcon sx={{ color: "text.secondary", flexShrink: 0 }} />

                <InputBase
                    sx={{ flex: 1, fontSize: "1rem", fontWeight: 500 }}
                    placeholder="Vyhledej nebo přidej položku…"
                    name="itemName"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete="off"
                />

                <IconButton
                    type="submit"
                    disabled={!canAdd}
                    size="small"
                    color="primary"
                    aria-label="přidat položku"
                    sx={{ flexShrink: 0 }}
                >
                    <AddCircleIcon
                        sx={{
                            fontSize: 32,
                            opacity: canAdd ? 1 : 0.25,
                            transition: "opacity 0.2s ease",
                        }}
                    />
                </IconButton>
            </Box>
        </Form>
    );
}
