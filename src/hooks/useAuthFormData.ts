import { useEffect } from "react";
import { useFetcher, useSearchParams } from "react-router";
import { useSnackbar } from "notistack";

export const useAuthForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [searchParams, setSearchParams] = useSearchParams();
    const fetcher = useFetcher();

    const registerStatus = searchParams.get("register");
    const errors = fetcher.data;
    const isSubmitting = fetcher.state === "submitting";

    // Vyřízení úspěšné registrace z URL
    useEffect(() => {
        if (registerStatus === "success") {
            enqueueSnackbar("Uživatel byl úspěšně registrován", { variant: "success" });
            // Vyčistíme URL, aby se snackbar nezobrazoval při každém refreshu
            setSearchParams({}, { replace: true });
        }
    }, [registerStatus, enqueueSnackbar, setSearchParams]);

    return {
        fetcher,
        errors,
        isSubmitting,
        mode: registerStatus === "success" ? "login" : undefined, // volitelné rozšíření logiky
    };
};
