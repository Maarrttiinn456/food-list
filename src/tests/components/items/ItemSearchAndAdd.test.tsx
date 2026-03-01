// React Testing Library: render, hledání v DOM, čekání, simulace událostí
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// React Router: paměťový router, provider
import { createMemoryRouter, RouterProvider } from "react-router";
// MUI a notistack
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
// Stránka s ItemSearchAndAdd a ItemsList – testujeme celý flow přidávání
import ItemsPage from "../../../routes/ItemsPage";
import theme from "../../../theme";
import type { ItemsLoaderData } from "../../../router/loaders/itemsLoader";
import { describe, it, expect } from "vitest";

/**
 * Testy přidávání položek: ItemSearchAndAdd + ItemsList na ItemsPage.
 * Ověřují disabled tlačítko při prázdném inputu, chybu u duplicity a úspěšné přidání (hláška + vyprázdnění inputu).
 */

// --- Fixture data ---

const fixtureOneItem: ItemsLoaderData = [
    { id: "1", name: "mléko", user_id: "user-1", created_at: "" },
];

// --- Mock akce (nahrazují addItemAction, aby testy nevolaly Supabase) ---

/** Simuluje úspěšné přidání – vrací ok a zprávu, useAddItem zobrazí notistack a vyprázdní input. */
async function mockAddItemSuccessAction() {
    return { ok: true, message: "Položka byla úspěšně přidána." };
}

/** Simuluje duplicitu – vrací chybu jako addItemAction při existující položce. */
async function mockAddItemDuplicateAction() {
    return { ok: false, message: "Tato položka již v seznamu existuje." };
}

/**
 * Vytvoří paměťový router s cestou /items (ItemsPage).
 * @param loaderData – data vrácená loaderi (seznam položek)
 * @param action – akce volaná při POST (přidání položky)
 */
function createItemsRouter(
    loaderData: ItemsLoaderData = [],
    action: () => Promise<{ ok: boolean; message: string }> = mockAddItemSuccessAction
) {
    return createMemoryRouter(
        [
            {
                path: "/items",
                Component: ItemsPage,
                loader: () => Promise.resolve(loaderData),
                action,
            },
        ],
        { initialEntries: ["/items"], initialIndex: 0 }
    );
}

/** Vykreslí ItemsPage s MUI, notistack a routerem. */
function renderItemsPage(router: ReturnType<typeof createItemsRouter>) {
    return render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

// --- Testy ---

describe("ItemSearchAndAdd / ItemsPage – přidávání položek", () => {
    it("should have add button disabled when input is empty", async () => {
        const router = createItemsRouter([]);
        renderItemsPage(router);

        await waitFor(() => {
            expect(screen.getByRole("button", { name: /přidat položku/i })).toBeInTheDocument();
        });
        const addButton = screen.getByRole("button", { name: /přidat položku/i });
        expect(addButton).toBeDisabled();
    });

    it("should show error and not add duplicate item – list stays same length", async () => {
        const router = createItemsRouter(fixtureOneItem, mockAddItemDuplicateAction);
        renderItemsPage(router);

        // Počkáme na vykreslení stránky (loader je async)
        await waitFor(() => {
            expect(screen.getByText("mléko")).toBeInTheDocument();
        });

        const input = screen.getByPlaceholderText(/vyhledej nebo přidej položku/i);
        const addButton = screen.getByRole("button", { name: /přidat položku/i });

        fireEvent.change(input, { target: { value: "mléko" } });
        fireEvent.click(addButton);

        // Zobrazí se chybová hláška (notistack z useAddItem)
        await waitFor(() => {
            expect(screen.getByText("Tato položka již v seznamu existuje.")).toBeInTheDocument();
        });

        // Seznam zůstane o jedné položce (loader se v testu znovu nevolá, stále jedna)
        const deleteButtons = screen.getAllByRole("button", { name: /smazat/i });
        expect(deleteButtons).toHaveLength(1);
    });

    it("should show success notification and clear input after adding item", async () => {
        const router = createItemsRouter(fixtureOneItem);
        renderItemsPage(router);

        // Počkáme na vykreslení stránky (loader je async)
        await waitFor(() => {
            expect(
                screen.getByPlaceholderText(/vyhledej nebo přidej položku/i)
            ).toBeInTheDocument();
        });
        const input = screen.getByPlaceholderText(/vyhledej nebo přidej položku/i);
        const addButton = screen.getByRole("button", { name: /přidat položku/i });

        fireEvent.change(input, { target: { value: "sýr" } });
        fireEvent.click(addButton);

        // Zobrazí se úspěšná hláška
        await waitFor(() => {
            expect(screen.getByText("Položka byla úspěšně přidána.")).toBeInTheDocument();
        });

        // Input se vyprázdní (useEffect v ItemSearchAndAdd při actionData?.ok)
        expect(input).toHaveValue("");
    });
});
