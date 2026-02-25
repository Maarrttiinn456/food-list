import { type ReactNode } from "react";
import { Typography, TextField, Button, Box, Stack, Alert, alpha } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useAuthForm } from "../../hooks/useAuthFormData";

type AuthFormProps = {
    mode: "register" | "login";
    children?: ReactNode;
};

function AuthForm({ mode, children }: AuthFormProps) {
    const { fetcher, errors, isSubmitting } = useAuthForm();

    return (
        <fetcher.Form method="post" action={mode === "login" ? "/auth?index" : "/auth/register"}>
            <Stack spacing={3}>
                {errors?.serverError && (
                    <Alert
                        severity="error"
                        sx={{
                            borderRadius: "12px",
                            fontSize: "0.85rem",
                        }}
                    >
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
                        fullWidth
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <PersonOutlineIcon
                                        fontSize="small"
                                        sx={{ mr: 1.25, color: "text.secondary" }}
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
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <EmailOutlinedIcon
                                    fontSize="small"
                                    sx={{ mr: 1.25, color: "text.secondary" }}
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
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <LockOutlinedIcon
                                    fontSize="small"
                                    sx={{ mr: 1.25, color: "text.secondary" }}
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
                    disabled={isSubmitting}
                    sx={{
                        mt: 0.5,
                        py: 1.6,
                        fontSize: "1rem",
                        borderRadius: "14px",
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                        boxShadow: (theme) =>
                            `0 4px 20px ${alpha(theme.palette.primary.main, 0.35)}`,
                        "&:hover": {
                            boxShadow: (theme) =>
                                `0 6px 28px ${alpha(theme.palette.primary.main, 0.45)}`,
                        },
                    }}
                >
                    {isSubmitting
                        ? "Zpracovávám…"
                        : mode === "register"
                          ? "Vytvořit účet"
                          : "Přihlásit se"}
                </Button>

                <Box
                    textAlign="center"
                    sx={{
                        borderTop: "1px solid",
                        borderColor: "divider",
                        pt: 2.5,
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
