import { Card, CardContent, Typography } from "@mui/material";
import type { ReactNode } from "react";

type AuthFormWrapperProps = {
    children: ReactNode;
    title: string;
    description: string;
};

const AuthFormWrapper = ({ title, description, children }: AuthFormWrapperProps) => {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: "16px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                background: "#fff",
                // Disable global card hover transform from theme
                "&:hover": {
                    transform: "none",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                },
            }}
        >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    fontWeight={700}
                    letterSpacing="-0.3px"
                >
                    {title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={3}>
                    {description}
                </Typography>

                {children}
            </CardContent>
        </Card>
    );
};

export default AuthFormWrapper;
