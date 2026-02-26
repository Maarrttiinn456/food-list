import { Link } from "react-router";
import { Box, Button, Typography, alpha } from "@mui/material";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";

const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                textAlign: "center",
                px: 2,
            }}
        >
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: (theme) =>
                        `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.primary.dark, 0.08)})`,
                    mb: 3,
                }}
            >
                <SearchOffOutlinedIcon
                    sx={{ fontSize: 40, color: "primary.main", opacity: 0.9 }}
                />
            </Box>
            <Typography variant="h3" fontWeight={800} color="text.primary" gutterBottom>
                404
            </Typography>
            <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 1, fontWeight: 600 }}
            >
                Stránka nenalezena
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 320 }}>
                Adresa neexistuje nebo byla přesunuta. Vrať se na přehled jídel.
            </Typography>
            <Button
                component={Link}
                to="/meals"
                variant="contained"
                size="large"
                sx={{
                    borderRadius: "12px",
                    px: 3,
                    py: 1.25,
                    fontWeight: 700,
                    boxShadow: (theme) =>
                        `0 4px 14px ${alpha(theme.palette.primary.main, 0.35)}`,
                    "&:hover": {
                        boxShadow: (theme) =>
                            `0 6px 20px ${alpha(theme.palette.primary.main, 0.45)}`,
                    },
                }}
            >
                Zpět na jídla
            </Button>
        </Box>
    );
};

export default NotFoundPage;
