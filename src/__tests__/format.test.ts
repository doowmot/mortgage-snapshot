import { formatCurrency } from '../utils/format';

describe('formatCurrency', () => {

    test("should format positive numbers as GBP currency without decimals", () => {
        const amount = 250000;
        const result = formatCurrency(amount);
        expect(result).toBe("£250,000");
    });

    test("should format zero as GBP currency", () => {
        const amount = 0;
        const result = formatCurrency(amount);
        expect(result).toBe("£0");
    });

    test("should format small amounts correctly", () => {
        const amount = 50;
        const result = formatCurrency(amount);
        expect(result).toBe("£50");
    });

    test("should format large amounts with proper comma separation", () => {
        const amount = 1000000;
        const result = formatCurrency(amount);
        expect(result).toBe("£1,000,000");
    });

    test("should round decimal amounts to whole numbers", () => {
        const amount = 250000.99;
        const result = formatCurrency(amount);
        expect(result).toBe("£250,001");
    });

});