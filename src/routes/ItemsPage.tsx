import { Box, Stack } from "@mui/material";
import ItemSearchAndAdd from "../components/items/ItemSearchAndAdd";
import ItemsList from "../components/items/ItemsList";
import { useLoaderData } from "react-router";
import type { Item } from "../types/items";
import { useState, useTransition } from "react";

const ItemsPage = () => {
    const data = useLoaderData<Item[]>();
    const [query, setQuery] = useState("");
    const [deferredQuery, setDeferredQuery] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleQueryChange = (newQuery: string) => {
        setQuery(newQuery);
        startTransition(() => {
            setDeferredQuery(newQuery);
        });
    };

    const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(deferredQuery.toLowerCase())
    );

    return (
        <Stack spacing={5}>
            <ItemSearchAndAdd value={query} onChange={handleQueryChange} />

            <Box
                sx={{
                    opacity: isPending ? 0.6 : 1,
                    transition: "opacity 0.2s ease",
                }}
            >
                <ItemsList items={filteredData} />
            </Box>
        </Stack>
    );
};

export default ItemsPage;
