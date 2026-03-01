// RTL: render, screen, waitFor (čekání na async), fireEvent (klik, change, focus, keyDown)
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// React Router: router v paměti, Outlet pro vykreslení child route, ActionFunctionArgs = typ parametru akce
import { createMemoryRouter, RouterProvider, Outlet, type ActionFunctionArgs } from "react-router";
// MUI: MealsForm používá TextField, Button, Autocomplete – potřebujeme theme
import { ThemeProvider } from "@mui/material/styles";
// useMealsForm volá enqueueSnackbar při validaci i po odpovědi serveru
import { SnackbarProvider } from "notistack";
// AddMealPage vykresluje MealsForm a bere data z useLoaderData()
import AddMealPage from "../../../routes/AddMealPage";
import theme from "../../../theme";
// Typy pro loader: items (seznam položek pro Autocomplete), categories (pro MultiSelect)
import type { ItemsLoaderData } from "../../../router/loaders/itemsLoader";
import type { CategoriesLoaderData } from "../../../router/loaders/catagoriesLoader";
// vi = mocky (vi.fn()), beforeEach/afterEach = čištění localStorage mezi testy
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Testy MealsForm: validace (prázdný název, prázdné suroviny), loading stav tlačítka,
 * neúspěšné odeslání (hláška + tlačítko znovu aktivní), úspěšné odeslání (hláška + redirect na /meals).
 */

// --- Fixture: data pro loader (MealsForm potřebuje items a categories z useLoaderData) ---

const fixtureItems: ItemsLoaderData = [
    { id: "1", name: "mléko", user_id: "user-1", created_at: "" }, // jedna položka pro Autocomplete („mléko“)
];
const fixtureCategories: CategoriesLoaderData = []; // prázdný seznam kategorií stačí pro MealsForm

/**
 * Vytvoří router s /meals/add (AddMealPage) a /meals (index) – aby navigate("/meals") po úspěchu nespůsobila 404.
 * @param action – mock akce volaná při odeslání formuláře (POST na /meals/add)
 */
function createMealsFormRouter(
    action: (args: ActionFunctionArgs) => Promise<{ ok: boolean; message: string }>
) {
    return createMemoryRouter(
        [
            {
                path: "/meals",
                Component: () => <Outlet />, // layout jen vykresluje child
                children: [
                    {
                        path: "add",
                        Component: AddMealPage,
                        loader: () =>
                            Promise.resolve({
                                items: fixtureItems,
                                categories: fixtureCategories,
                            }),
                        action, // náš mock – volá se při POST (odeslání formuláře)
                    },
                    { index: true, Component: () => <Outlet /> }, // /meals – cílový route po navigate
                ],
            },
        ],
        { initialEntries: ["/meals/add"], initialIndex: 0 } // startujeme na stránce přidání jídla
    );
}

/** Vykreslí stránku s formulářem v MUI theme a notistack (jako v aplikaci). */
function renderMealsForm(router: ReturnType<typeof createMealsFormRouter>) {
    return render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router} /> {/* vykreslí aktuální route (/meals/add) */}
            </SnackbarProvider>
        </ThemeProvider>
    );
}

