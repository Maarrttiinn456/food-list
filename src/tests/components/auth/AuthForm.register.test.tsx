// React Testing Library: render komponenty, hledání v DOM, čekání na změny, simulace událostí
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// React Router: paměťový router pro testy, provider, redirect odpověď
import { createMemoryRouter, RouterProvider, redirect } from "react-router";
// MUI: aby komponenty (TextField, Button…) měly styly a kontext
import { ThemeProvider } from "@mui/material/styles";
// Notistack: kontext pro zobrazení notifikací po registraci
import { SnackbarProvider } from "notistack";
// Layout a stránky, které testujeme
import AuthLayout from "../../../layouts/AuthLayout";
import LoginPage from "../../../routes/LoginPage";
import RegisterPage from "../../../routes/RegisterPage";
import theme from "../../../theme";
import { describe, it, expect } from "vitest";

/**
 * První test registrace: po úspěšné registraci přesměrování na /auth a notifikace.
 *
 * PROČ tento test píšeme:
 * - Ověříme, že celý flow „vyplním formulář → odešlu → server vrátí úspěch →
 *   přesměruje na /auth a zobrazí se hláška“ funguje z pohledu UI.
 *
 * CO test dělá:
 * - Nastaví router s mock akcí (místo skutečné registrace jen vrátí redirect).
 * - Vykreslí stránku registrace v reálných providerech (MUI, notistack, router).
 * - Simuluje vyplnění formuláře a odeslání.
 * - Čeká na přesměrování a na zobrazení success notifikace.
 *
 * JAK to funguje:
 * - createMemoryRouter = router jen v paměti (bez URL v prohlížeči), vhodný pro testy.
 * - Mock akce vrací redirect("/auth?register=success") = simuluje úspěšnou odpověď serveru.
 * - Po redirectu se vykreslí LoginPage; useAuthForm v ní vidí ?register=success
 *   a v useEffect zavolá enqueueSnackbar → notifikace se zobrazí.
 */

// --- Mock akce (nahrazují skutečný registerAction, aby testy nevolaly Supabase) ---

/** Vrací redirect na /auth?register=success – simuluje úspěšnou registraci na serveru. */
async function mockRegisterSuccessAction() {
    return redirect("/auth?register=success");
}

/** Vrací objekt validačních chyb – stejné texty jako registerAction při prázdných polích. */
async function mockRegisterValidationErrorsAction() {
    return {
        fullname: "Jméno je povinné",
        email: "Email je povinný",
        password: "Heslo je povinné",
    };
}

/** Simuluje odpověď serveru při chybě (např. krátké heslo) – text může být od Supabase, nespecifikujeme. */
async function mockRegisterShortPasswordErrorAction() {
    return { serverError: "Password should be at least 6 characters." };
}

/** Simuluje odpověď serveru při existujícím e-mailu – text může být od Supabase, nespecifikujeme. */
async function mockRegisterUserExistsErrorAction() {
    return { serverError: "User already registered." };
}

/**
 * Vytvoří paměťový router s cestami /auth a /auth/register.
 * @param action – akce volaná při POST na /auth/register (výchozí = úspěšný redirect)
 */
function createRegisterRouter(
    action: () => Promise<Response | Record<string, string>> = mockRegisterSuccessAction
) {
    return createMemoryRouter(
        [
            {
                path: "/auth",
                Component: AuthLayout,
                children: [
                    { index: true, Component: LoginPage },
                    {
                        path: "register",
                        Component: RegisterPage,
                        action,
                    },
                ],
            },
        ],
        { initialEntries: ["/auth/register"], initialIndex: 0 }
    );
}

/** Vykreslí stránku registrace s MUI, notistack a routerem – použití ve všech testech. */
function renderRegisterPage(router: ReturnType<typeof createRegisterRouter>) {
    return render(
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <RouterProvider router={router} />
            </SnackbarProvider>
        </ThemeProvider>
    );
}

// --- Testy ---

