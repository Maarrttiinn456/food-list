import { useDeferredValue, useState, useMemo } from "react";
import { useLoaderData } from "react-router";
import { Box, Typography } from "@mui/material";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import ItemSearchAndAdd from "../components/items/ItemSearchAndAdd";
import ItemsList from "../components/items/ItemsList";
import type { ItemsLoaderData } from "../router/loaders/itemsLoader";
import PageHeader from "../components/PageHeader";

/** Vrátí řetězec bez diakritiky pro porovnávání**/
const withoutDiacritics = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "");

const ItemsPage = () => {
    const data = useLoaderData<ItemsLoaderData>();

    const [query, setQuery] = useState("");
    const deferredValue = useDeferredValue(query);

    const isProcesed = deferredValue !== query;

    const filtredItems = useMemo(
        () =>
            data.filter((item) => {
                const name = withoutDiacritics(item.name.toLocaleLowerCase());
                const search = withoutDiacritics(deferredValue.toLocaleLowerCase());
                return name.includes(search);
            }),
        [data, deferredValue]
    );

    return (
        <Box>
            <PageHeader
                title="Katalog položek"
                subtitle={`${data.length} položek celkem`}
                icon={<InventoryOutlinedIcon />}
            />

            <ItemSearchAndAdd value={query} onChange={setQuery} />

            <Box
                sx={{
                    mt: 3,
                    opacity: isProcesed ? 0.45 : 1,
                    transition: "opacity 0.35s ease",
                }}
            >
                {filtredItems.length > 0 && <ItemsList items={filtredItems} />}

                {filtredItems.length === 0 && (
                    <Typography
                        variant="body2"
                        sx={{ textAlign: "center", mt: 6, color: "secondary" }}
                    >
                        Žádná shoda pro „{query}". Stiskni <strong>Přidat</strong> pro vytvoření
                        nové položky.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ItemsPage;
