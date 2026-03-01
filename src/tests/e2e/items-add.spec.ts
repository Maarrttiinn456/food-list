/// <reference types="node" />
import { test, expect } from "@playwright/test";

/**
 * E2E test: přidávání položky do katalogu (ItemsList).
 * Vyžaduje přihlášeného uživatele – v každém testu se vytvoří uživatel / přihlásí a jde na /items.
 * Cleanup: Po testech se smaže testovací uživatel (VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY v .env).
 */
const ITEMS_TEST_EMAIL = `e2e-items-${Date.now()}@test.example.com`;
const ITEMS_TEST_PASSWORD = "e2eItemsPassword123";
const ITEMS_TEST_FULLNAME = "E2E Items User";
const TEST_ITEM_NAME = "E2E test položka";

async function registerAndLogin(page: import("@playwright/test").Page) {
    await page.goto("/auth/register");
    await page.getByLabel(/jméno/i).fill(ITEMS_TEST_FULLNAME);
    await page.getByLabel(/e-mail/i).fill(ITEMS_TEST_EMAIL);
    await page.getByLabel(/heslo/i).fill(ITEMS_TEST_PASSWORD);
    await page.getByRole("button", { name: /vytvořit účet/i }).click();
    await expect(page).toHaveURL(/\/auth(?:\?|$)/, { timeout: 15000 });
    await expect(page.getByText("Uživatel byl úspěšně registrován").first()).toBeVisible({
        timeout: 5000,
    });

    await page.goto("/auth");
    await page.getByLabel(/e-mail/i).fill(ITEMS_TEST_EMAIL);
    await page.getByLabel(/heslo/i).fill(ITEMS_TEST_PASSWORD);
    await page.getByRole("button", { name: /přihlásit se/i }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 10000 });
}

async function login(page: import("@playwright/test").Page) {
    await page.goto("/auth");
    await page.getByLabel(/e-mail/i).fill(ITEMS_TEST_EMAIL);
    await page.getByLabel(/heslo/i).fill(ITEMS_TEST_PASSWORD);
    await page.getByRole("button", { name: /přihlásit se/i }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 10000 });
}

/** Počet položek v ItemsList (počet tlačítek „smazat“ = počet řádků). */
function getItemsCount(page: import("@playwright/test").Page) {
    return page.getByRole("button", { name: /smazat/i }).count();
}

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
            "Items cleanup přeskočen: nastavte VITE_SUPABASE_URL a SUPABASE_SERVICE_ROLE_KEY v .env."
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
        console.warn("Cleanup uživatele (items) selhal:", e);
    }
}

test.describe("Přidání položky do katalogu", () => {
    test.describe.configure({ mode: "serial" });

    test.afterAll(async () => {
        await deleteTestUser(ITEMS_TEST_EMAIL);
    });

    test("1) Po příchodu na stránku nejde odešlat prázdný input", async ({ page }) => {
        await registerAndLogin(page);
        await page.goto("/items");

        const input = page.getByPlaceholder(/vyhledej nebo přidej položku/i);
        const addButton = page.getByRole("button", { name: /přidat položku/i });

        await expect(input).toBeVisible();
        await expect(addButton).toBeDisabled();
    });

    test("2) Vyplněná položka a odeslání → success alert a seznam se rozroste o jednu položku", async ({
        page,
    }) => {
        await login(page);
        await page.goto("/items");
        await expect(page.getByText("Katalog položek")).toBeVisible({ timeout: 10000 });

        const initialCount = await getItemsCount(page);

        await page.getByPlaceholder(/vyhledej nebo přidej položku/i).fill(TEST_ITEM_NAME);
        await page.getByRole("button", { name: /přidat položku/i }).click();

        const alert = page.getByRole("alert");
        await expect(alert).toBeVisible({ timeout: 10000 });
        await expect(alert).toContainText("Položka byla úspěšně přidána.");

        await expect(page.getByText(TEST_ITEM_NAME, { exact: true })).toBeVisible({
            timeout: 15000,
        });
        const countAfter = await getItemsCount(page);
        expect(countAfter).toBe(initialCount + 1);

        const input = page.getByPlaceholder(/vyhledej nebo přidej položku/i);
        await expect(input).toHaveValue("");
    });

    test("3) Při selhání přidání (duplicita) → error alert a počet položek se nezmění", async ({
        page,
    }) => {
        await login(page);
        await page.goto("/items");

        await expect(page.getByText(TEST_ITEM_NAME, { exact: true })).toBeVisible({
            timeout: 5000,
        });
        const countBefore = await getItemsCount(page);

        await page.getByPlaceholder(/vyhledej nebo přidej položku/i).fill(TEST_ITEM_NAME);
        await page.getByRole("button", { name: /přidat položku/i }).click();

        await expect(
            page.getByRole("alert").filter({ hasText: "Tato položka již v seznamu existuje." })
        ).toBeVisible({ timeout: 10000 });

        const countAfter = await getItemsCount(page);
        expect(countAfter).toBe(countBefore);
    });
});
