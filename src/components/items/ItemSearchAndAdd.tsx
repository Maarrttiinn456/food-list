import { useEffect } from "react";
import { Form } from "react-router";
import { Box, InputBase, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
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

    return (
        <Form method="post">
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    border: "1.5px solid",
                    borderColor: "divider",
                    borderRadius: "14px",
                    px: 2,
                    py: 1,
                }}
            >
                <SearchIcon sx={{ color: "secondary", flexShrink: 0 }} />

                <InputBase
                    sx={{
                        flex: 1,
                        fontSize: "1rem",
                        fontWeight: 500,
                    }}
                    placeholder="Vyhledej nebo přidej položku…"
                    name="itemName"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    autoComplete="off"
                />

                <Button
                    variant="contained"
                    disabled={!value.trim()}
                    type="submit"
                    startIcon={<AddIcon />}
                >
                    Přidat
                </Button>
            </Box>
        </Form>
    );
}
