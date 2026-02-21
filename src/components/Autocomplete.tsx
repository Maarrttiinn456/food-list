import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import type { Item } from "../types";

interface AutocompleteProps {
    items: Item[];
    actions: {
        handleAddItem: (item: Item | null) => void;
    };
}

const Autocomplete = ({ items, actions }: AutocompleteProps) => {
    return (
        <MuiAutocomplete
            options={items}
            getOptionLabel={(option: Item) => option.name}
            onChange={(_, newValue) => actions.handleAddItem(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Přidat surovinu"
                    placeholder="Začni psát název…"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            bgcolor: "background.paper",
                        },
                    }}
                />
            )}
        />
    );
};

export default Autocomplete;
