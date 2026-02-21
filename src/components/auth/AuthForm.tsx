import { useEffect, type ReactNode } from "react";
import { useFetcher, useSearchParams } from "react-router";
import { Typography, TextField, Button, Box, Stack, Alert } from "@mui/material";
import { useSnackbar } from "notistack";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

type AuthFormProps = {
    mode: "register" | "login";
    children?: ReactNode;
};

function AuthForm({ mode, children }: AuthFormProps) {
    const { enqueueSnackbar } = useSnackbar();
    const [searchParams, setSearchParams] = useSearchParams();

    const registerStatus = searchParams.get("register");

    const fetcher = useFetcher();
    const errors = fetcher.data;

    const submitting = fetcher.state === "submitting";

    useEffect(() => {
        if (registerStatus === "success") {
            enqueueSnackbar("Uživatel byl úspěšně registrován", { variant: "success" });
        }
        setSearchParams({}, { replace: true });
    }, [registerStatus, enqueueSnackbar, setSearchParams]);

    return (
        <fetcher.Form method="post" action={mode === "login" ? "/auth?index" : "/auth/register"}>
            <Stack spacing={2.5}>
                {errors?.serverError && (
                    <Alert severity="error" sx={{ borderRadius: "10px", fontSize: "0.85rem" }}>
                        {errors.serverError}
                    </Alert>
                )}

                {mode === "register" && (
                    <TextField
                        label="Jméno"
                        error={!!errors?.fullname}
                        helperText={errors?.fullname}
                        name="fullname"
                        type="text"
                        variant="outlined"
                        size="medium"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <PersonOutlineIcon
                                        fontSize="small"
                                        sx={{ mr: 1, color: "text.secondary" }}
                                    />
                                ),
                            },
                        }}
                    />
                )}

                <TextField
                    label="E-mail"
                    error={!!errors?.email}
                    helperText={errors?.email}
                    name="email"
                    type="email"
                    variant="outlined"
                    size="medium"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <EmailOutlinedIcon
                                    fontSize="small"
                                    sx={{ mr: 1, color: "text.secondary" }}
                                />
                            ),
                        },
                    }}
                />

                <TextField
                    label="Heslo"
                    error={!!errors?.password}
                    helperText={errors?.password}
                    name="password"
                    type="password"
                    variant="outlined"
                    size="medium"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <LockOutlinedIcon
                                    fontSize="small"
                                    sx={{ mr: 1, color: "text.secondary" }}
                                />
                            ),
                        },
                    }}
                />

                <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    sx={{ mt: 0.5 }}
                >
                    {submitting
                        ? "Zpracovávám…"
                        : mode === "register"
                          ? "Vytvořit účet"
                          : "Přihlásit se"}
                </Button>
                <Box
                    textAlign="center"
                    pt={0.5}
                    sx={{
                        borderTop: "1px solid",
                        borderColor: "divider",
                        mt: 1,
                        pt: 2,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        {children}
                    </Typography>
                </Box>
            </Stack>
        </fetcher.Form>
    );
}

export default AuthForm;
