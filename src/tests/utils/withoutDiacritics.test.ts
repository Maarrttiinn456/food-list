import { describe, it, expect } from "vitest";
import { withoutDiacritics } from "../../utils/withoutDiacritics";

describe("withoutDiacritics", () => {
    it("should return the string without diacritics", () => {
        expect(withoutDiacritics("Česká země")).toBe("Ceska zeme");
    });
});
