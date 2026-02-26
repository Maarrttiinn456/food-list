import { useState } from "react";
import { Autocomplete as MuiAutocomplete, TextField } from "@mui/material";
import type { Item } from "../types";

interface AutocompleteProps {
    items: Item[];
    actions: {
        handleAddItem: (item: Item | null) => void;
    };
}

const Autocomplete = ({ items, actions }: AutocompleteProps) => {
    const [value, setValue] = useState<Item | null>(null);
    const [inputValue, setInputValue] = useState("");

    return (
        <MuiAutocomplete
            value={value}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            options={items}
            getOptionLabel={(option: Item) => option.name}
            onChange={(_, newValue) => {
                if (newValue) {
                    actions.handleAddItem(newValue);
                }
                setValue(null);
                setInputValue("");
            }}
            renderInput={(params) => (
                <TextField {...params} label="Přidat surovinu" placeholder="Začni psát název…" />
            )}
        />
    );
};

export default Autocomplete;
