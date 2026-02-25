import { createTheme, alpha } from "@mui/material/styles";

const EMERALD = {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
};

const theme = createTheme({
    palette: {
        primary: {
            light: EMERALD[400],
            main: EMERALD[600],
            dark: EMERALD[800],
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#64748b",
            light: "#94a3b8",
            dark: "#475569",
            contrastText: "#ffffff",
        },
        background: {
            default: "#F8FAFC",
            paper: "#ffffff",
        },
        text: {
            primary: "#0f172a",
            secondary: "#64748b",
        },
        divider: "rgba(15,23,42,0.08)",
    },
    typography: {
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        h3: { fontWeight: 800, letterSpacing: "-0.5px" },
        h4: { fontWeight: 800, letterSpacing: "-0.5px" },
        h5: { fontWeight: 800, letterSpacing: "-0.5px" },
        h6: { fontWeight: 700, letterSpacing: "-0.3px" },
        body1: { fontWeight: 400 },
        body2: { fontWeight: 400, color: "#64748b" },
        button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
                body {
                    background-color: #F8FAFC;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }
                * {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
            `,
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: "14px",
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "10px 20px",
                    boxShadow: "none",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        boxShadow: `0 4px 16px ${alpha(theme.palette.primary.main, 0.3)}`,
                        transform: "translateY(-1px)",
                    },
                    "&:active": {
                        transform: "translateY(0)",
                    },
                }),
                contained: ({ theme }) => ({
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    "&:hover": {
                        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
                    },
                }),
                sizeLarge: {
                    padding: "13px 24px",
                    fontSize: "1rem",
                    borderRadius: "16px",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(15,23,42,0.08), 0 12px 32px rgba(15,23,42,0.1)",
                        transform: "translateY(-2px)",
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.06)",
                },
                elevation0: {
                    boxShadow: "none",
                },
            },
        },
        // Single source of truth for all outlined inputs (TextField, Select, Autocomplete)
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: "14px",
                    backgroundColor: "#ffffff",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    "& fieldset": {
                        borderColor: "rgba(15,23,42,0.12)",
                    },
                    "&:hover fieldset": {
                        borderColor: "rgba(15,23,42,0.25)",
                    },
                    "&.Mui-focused": {
                        boxShadow: `0 0 0 3px ${alpha(EMERALD[600], 0.18)}`,
                        transform: "translateY(-1px)",
                    },
                    "&.Mui-focused fieldset": {
                        borderWidth: "1.5px",
                        borderColor: `${EMERALD[600]} !important`,
                    },
                },
                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #fff inset",
                        WebkitTextFillColor: "#000",
                        transition: "background-color 9999s ease-in-out 0s",
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: EMERALD[600],
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "rgba(248,250,252,0.85)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderBottom: "none",
                    boxShadow: "0 1px 0 rgba(15,23,42,0.07)",
                    color: "#0f172a",
                },
            },
        },
        MuiAlert: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    fontSize: "0.875rem",
                },
            },
        },
        MuiAccordion: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    "&::before": { display: "none" },
                },
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    background: "transparent",
                },
            },
        },
        MuiBottomNavigationAction: {
            styleOverrides: {
                root: {
                    color: "#94a3b8",
                    "&.Mui-selected": {
                        color: EMERALD[600],
                    },
                    minWidth: 48,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: "8px",
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