describe("AuthForm – Registrace", () => {
    it("should redirect to /auth and show success notification after successful registration", async () => {
        // Router s akcí, která vrací redirect (žádné volání Supabase)
        const router = createRegisterRouter();
        renderRegisterPage(router);

        // Najdeme inputy podle labelů (MUI spojí label s inputem přes for/id)
        const jmenoInput = screen.getByLabelText(/jméno/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const hesloInput = screen.getByLabelText(/heslo/i);
        const submitButton = screen.getByRole("button", { name: /vytvořit účet/i });

        // Simulace vyplnění – fireEvent.change nastaví value a vyvolá re-render
        fireEvent.change(jmenoInput, { target: { value: "Test User" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(hesloInput, { target: { value: "heslo123" } });

        // Odeslání formuláře – fetcher pošle POST, router zavolá mock akci
        fireEvent.click(submitButton);

        // Ověření: router po zpracování redirectu změní pathname na /auth
        await waitFor(() => {
            expect(router.state.location.pathname).toBe("/auth");
        });

        // Ověření: na /auth?register=success useAuthForm zobrazí notifikaci notistackem
        await waitFor(() => {
            expect(screen.getByText("Uživatel byl úspěšně registrován")).toBeInTheDocument();
        });
    });

    it("should show validation errors under inputs when form is submitted empty", async () => {
        // Router s akcí vracející chyby (jako by je vrátil server při prázdných polích)
        const router = createRegisterRouter(mockRegisterValidationErrorsAction);
        renderRegisterPage(router);

        // Odeslání bez vyplnění – fetcher pošle prázdná data, mock akce vrátí chyby
        const submitButton = screen.getByRole("button", { name: /vytvořit účet/i });
        fireEvent.click(submitButton);

        // AuthForm zobrazí errors v helperText u každého pole – ověříme všechny tři texty
        await waitFor(() => {
            expect(screen.getByText("Jméno je povinné")).toBeInTheDocument();
            expect(screen.getByText("Email je povinný")).toBeInTheDocument();
            expect(screen.getByText("Heslo je povinné")).toBeInTheDocument();
        });
    });

    it("should show server error when password is shorter than 6 characters", async () => {
        // Router s akcí vracející chybu typu „heslo příliš krátké“ (jako Supabase Auth)
        const router = createRegisterRouter(mockRegisterShortPasswordErrorAction);
        renderRegisterPage(router);

        const jmenoInput = screen.getByLabelText(/jméno/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const hesloInput = screen.getByLabelText(/heslo/i);
        const submitButton = screen.getByRole("button", { name: /vytvořit účet/i });

        // Vyplníme formulář, heslo má méně než 6 znaků
        fireEvent.change(jmenoInput, { target: { value: "Test User" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(hesloInput, { target: { value: "12345" } });
        fireEvent.click(submitButton);

        // AuthForm zobrazí serverError v Alertu – kontrolujeme jen, že se Alert s nějakým textem objeví (text je od Supabase)
        await waitFor(() => {
            const alert = screen.getByRole("alert");
            expect(alert).toBeInTheDocument();
            expect(alert.textContent?.trim().length).toBeGreaterThan(0);
        });
    });

    it("should show server error when user with email already exists", async () => {
        // Router s akcí vracející chybu „uživatel již existuje“ (jako Supabase při duplicitním e-mailu)
        const router = createRegisterRouter(mockRegisterUserExistsErrorAction);
        renderRegisterPage(router);

        const jmenoInput = screen.getByLabelText(/jméno/i);
        const emailInput = screen.getByLabelText(/e-mail/i);
        const hesloInput = screen.getByLabelText(/heslo/i);
        const submitButton = screen.getByRole("button", { name: /vytvořit účet/i });

        // Vyplníme platná data – server ale „vrátí“, že e-mail už je obsazen
        fireEvent.change(jmenoInput, { target: { value: "Test User" } });
        fireEvent.change(emailInput, { target: { value: "existing@example.com" } });
        fireEvent.change(hesloInput, { target: { value: "heslo123" } });
        fireEvent.click(submitButton);

        // AuthForm zobrazí serverError v Alertu – kontrolujeme jen, že se Alert s nějakým textem objeví (text je od Supabase)
        await waitFor(() => {
            const alert = screen.getByRole("alert");
            expect(alert).toBeInTheDocument();
            expect(alert.textContent?.trim().length).toBeGreaterThan(0);
        });
    });
});