describe("MealsForm", () => {
    // useMealsForm čte itemsList z localStorage při startu – čistíme před i po každém testu
    beforeEach(() => {
        localStorage.removeItem("itemsList");
    });
    afterEach(() => {
        localStorage.removeItem("itemsList");
    });

    it("should show 'Vyplň název' and not submit when name is empty", async () => {
        const mockAction = vi.fn(); // nesmí se zavolat – validace zastaví odeslání
        const router = createMealsFormRouter(mockAction);
        renderMealsForm(router);

        // Počkáme na vykreslení formuláře (loader je async)
        await waitFor(() => {
            expect(screen.getByPlaceholderText("Název jídla")).toBeInTheDocument();
        });

        const submitBtn = screen.getByRole("button", { name: /uložit jídlo/i });
        fireEvent.click(submitBtn);

        // useMealsForm při prázdném názvu zobrazí snackbar „Vyplň název“ a nevolá fetcher.submit
        await waitFor(() => {
            expect(screen.getByText("Vyplň název")).toBeInTheDocument();
        });
        expect(mockAction).not.toHaveBeenCalled();
    });

    it("should show 'Přidej suroviny' and not submit when itemsList is empty", async () => {
        const mockAction = vi.fn();
        const router = createMealsFormRouter(mockAction);
        renderMealsForm(router);

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Název jídla")).toBeInTheDocument();
        });

        const nameInput = screen.getByPlaceholderText("Název jídla"); // najdeme input podle placeholderu
        fireEvent.change(nameInput, { target: { value: "Snídaně" } }); // vyplníme název, suroviny nepřidáme

        const submitBtn = screen.getByRole("button", { name: /uložit jídlo/i });
        fireEvent.click(submitBtn);

        // Název je vyplněný, ale itemsList je prázdný → validace zobrazí „Přidej suroviny“, akce se nevolá
        await waitFor(() => {
            expect(screen.getByText("Přidej suroviny")).toBeInTheDocument();
        });
        expect(mockAction).not.toHaveBeenCalled(); // validace zabránila odeslání
    });

    it("should disable submit button while submitting", async () => {
        // Promise, kterou resolve až po aserci – akce „visí“, tlačítko zůstane v loading stavu
        let resolveAction: (v: { ok: boolean; message: string }) => void;
        const actionPromise = new Promise<{ ok: boolean; message: string }>((resolve) => {
            resolveAction = resolve;
        });
        const mockAction = vi.fn(() => actionPromise);
        const router = createMealsFormRouter(mockAction);
        renderMealsForm(router);

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Název jídla")).toBeInTheDocument();
        });

        const nameInput = screen.getByPlaceholderText("Název jídla");
        fireEvent.change(nameInput, { target: { value: "Oběd" } }); // simulace zápisu do inputu

        // Autocomplete: focus → ArrowDown otevře dropdown → klik na „mléko“ přidá surovinu
        const autocomplete = screen.getByLabelText(/přidat surovinu/i);
        fireEvent.focus(autocomplete);
        fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "mléko" })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole("option", { name: "mléko" }));

        const submitBtn = screen.getByRole("button", { name: /uložit jídlo/i });
        fireEvent.click(submitBtn);

        // Během odesílání se text tlačítka změní na „Ukládám…“ a tlačítko je disabled
        await waitFor(() => {
            expect(screen.getByRole("button", { name: /ukládám/i })).toBeInTheDocument();
        });
        expect(screen.getByRole("button", { name: /ukládám/i })).toBeDisabled();

        // Uvolníme Promise, aby test skončil bez warningu o neukončeném async
        resolveAction!({ ok: true, message: "Jídlo bylo úspěšně přidáno." });
    });

    it("should show error snackbar and re-enable button when server returns ok: false", async () => {
        // Mock akce vrací ok: false – simulujeme chybu serveru
        const router = createMealsFormRouter(async () => ({
            ok: false,
            message: "Nepodařilo se uložit jídlo.",
        }));
        renderMealsForm(router);

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Název jídla")).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText("Název jídla"), {
            target: { value: "Večeře" },
        });
        fireEvent.focus(screen.getByLabelText(/přidat surovinu/i)); // label MUI Autocomplete
        fireEvent.keyDown(screen.getByLabelText(/přidat surovinu/i), { key: "ArrowDown" }); // otevře seznam
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "mléko" })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole("option", { name: "mléko" })); // přidáme jednu surovinu

        fireEvent.click(screen.getByRole("button", { name: /uložit jídlo/i })); // odešleme formulář

        // useMealsForm zobrazí chybový snackbar s message z odpovědi
        await waitFor(() => {
            expect(screen.getByText("Nepodařilo se uložit jídlo.")).toBeInTheDocument();
        });
        // Tlačítko se vrátí na „Uložit jídlo“ a není disabled
        expect(screen.getByRole("button", { name: /uložit jídlo/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /uložit jídlo/i })).not.toBeDisabled();
        // Při chybě nedochází k redirectu – zůstáváme na /meals/add
        expect(router.state.location.pathname).toBe("/meals/add");
    });

    it("should show success snackbar and navigate to /meals when server returns ok: true", async () => {
        // Mock akce vrací ok: true – simulujeme úspěšné uložení
        const router = createMealsFormRouter(async () => ({
            ok: true,
            message: "Jídlo bylo úspěšně přidáno.",
        }));
        renderMealsForm(router);

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Název jídla")).toBeInTheDocument();
        });

        fireEvent.change(screen.getByPlaceholderText("Název jídla"), {
            target: { value: "Svačina" },
        });
        fireEvent.focus(screen.getByLabelText(/přidat surovinu/i));
        fireEvent.keyDown(screen.getByLabelText(/přidat surovinu/i), { key: "ArrowDown" });
        await waitFor(() => {
            expect(screen.getByRole("option", { name: "mléko" })).toBeInTheDocument();
        });
        fireEvent.click(screen.getByRole("option", { name: "mléko" })); // přidáme surovinu

        fireEvent.click(screen.getByRole("button", { name: /uložit jídlo/i })); // odešleme

        // useMealsForm zobrazí úspěšný snackbar a zavolá navigate("/meals")
        await waitFor(() => {
            expect(screen.getByText("Jídlo bylo úspěšně přidáno.")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(router.state.location.pathname).toBe("/meals"); // redirect po úspěchu
        });
    });
});
