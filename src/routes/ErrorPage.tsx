import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { useNavigate, useRouteError, isRouteErrorResponse } from "react-router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    let errorMessage = "Nastala neočekávaná chyba v aplikaci.";
    let errorStatus = "500";

    if (isRouteErrorResponse(error)) {
        errorMessage = error.data || error.statusText;
        errorStatus = String(error.status);
    } else if (error instanceof Error) {
        errorMessage = error.message;
    }

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "80vh",
                    textAlign: "center",
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        bgcolor: "background.paper",
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.light", mb: 2 }} />

                    <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                        {errorStatus}
                    </Typography>

                    <Typography variant="h5" color="text.primary" gutterBottom>
                        Ajaj, něco se pokazilo!
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        {errorMessage}
                    </Typography>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate(-1)}
                        >
                            Zpět
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<RefreshIcon />}
                            onClick={() => window.location.reload()}
                        >
                            Zkusit znovu
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default ErrorPage;
