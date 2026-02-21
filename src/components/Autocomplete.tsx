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
    );
};

export default Autocomplete;
