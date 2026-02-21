import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import type { Category } from "../types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelectCheckmarks({
    categories,
    onChange,
}: {
    categories: Category[];
    onChange: (categories: Category[]) => void;
}) {
    const [items, setItems] = useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof items>) => {
        const {
            target: { value },
        } = event;
        setItems(typeof value === "string" ? value.split(",") : value);
    };

    useEffect(() => {
        const selectedCaregories = categories.filter(
            (category) => category.name && items.includes(category.name)
        );

        if (selectedCaregories.length > 0) {
            onChange(selectedCaregories);
        }
    }, [items]);

    return (
        <div>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={items}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {categories &&
                        categories.map((category) => {
                            const selected = category.name ? items.includes(category.name) : false;
                            const SelectionIcon = selected
                                ? CheckBoxIcon
                                : CheckBoxOutlineBlankIcon;

                            return (
                                <MenuItem key={category.id} value={category.name ?? ""}>
                                    <SelectionIcon
                                        fontSize="small"
                                        style={{
                                            marginRight: 8,
                                            padding: 9,
                                            boxSizing: "content-box",
                                        }}
                                    />
                                    <ListItemText primary={category.name} />
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
        </div>
    );
}
