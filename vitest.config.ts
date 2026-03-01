import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/tests/setupTests.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}", "tests/**/*.{test,spec}.{ts,tsx}"],
        exclude: ["**/node_modules/**", "**/e2e/**", "**/src/tests/e2e/**"],
    },
});
