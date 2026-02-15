import { useEffect, useState } from "react";
import { Form, useActionData } from "react-router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Typography } from "@mui/material";
import type { ActionResponse } from "../../router/actions/addItemAction";

export default function ItemSearchAndAdd({
    onChange,
    value,
}: {
    onChange: (e: string) => void;
    value: string;
}) {
    const actionData = useActionData<ActionResponse>();

    const [status, setStatus] = useState<"error" | "success" | "neutral">("neutral");
    const [message, setMessage] = useState("");

    const borderColor =
        status === "error" ? "error.main" : status === "success" ? "success.main" : "grey.400";

    useEffect(() => {
        if (!actionData) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMessage(actionData.message);

        if (actionData.ok) {
            setStatus("success");
            onChange("");
        } else {
            setStatus("error");
        }
    }, [actionData, onChange]);

    const handleFocus = () => {
        setStatus("neutral");
        setMessage("");
        onChange("");
    };

    return (
        <Box position={"relative"}>
            <Paper sx={{ width: "100%", elevation: 0 }}>
                <Form method="post">
                    <Box
                        sx={{
                            p: "2px 4px",
                            display: "flex",
                            alignItems: "center",
                            border: "1px solid",
                            borderColor: borderColor,
                            transition: "border-color 0.2s ease",
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Přidej položku"
                            name="itemName"
                            value={value}
                            onChange={(e) => {
                                onChange(e.target.value);
                            }}
                            onFocus={handleFocus}
                            autoComplete="off"
                        />

                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton type="submit" color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </Box>
                </Form>
            </Paper>

            {message && status !== "neutral" && (
                <Typography
                    variant="caption"
                    position="absolute"
                    top="2"
                    sx={{
                        mt: 0.5,
                        display: "block",
                        color: status === "error" ? "error.main" : "success.main",
                    }}
                >
                    {message}
                </Typography>
            )}
        </Box>
    );
}
