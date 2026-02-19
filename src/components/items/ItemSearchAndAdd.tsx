import { useEffect } from "react";
import { Form, useActionData } from "react-router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box } from "@mui/material";
import type { ActionResponse } from "../../router/actions/addItemAction";
import { useSnackbar } from "notistack";

type ItemSearchAndAddProps = {
    value: string;
    onChange: (e: string) => void;
};

export default function ItemSearchAndAdd({ value, onChange }: ItemSearchAndAddProps) {
    const { enqueueSnackbar } = useSnackbar();

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
        <Box position={"relative"}>
            <Paper sx={{ width: "100%" }}>
                <Form method="post">
                    <Box
                        sx={{
                            p: "8px 4px",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1, fontSize: 20 }}
                            placeholder="Přidej položku"
                            name="itemName"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            autoComplete="off"
                        />

                        <Divider sx={{ height: 32, m: 0.5 }} orientation="vertical" />

                        <IconButton type="submit" color="primary">
                            <AddCircleIcon />
                        </IconButton>
                    </Box>
                </Form>
            </Paper>
        </Box>
    );
}
