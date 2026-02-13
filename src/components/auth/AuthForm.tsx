import { type ReactNode } from "react";
import { Form, useActionData, useNavigation, useSearchParams } from "react-router";
import { Typography, TextField, Button, Box, Stack } from "@mui/material";
import Toast from "../Toast";

type AuthFormProps = {
    mode: "register" | "login";
    children?: ReactNode;
};

function AuthForm({ mode, children }: AuthFormProps) {
    const errors = useActionData();
    const navigation = useNavigation();

    const submitting = navigation.state === "submitting";

    const [searchParams, setSearchParams] = useSearchParams();
    const isSuccess = searchParams.get("register") === "success";

    const handleClose = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete("register");
        setSearchParams(newParams, { replace: true });
    };

    return (
        <Form method="post">
            <Toast
                isOpen={isSuccess}
                onClose={handleClose}
                message="Registrace proběhla úspěšně!"
            />
            <Stack spacing={2}>
                {errors?.serverError && (
                    <Typography color="error" textAlign="center" variant="body2">
                        {errors.serverError}
                    </Typography>
                )}
                {mode === "register" && (
                    <TextField
                        label="Jméno"
                        error={!!errors?.fullname}
                        helperText={errors?.fullname}
                        name="fullname"
                        type="text"
                        variant="standard"
                    />
                )}

                <TextField
                    label="E-mail"
                    error={!!errors?.email}
                    helperText={errors?.email}
                    name="email"
                    type="email"
                    variant="standard"
                />
                <TextField
                    label="Heslo"
                    error={!!errors?.password}
                    helperText={errors?.password}
                    name="password"
                    type="password"
                    variant="standard"
                />

                <Box pt={1}>
                    <Button
                        variant="contained"
                        type="submit"
                        size="large"
                        fullWidth
                        disabled={submitting}
                    >
                        {submitting
                            ? "Zpracovávám"
                            : mode === "register"
                              ? "Registrujte se"
                              : "Přihlašte se"}
                    </Button>
                </Box>

                <Box textAlign="center" pt={{ xs: 2, md: 2 }}>
                    <Typography variant="body1">{children}</Typography>
                </Box>
            </Stack>
        </Form>
    );
}

export default AuthForm;
