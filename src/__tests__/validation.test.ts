import {
    validateDeposit,
    validateIncome,
    validatePropertyPrice,
    validateInterestRate,
    validateMortgageTerm
} from '../utils/validation';

describe('validateDeposit', () => {

    test("should return error message when deposit is non-int", () => {
        const deposit = "e";
        const result = validateDeposit(deposit);
        expect(result).toBe("Error: Please enter a number for the deposit");
    });

    test("should return error message when deposit is negative", () => {
        const deposit = -5000;
        const result = validateDeposit(deposit);
        expect(result).toBe("Error: Please ensure the deposit is greater than 0");
    });

    test("should return error message when deposit is zero", () => {
        const deposit = 0;
        const result = validateDeposit(deposit);
        expect(result).toBe("Error: Please ensure the deposit is greater than 0");
    });

    test("should return null when deposit is valid", () => {
        const deposit = 25000;
        const result = validateDeposit(deposit);
        expect(result).toBe(null);
    });

});

describe('validateIncome', () => {

    test("should return error message when income is non-int", () => {
        const income = "abc";
        const result = validateIncome(income);
        expect(result).toBe("Error: Please enter a number for the income");
    });

    test("should return error message when income is negative", () => {
        const income = -50000;
        const result = validateIncome(income);
        expect(result).toBe("Error: Please ensure income is greater than 0");
    });

    test("should return error message when income is zero", () => {
        const income = 0;
        const result = validateIncome(income);
        expect(result).toBe("Error: Please ensure income is greater than 0");
    });

    test("should return null when income is valid", () => {
        const income = 50000;
        const result = validateIncome(income);
        expect(result).toBe(null);
    });

});

describe('validatePropertyPrice', () => {

    test("should return error message when property price is non-int", () => {
        const deposit = 50000;
        const propertyPrice = "xyz";
        const result = validatePropertyPrice(deposit, propertyPrice);
        expect(result).toBe("Error: Please enter a number for the house price");
    });

    test("should return error message when property price is negative", () => {
        const deposit = 50000;
        const propertyPrice = -250000;
        const result = validatePropertyPrice(deposit, propertyPrice);
        expect(result).toBe("Error: Please ensure property price is greater than 0");
    });

    test("should return error message when property price is zero", () => {
        const deposit = 50000;
        const propertyPrice = 0;
        const result = validatePropertyPrice(deposit, propertyPrice);
        expect(result).toBe("Error: Please ensure property price is greater than 0");
    });

    test("should return error message when property price is less than deposit", () => {
        const deposit = 50000;
        const propertyPrice = 30000;
        const result = validatePropertyPrice(deposit, propertyPrice);
        expect(result).toBe("Error: Please ensure property price is greater than the deposit");
    });

    test("should return null when property price is valid", () => {
        const deposit = 50000;
        const propertyPrice = 250000;
        const result = validatePropertyPrice(deposit, propertyPrice);
        expect(result).toBe(null);
    });

});

describe('validateInterestRate', () => {

    test("should return error message when interest rate is non-numeric", () => {
        const interestRate = "abc";
        const result = validateInterestRate(interestRate);
        expect(result).toBe("Error: Please enter a number for the interest rate");
    });

    test("should return error message when interest rate is negative", () => {
        const interestRate = -5;
        const result = validateInterestRate(interestRate);
        expect(result).toBe("Error: Please ensure interest rate is greater than 0");
    });

    test("should return error message when interest rate is zero", () => {
        const interestRate = 0;
        const result = validateInterestRate(interestRate);
        expect(result).toBe("Error: Please ensure interest rate is greater than 0");
    });

    test("should return null when interest rate is valid", () => {
        const interestRate = 5.5;
        const result = validateInterestRate(interestRate);
        expect(result).toBe(null);
    });

});

describe('validateMortgageTerm', () => {

    test("should return error message when mortgage term is non-numeric", () => {
        const mortgageTerm = "abc";
        const result = validateMortgageTerm(mortgageTerm);
        expect(result).toBe("Error: Please enter a number for the mortgage term");
    });

    test("should return error message when mortgage term is negative", () => {
        const mortgageTerm = -25;
        const result = validateMortgageTerm(mortgageTerm);
        expect(result).toBe("Error: Please ensure mortgage term is greater than 0");
    });

    test("should return error message when mortgage term is zero", () => {
        const mortgageTerm = 0;
        const result = validateMortgageTerm(mortgageTerm);
        expect(result).toBe("Error: Please ensure mortgage term is greater than 0");
    });

    test("should return error message when mortgage term is greater than 40 years", () => {
        const mortgageTerm = 45;
        const result = validateMortgageTerm(mortgageTerm);
        expect(result).toBe("Error: Please ensure mortgage term is 40 years or less");
    });

    test("should return null when mortgage term is valid", () => {
        const mortgageTerm = 25;
        const result = validateMortgageTerm(mortgageTerm);
        expect(result).toBe(null);
    });

});