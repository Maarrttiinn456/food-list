import { Link } from "react-router";
import { Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const MealsPage = () => {
    //Hledání jídla dle inputu
    //katagorie jídel
    //List jídel
    // Jídlo detail (nazev, user_id, polozky ze kterych se sklada, poznmka, )

    //Vytvorit jidlo
    //Updatovat jidlo

    return (
        <Box minHeight="100svh" position="relative">
            <Box position="fixed" right={0} bottom={100} px={2}>
                <Link to="/meals/add" style={{ textDecoration: "none" }}>
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Link>
            </Box>
            <div>MealsPage</div>
        </Box>
    );
};

export default MealsPage;
