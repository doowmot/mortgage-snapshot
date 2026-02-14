import { 
    calculateBorrowingAvailable,
    calculateMonthlyPayment, 
    calculateTotalPayment,
    calculateMonthlyInterestRate,
    calculatePaymentMonths,
    calculateBorrowingRequired,
    calculateTotalInterest,
    calculateMortgageResults
    } from '../utils/mortgageCalculations';

describe('Mortgage Calculations', () => {

  test("calculateBorrowingAvailable should multiply income by 4", () => {
    const income = 50000;
    const result = calculateBorrowingAvailable(income);
    expect(result).toBe(200000);
  });

  test("calculateBorrowingAvailable with zero income returns zero", () => {
    const income = 0;
    const result = calculateBorrowingAvailable(income);
    expect(result).toBe(0);
  });

  test("calculateBorrowingRequired should be zero if deposit equals house price", () => {
    const housePrice = 250000;
    const deposit = 250000;
    const result = calculateBorrowingRequired(housePrice, deposit);
    expect(result).toBe(0);
  });

  test("calculateMonthlyPayment should calculate correct monthly payment", () => {
    const loanAmount = 200000;
    const monthlyRate = 0.004167;
    const paymentMonths = 360;
    const result = calculateMonthlyPayment(loanAmount, monthlyRate, paymentMonths);
    expect(result).toBe(1074);
  });

  test("calculateTotalPayment should multiply monthly payment by number of months", () => {
    const monthlyPayment = 1074;
    const paymentMonths = 360;
    const result = calculateTotalPayment(monthlyPayment, paymentMonths);
    expect(result).toBe(386640);
  });

  test("calculateTotalInterest should subtract loan amount from total payment", () => {
    const totalPayment = 386640;
    const loanAmount = 200000;
    const result = calculateTotalInterest(totalPayment, loanAmount);
    expect(result).toBe(186640);
  });

  test("calculateMonthlyInterestRate should convert annual rate to monthly decimal", () => {
    const annualRate = 5;
    const result = calculateMonthlyInterestRate(annualRate);
    expect(result).toBeCloseTo(0.004167, 5);
  });
  
  test("calculatePaymentMonths should convert years to months", () => {
    const mortgageYears = 30;
    const result = calculatePaymentMonths(mortgageYears);
    expect(result).toBe(360);
  });
  
  test("calculateBorrowingRequired should subtract deposit from house price", () => {
    const housePrice = 250000;
    const deposit = 50000;
    const result = calculateBorrowingRequired(housePrice, deposit);
    expect(result).toBe(200000);
  });

  test("calculateMortgageResults should return correct mortgage details", () => {
    const result = calculateMortgageResults(200000, 5, 25);
    
    expect(result.monthlyPayment).toBe(1169);
    expect(result.totalPayment).toBe(350700);
    expect(result.totalInterest).toBe(150700);
    expect(result.totalCapital).toBe(200000);
    expect(result.stressTestMonthlyPayment).toBe(1544);
    expect(result.yearlyAmortisationSchedule).toHaveLength(26); 
  });

});