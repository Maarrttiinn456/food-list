import AuthFormWrapper from "../components/auth/AuthFormWrapper";
import AuthForm from "../components/auth/AuthForm";
import { Link as RouterLink } from "react-router";
import { Link } from "@mui/material";

const RegisterPage = () => {
    return (
        <AuthFormWrapper
            title="Vytvořit účet"
            description="Vítejte zpět! Prosím, zadejte své údaje."
        >
            <AuthForm mode="register">
                Pokud již máte účet
                <Link
                    component={RouterLink}
                    to="/auth"
                    variant="caption"
                    pt={0.5}
                    sx={{
                        display: "block",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                    }}
                >
                    Přihlašte se
                </Link>
            </AuthForm>
        </AuthFormWrapper>
    );
};

export default RegisterPage;
