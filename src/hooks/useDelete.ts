import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import type { ActionResponse } from "../types";

type useDeleteProps = {
    action: string;
};

const useDelete = ({ action }: useDeleteProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const [confrimOpen, setConfrimOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const fetcher = useFetcher<ActionResponse>();

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
            fetcher.submit({ itemId: selectedId }, { method: "delete", action });
        }
        setConfrimOpen(false);
    };

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data) {
            if (fetcher.data.ok) {
                enqueueSnackbar(fetcher.data.message || "Smazáno", { variant: "success" });
            } else {
                enqueueSnackbar(fetcher.data.message || "Chyba při mazání", { variant: "error" });
            }
        }
    }, [fetcher.state, fetcher.data, enqueueSnackbar]);

    return { handleClickOpen, handleClose, handleConfirmDelete, confrimOpen };
};

export default useDelete;
