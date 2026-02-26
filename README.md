# FoodList

**FoodList** je webová aplikace pro evidenci jídel, položek a nákupních seznamů. Umožňuje přihlášeným uživatelům spravovat jídelníčky, přidávat položky do evidence a pracovat s nákupními seznamy.

## Živá verze

Aplikace je nasazená na:

**https://food-app-cz.netlify.app/auth**

(Pro přístup k aplikaci se přihlaste nebo zaregistrujte.)

## Technologie

- **React 19** + **TypeScript**
- **Vite** – sestavení a vývoj
- **React Router 7** – routování a loadery/akce
- **Material UI (MUI)** – komponenty a vzhled
- **Supabase** – backend, autentizace a databáze
- **Netlify** – hostování

## Lokální spuštění

1. Naklonujte repozitář a nainstalujte závislosti:

    ```bash
    npm install
    ```

2. Spusťte vývojový server:

    ```bash
    npm run dev
    ```

3. Aplikace poběží na adrese zobrazené v terminálu (obvykle `http://localhost:5173`).

## Skripty

| Příkaz            | Popis                    |
| ----------------- | ------------------------ |
| `npm run dev`     | Spustí vývojový server   |
| `npm run build`   | Sestaví produkční verzi  |
| `npm run preview` | Náhled produkční sestavy |
| `npm run lint`    | Spustí ESLint            |
| `npm run tsc`     | Kontrola TypeScriptu     |

## Licence

Soukromý projekt.
