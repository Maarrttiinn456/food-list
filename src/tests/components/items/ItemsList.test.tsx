// RTL: render = vykreslí komponentu do DOM, screen = hledání prvků, waitFor = čekání na async, fireEvent = simulace kliknutí, within = hledání uvnitř kontejneru (např. dialog)
import { render, screen, waitFor, fireEvent, within } from "@testing-library/react";
// React Router: createMemoryRouter = router v paměti, RouterProvider, ActionFunctionArgs = typ pro parametr akce (request, context)
import { createMemoryRouter, RouterProvider, type ActionFunctionArgs } from "react-router";
// MUI: ThemeProvider potřebuje ItemsPage a dialog (Button, Dialog)
import { ThemeProvider } from "@mui/material/styles";
// useDelete v ItemsList volá enqueueSnackbar po smazání – potřebujeme provider
import { SnackbarProvider } from "notistack";
// ItemsPage obsahuje ItemsList a bere data z useLoaderData() – testujeme celou stránku
import ItemsPage from "../../../routes/ItemsPage";
import theme from "../../../theme";
// Typ pole položek (id, name, user_id, created_at) – stejný jako itemsLoader
import type { ItemsLoaderData } from "../../../router/loaders/itemsLoader";
import { describe, it, expect } from "vitest";

/**
 * Test úspěšného smazání položky v ItemsList.
 * Flow: klik na Smazat → confirm dialog → potvrzení → fetcher odešle na /items/delete → akce odebere položku → revalidace → seznam o 1 méně.
 */

// --- Fixture: dva záznamy, aby jsme mohli ověřit „seznam se zmenší o 1“ ---

const fixtureTwoItems: ItemsLoaderData = [
    { id: "1", name: "mléko", user_id: "user-1", created_at: "" },
    { id: "2", name: "sýr", user_id: "user-1", created_at: "" },
];

/**
 * Vytvoří router, kde loader vrací sdílené pole a delete akce z něj položku odebere.
 * Po revalidaci loader běží znovu a vrátí už upravené pole – ItemsPage dostane méně položek.
 */
function createItemsRouterWithDelete(initialItems: ItemsLoaderData) {
    // Kopie pole, abychom nemutovali vstup; items budeme měnit v delete akci
    const items: ItemsLoaderData = initialItems.map((i) => ({ ...i }));
    // Loader vždy vrátí aktuální stav pole (po delete bude o jeden prvek méně)
    const loader = () => Promise.resolve([...items]);

    // ItemsPage má i formulář pro přidání – při POST na /items se volá tato akce (v testu ji nevyužíváme)
    const mockAddItemAction = async () =>
        ({ ok: true, message: "Položka byla úspěšně přidána." }) as const;

    // useDelete volá fetcher.submit({ itemId }, { method: "delete", action: "/items/delete" }) – tato akce se zavolá
    const mockDeleteAction = async ({ request }: ActionFunctionArgs) => {
        const formData = await request.formData();
        const itemId = String(formData.get("itemId") ?? "");
        const index = items.findIndex((i) => i.id === itemId);
        if (index >= 0) items.splice(index, 1);
        return { ok: true, message: "Položka smazána." };
    };

    return createMemoryRouter(
        [
            {
                path: "/items",
                Component: ItemsPage,
                loader,
                action: mockAddItemAction,
                // Child route bez Component = jen akce; URL /items/delete, useDelete na ni odesílá
                children: [{ path: "delete", action: mockDeleteAction }],
            },
        ],
        { initialEntries: ["/items"], initialIndex: 0 }
    );
}

/** Obalí router v MUI theme a notistack – stejný strom jako v aplikaci. */
function renderItemsPage(router: ReturnType<typeof createItemsRouterWithDelete>) {
    return render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

// --- Test ---

describe("ItemsList – mazání položky", () => {
    it("should show confirm dialog on delete click and shrink list by 1 after confirm", async () => {
        const router = createItemsRouterWithDelete(fixtureTwoItems);
        renderItemsPage(router);

        // Loader je async – počkáme, až se zobrazí obě položky
        await waitFor(() => {
            expect(screen.getByText("mléko")).toBeInTheDocument();
            expect(screen.getByText("sýr")).toBeInTheDocument();
        });

        // Každá položka má tlačítko s aria-label „smazat“ – máme jich dvě
        const deleteButtons = screen.getAllByRole("button", { name: /smazat/i });
        expect(deleteButtons).toHaveLength(2);

        // Klik na první (u „mléko“) – useDelete otevře dialog
        fireEvent.click(deleteButtons[0]);

        // MUI Dialog má role="dialog", uvnitř je titul „Smazat položku?“
        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getByText("Smazat položku?")).toBeInTheDocument();

        // V dialogu je tlačítko „Smazat“ (potvrzující) – within(dialog) hledá jen uvnitř dialogu, ne v celém dokumentu
        const confirmButton = within(dialog).getByRole("button", { name: /smazat/i });
        fireEvent.click(confirmButton);

        // Po kliku useDelete zavolá fetcher.submit, dialog se zavře (handleConfirmDelete volá setConfrimOpen(false))
        await waitFor(() => {
            expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
        });

        // Router po dokončení akce revaliduje – loader se zavolá znovu, vrátí pole bez smazané položky
        await waitFor(() => {
            const remainingDeleteButtons = screen.getAllByRole("button", { name: /smazat/i });
            expect(remainingDeleteButtons).toHaveLength(1);
        });

        // Smazali jsme první (mléko), v seznamu zůstal jen sýr
        expect(screen.getByText("sýr")).toBeInTheDocument();
        expect(screen.queryByText("mléko")).not.toBeInTheDocument();
    });
});
