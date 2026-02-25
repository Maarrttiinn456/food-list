import { useEffect } from "react";
import { useActionData } from "react-router";
import { useSnackbar } from "notistack";
import type { ActionResponse } from "../types";

const useAddItem = () => {
    const actionData = useActionData<ActionResponse>();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (!actionData) return;

        if (actionData?.ok) {
            enqueueSnackbar(actionData.message, { variant: "success" });
        }
        if (!actionData?.ok) {
            enqueueSnackbar(actionData?.message, { variant: "error" });
        }
    }, [actionData, enqueueSnackbar]);

    return { actionData };
};

export default useAddItem;
