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
    typography: {
        fontSize: 16,
    },
});

export default theme;
