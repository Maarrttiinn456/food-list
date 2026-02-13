import { CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

type AuthFormWrapperProps = {
    children: ReactNode;
    title: string;
    description: string;
};

const AuthFormWrapper = ({ title, description, children }: AuthFormWrapperProps) => {
    return (
        <CardContent sx={{ p: 4 }}>
            <Typography
                variant="h4"
                component="h1"
                gutterBottom
                textAlign="center"
                fontWeight="bold"
            >
                {title}
            </Typography>

            <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
                {description}
            </Typography>

            {children}
        </CardContent>
    );
};

export default AuthFormWrapper;
