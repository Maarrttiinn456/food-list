import { useLoaderData } from "react-router";
import { Box, Stack } from "@mui/material";
import ItemSearchAndAdd from "../components/items/ItemSearchAndAdd";
import ItemsList from "../components/items/ItemsList";
import type { Item } from "../types/items";
import { useDeferredValue, useState } from "react";

const ItemsPage = () => {
    const data = useLoaderData<Item[]>();

    const [query, setQuery] = useState("");
    const deferredValue = useDeferredValue(query);

    //Hodnota která mi říká ještě mi běží vápočet hodnoty na pozadí (true/false)
    const isProcesed = deferredValue !== query;

    const filtredItems = data.filter((item) =>
        item.name.toLocaleLowerCase().includes(deferredValue.toLocaleLowerCase())
    );

    return (
        <Stack spacing={2}>
            <ItemSearchAndAdd value={query} onChange={setQuery} />

            <Box
                sx={{
                    opacity: isProcesed ? 0.5 : 1,
                    transition: "opacity 0.4s ease",
                }}
            >
                <ItemsList items={filtredItems} />
            </Box>
        </Stack>
    );
};

export default ItemsPage;
