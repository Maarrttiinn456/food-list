import {
    Box,
    TextField,
    Typography,
    Stack,
    IconButton,
    Autocomplete,
    Paper,
    Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoaderData } from "react-router";
import type { Item } from "../../types/items";

const MealsForm = () => {
    const loaderData = useLoaderData();

    return (
        <Stack spacing={3} sx={{ width: "100%" }}>
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 5,
                    bgcolor: "action.hover",
                    border: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Stack spacing={2}>
                    <TextField
                        variant="standard"
                        fullWidth
                        placeholder="Název jídla"
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: {
                                    fontSize: "1.8rem",
                                    fontWeight: "800",
                                    letterSpacing: "-0.5px",
                                },
                            },
                        }}
                    />
                    <TextField
                        variant="standard"
                        fullWidth
                        multiline
                        placeholder="Popis..."
                        slotProps={{
                            input: {
                                disableUnderline: true,
                                sx: { fontSize: "1.1rem", opacity: 0.8 },
                            },
                        }}
                    />
                </Stack>
            </Paper>

            <Autocomplete
                options={loaderData}
                getOptionLabel={(option: Item) => option.name}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Hledat surovinu..."
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 4,
                                bgcolor: "background.paper",
                                height: 60,
                                fontSize: "1.1rem",
                            },
                        }}
                    />
                )}
            />

            <Stack spacing={1}>
                {[1, 2].map((item) => (
                    <Box
                        key={item}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            p: 2,
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <Typography sx={{ flex: 1, fontWeight: "600", fontSize: "1.05rem" }}>
                            Špagety
                        </Typography>

                        <TextField
                            size="small"
                            variant="standard"
                            placeholder="0"
                            slotProps={{
                                input: {
                                    disableUnderline: true,
                                },
                            }}
                        />

                        <IconButton edge="end" aria-label="delete" color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Stack>

            <Button variant="contained" type="submit" size="large" fullWidth>
                Přidat jídlo
            </Button>
        </Stack>
    );
};

export default MealsForm;
