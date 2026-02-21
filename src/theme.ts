import { blueGrey, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: teal[600],
            contrastText: "#ffffff",
        },
        secondary: {
            main: blueGrey[600],
            contrastText: "#ffffff",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 100px #fff inset",
                        WebkitTextFillColor: "#000",
                        transition: "background-color 9999s ease-in-out 0s",
                    },
                    "&:-webkit-autofill:hover": {
                        WebkitBoxShadow: "0 0 0 100px #fff inset",
                    },
                    "&:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 100px #fff inset",
                    },
                },
            },
        },
    },
});

export default theme;
