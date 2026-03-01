/// <reference types="node" />
import { test, expect } from "@playwright/test";

/**
 * E2E test: průchod registrací a přihlášením.
 *
 * Cleanup: Po testu se smažou testovací uživatelé (email *@test.example.com).
 * Playwright načítá .env – v .env přidej SUPABASE_SERVICE_ROLE_KEY (Supabase Dashboard → API → service_role).
 * VITE_SUPABASE_URL už v .env máš.
 */
// Unikátní email pro každý běh
const TEST_USER_EMAIL = `e2e-auth-${Date.now()}@test.example.com`;
const TEST_USER_PASSWORD = "e2eTestPassword123";
const TEST_USER_FULLNAME = "E2E Test User";

/** E-maily uživatelů vytvořených v průběhu testů (pro cleanup). */
const emailsToDelete: string[] = [];

const TEST_USER_EMAIL_DOMAIN = "test.example.com";

async function getSupabaseAdmin() {
    const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) return null;
    const { createClient } = await import("@supabase/supabase-js");
    return createClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
    });
}

async function deleteTestUser(email: string): Promise<void> {
    const supabase = await getSupabaseAdmin();
    if (!supabase) {
        console.warn(
            "Cleanup přeskočen: nastavte VITE_SUPABASE_URL a SUPABASE_SERVICE_ROLE_KEY v .env pro mazání testovacího uživatele."
        );
        return;
    }
    try {
        const {
            data: { users },
        } = await supabase.auth.admin.listUsers({ perPage: 1000 });
        const user = users?.find((u) => u.email === email);
        if (user) {
            await supabase.auth.admin.deleteUser(user.id);
        }
    } catch (e) {
        console.warn("Cleanup uživatele selhal:", e);
    }
}

/** Smaže všechny uživatele s emailem *@test.example.com (testovací účty). */
async function deleteAllTestUsers(): Promise<void> {
    const supabase = await getSupabaseAdmin();
    if (!supabase) return;
    try {
        const {
            data: { users },
        } = await supabase.auth.admin.listUsers({ perPage: 1000 });
        const testUsers =
            users?.filter((u) => u.email?.endsWith(`@${TEST_USER_EMAIL_DOMAIN}`)) ?? [];
        for (const user of testUsers) {
            if (user.id) await supabase.auth.admin.deleteUser(user.id);
        }
    } catch (e) {
        console.warn("Cleanup testovacích uživatelů selhal:", e);
    }
}

test.describe("Auth flow", () => {
    test.describe.configure({ mode: "serial" });

    test.afterEach(async () => {
        for (const email of emailsToDelete) {
            await deleteTestUser(email);
        }
        emailsToDelete.length = 0;
    });

    test.afterAll(async () => {
        await deleteAllTestUsers();
    });

    test("1) Po načtení / jsem přesměrován na /auth když nejsem přihlášen", async ({ page }) => {
        await page.goto("/");
        await expect(page).toHaveURL(/\/auth/);
    });

    test("2) Registrace: od odkazů po úspěšnou registraci včetně validací", async ({ page }) => {
        await page.goto("/auth");

        // Odkaz „Registrujte se“ → registrační formulář
        await page.getByRole("link", { name: /registrujte se/i }).click();
        await expect(page).toHaveURL(/\/auth\/register/);

        // Prázdný formulář – odeslání nepustí (zůstaneme na /auth/register, chyby ve stránce)
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page).toHaveURL(/\/auth\/register/);
        await expect(page.getByText("Jméno je povinné")).toBeVisible();
        await expect(page.getByText("Heslo je povinné")).toBeVisible();
        await expect(page.getByText("Email je povinný")).toBeVisible();

        // Heslo kratší než 6 znaků → chybová hláška (Supabase vrací chybu)
        await page.getByLabel(/jméno/i).fill(TEST_USER_FULLNAME);
        await page.getByLabel(/e-mail/i).fill(TEST_USER_EMAIL);
        await page.getByLabel(/heslo/i).fill("12345");
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page.getByRole("alert")).toContainText(/heslo|password|znak|character/i);

        // Úspěšná registrace → přesměrování na /auth a notifikace o úspěchu
        await page.getByLabel(/heslo/i).fill(TEST_USER_PASSWORD);
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page).toHaveURL(/\/auth(?:\?|$)/, { timeout: 15000 });
        await expect(page.getByText("Uživatel byl úspěšně registrován").first()).toBeVisible({
            timeout: 5000,
        });
        emailsToDelete.push(TEST_USER_EMAIL);
    });

    test("2b) Registrace: již registrovaný email zobrazí upozornění", async ({ page }) => {
        const email2b = `e2e-2b-${Date.now()}@test.example.com`;
        await page.goto("/auth/register");
        await page.getByLabel(/jméno/i).fill(TEST_USER_FULLNAME);
        await page.getByLabel(/e-mail/i).fill(email2b);
        await page.getByLabel(/heslo/i).fill(TEST_USER_PASSWORD);
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page).toHaveURL(/\/auth(?:\?|$)/, { timeout: 15000 });
        await expect(page.getByText("Uživatel byl úspěšně registrován").first()).toBeVisible({
            timeout: 5000,
        });
        emailsToDelete.push(email2b);

        // Druhý pokus o registraci se stejným emailem → chyba
        await page.goto("/auth/register");
        await page.getByLabel(/jméno/i).fill("Jiné jméno");
        await page.getByLabel(/e-mail/i).fill(email2b);
        await page.getByLabel(/heslo/i).fill(TEST_USER_PASSWORD);
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page.getByRole("alert")).toBeVisible();
    });

    test("3) Login: validace polí a špatné/správné údaje", async ({ page }) => {
        // Unikátní uživatel pro tento test (nezávisí na cleanupu po testu 2)
        const email3 = `e2e-auth-3-${Date.now()}@test.example.com`;
        await page.goto("/auth/register");
        await page.getByLabel(/jméno/i).fill(TEST_USER_FULLNAME);
        await page.getByLabel(/e-mail/i).fill(email3);
        await page.getByLabel(/heslo/i).fill(TEST_USER_PASSWORD);
        await page.getByRole("button", { name: /vytvořit účet/i }).click();
        await expect(page.getByText("Uživatel byl úspěšně registrován").first()).toBeVisible({
            timeout: 5000,
        });
        emailsToDelete.push(email3);

        await page.goto("/auth");

        // Prázdná pole – upozornění
        await page.getByRole("button", { name: /přihlásit se/i }).click();
        await expect(page).toHaveURL(/\/auth/);
        await expect(page.getByText(/vyplňte prosím (email|heslo)/i).first()).toBeVisible();

        // Špatné údaje → alert
        await page.getByLabel(/e-mail/i).fill("spatny@example.com");
        await page.getByLabel(/heslo/i).fill("spatneheslo");
        await page.getByRole("button", { name: /přihlásit se/i }).click();
        await expect(page.getByRole("alert")).toBeVisible();

        // Správné údaje → přesměrování na /
        await page.getByLabel(/e-mail/i).fill(email3);
        await page.getByLabel(/heslo/i).fill(TEST_USER_PASSWORD);
        await page.getByRole("button", { name: /přihlásit se/i }).click();
        await expect(page).toHaveURL(/\/$/);
    });
});
