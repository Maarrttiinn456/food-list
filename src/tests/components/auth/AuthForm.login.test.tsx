// React Testing Library: render komponenty do DOM, screen pro hledání, waitFor pro async, fireEvent pro klik/změnu
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// React Router: createMemoryRouter = router v paměti (bez prohlížeče), RouterProvider, redirect pro odpověď akce
import { createMemoryRouter, RouterProvider, redirect } from "react-router";
// MUI: ThemeProvider aby TextField/Button měly styly a kontext
import { ThemeProvider } from "@mui/material/styles";
// Notistack: provider pro notifikace (přihlášení je nepoužívá, ale strom je stejný jako v aplikaci)
import { SnackbarProvider } from "notistack";
// AuthLayout vykresluje Outlet (LoginPage nebo RegisterPage), potřebujeme obě cesty v routeru
import AuthLayout from "../../../layouts/AuthLayout";
// Stránka přihlášení – obsahuje AuthForm s mode="login"
import LoginPage from "../../../routes/LoginPage";
// Registrace je child route pod /auth, router ji musí znát
import RegisterPage from "../../../routes/RegisterPage";
// MUI theme (barvy, typografie) – stejná jako v aplikaci
import theme from "../../../theme";
// Vitest: describe = skupina testů, it = jeden test, expect = aserce
import { describe, it, expect } from "vitest";

/**
 * Testy přihlašovacího formuláře (AuthForm v režimu login).
 * Ověřují validaci prázdných polí, chybu při neplatných údajích a přesměrování po úspěchu.
 */

// --- Mock akce (nahrazují loginAction, aby testy nevolaly Supabase) ---

/** Simuluje úspěšné přihlášení – vrací redirect na / (jako by vrátil loginAction po signInWithPassword). */
async function mockLoginSuccessAction() {
    return redirect("/");
}

/** Vrací validační chyby při prázdných polích – stejné klíče a texty jako loginAction. */
async function mockLoginValidationErrorsAction() {
    return {
        email: "Vyplňte prosím email",
        password: "Vyplňte prosím heslo",
    };
}

/** Simuluje chybu od serveru při špatném e-mailu/hesle – serverError může mít libovolný text od Supabase. */
async function mockLoginInvalidCredentialsAction() {
    return { serverError: "Invalid login credentials." };
}

/**
 * Vytvoří paměťový router s cestou /auth (přihlášení).
 * @param action – akce volaná při POST na /auth?index (výchozí = úspěšný redirect na /)
 */
function createLoginRouter(
    action: () => Promise<Response | Record<string, string>> = mockLoginSuccessAction
) {
    return createMemoryRouter(
        [
            {
                path: "/auth",
                Component: AuthLayout,
                children: [
                    // index = true → route /auth, formulář odesílá na /auth?index, tato akce se zavolá
                    { index: true, Component: LoginPage, action },
                    // child route /auth/register – bez akce, jen aby router znal cestu
                    { path: "register", Component: RegisterPage },
                ],
            },
        ],
        // Začneme na /auth (stránka přihlášení)
        { initialEntries: ["/auth"], initialIndex: 0 }
    );
}

/** Vykreslí stránku přihlášení obalenou MUI theme, notistack a routerem – stejný strom jako v aplikaci. */
function renderLoginPage(router: ReturnType<typeof createLoginRouter>) {
    return render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

// --- Testy ---

describe("AuthForm – Přihlášení", () => {
    it("should show validation errors under inputs when form is submitted empty", async () => {
        // Router s akcí vracející chyby e-mail a heslo (jako loginAction při prázdných polích)
        const router = createLoginRouter(mockLoginValidationErrorsAction);
        renderLoginPage(router);

        // Najdeme tlačítko podle textu, odešleme formulář bez vyplnění
        const submitButton = screen.getByRole("button", { name: /přihlásit se/i });
        fireEvent.click(submitButton);

        // Po odeslání fetcher dostane errors a AuthForm zobrazí helperText – ověříme oba texty
        await waitFor(() => {
            expect(screen.getByText("Vyplňte prosím email")).toBeInTheDocument();
            expect(screen.getByText("Vyplňte prosím heslo")).toBeInTheDocument();
        });
    });

    it("should show alert with error when credentials are invalid", async () => {
        // Router s akcí vracející serverError (jako Supabase při špatném e-mailu/hesle)
        const router = createLoginRouter(mockLoginInvalidCredentialsAction);
        renderLoginPage(router);

        // Vyplníme libovolné údaje a odešleme – mock vrátí serverError
        const emailInput = screen.getByLabelText(/e-mail/i);
        const hesloInput = screen.getByLabelText(/heslo/i);
        const submitButton = screen.getByRole("button", { name: /přihlásit se/i });
        fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
        fireEvent.change(hesloInput, { target: { value: "wrongpass" } });
        fireEvent.click(submitButton);

        // Kontrolujeme jen to, že se na stránce objeví Alert a že v něm je nějaký text (přesnou zprávu od Supabase neověřujeme)
        await waitFor(() => {
            const alert = screen.getByRole("alert");
            expect(alert).toBeInTheDocument();
            expect(alert.textContent?.trim()).toBeTruthy();
        });
    });

    it("should redirect to / after successful login", async () => {
        // Router s výchozí akcí vracející redirect("/")
        const router = createLoginRouter();
        renderLoginPage(router);

        // Vyplníme formulář a odešleme – mock akce vrátí redirect
        const emailInput = screen.getByLabelText(/e-mail/i);
        const hesloInput = screen.getByLabelText(/heslo/i);
        const submitButton = screen.getByRole("button", { name: /přihlásit se/i });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(hesloInput, { target: { value: "heslo123" } });
        fireEvent.click(submitButton);

        // Po zpracování redirectu má router pathname /
        await waitFor(() => {
            expect(router.state.location.pathname).toBe("/");
        });
    });
});
