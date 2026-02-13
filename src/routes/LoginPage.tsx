import { Link as RouterLink } from "react-router";
import AuthFormWrapper from "../components/auth/AuthFormWrapper";
import AuthForm from "../components/auth/AuthForm";
import { Link } from "@mui/material";

const LoginPage = () => {
    return (
        <AuthFormWrapper title="Přihlášení" description="Vítejte zpět! Prosím, zadejte své údaje.">
            <AuthForm mode="login">
                Nemáte ještě účet?
                <Link
                    component={RouterLink}
                    to="/auth/register"
                    variant="caption"
                    pt={0.5}
                    sx={{
                        display: "block",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Registrujte se
                </Link>
            </AuthForm>
        </AuthFormWrapper>
    );
};

export default LoginPage;
