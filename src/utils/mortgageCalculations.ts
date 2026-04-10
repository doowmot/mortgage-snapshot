export interface AmortisationRow {
  year: number;
  interest: number;
  capital: number;
  balance: number;
  cumulativeInterest: number;
  cumulativeCapital: number;
}

export interface AffordabilityResults {
  borrowingAvailable: number;
  totalBudget: number;
}

export interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  totalCapital: number;
  stressTestMonthlyPayment: number;
  mortgageTerm: number;
  yearlyAmortisationSchedule: AmortisationRow[];
}

export const calculateBorrowingAvailable = (income: number): number => {
    return income * 4;
}

export const calculateMonthlyInterestRate = (annualRate: number): number => {
    return (annualRate / 100) / 12;
}

export const calculatePaymentMonths = (mortgageYears: number): number => {
    return (mortgageYears * 12);
}

export const calculateBorrowingRequired = (housePrice: number, deposit: number): number => {
    return (housePrice - deposit);
}

export const calculateMonthlyPayment = (loanAmount: number, monthlyRate: number, paymentMonths: number): number => {
    return (Math.round(loanAmount * monthlyRate * (Math.pow(1+monthlyRate, paymentMonths)) / (Math.pow(1+monthlyRate, paymentMonths) -1)));
}

export const calculateTotalPayment = (monthlyPayment: number, paymentMonths: number): number => {
    return (monthlyPayment * paymentMonths);
}

export const calculateTotalInterest = (totalPayment: number, loanAmount: number): number => {
    return (totalPayment - loanAmount);
}

export const calculateStressTestAnnualInterestRate = (annualRate: number): number => {
    return (parseFloat(annualRate.toString()) + 3);
}

export const calculateYearlyAmortisationSchedule = (loanAmount: number, paymentMonths: number, monthlyRate: number, monthlyPayment: number): AmortisationRow[] => {
    const yearlyAmortisationSchedule: AmortisationRow[] = [];
    let currentBalance: number = loanAmount;
    let annualInterestPaid: number = 0;
    let annualCapitalPaid: number = 0;
    let cumulativeInterestPaid: number = 0;
    let cumulativeCapitalPaid: number = 0;

    yearlyAmortisationSchedule.push({year: 0, interest: 0, capital: 0, balance: currentBalance, cumulativeInterest: cumulativeInterestPaid, cumulativeCapital: cumulativeCapitalPaid,});

    for (let month = 1; month <= paymentMonths; month++) {
      const monthlyInterest: number = currentBalance * monthlyRate;
      let monthlyCapital: number;
      
      if (month === paymentMonths) {
        monthlyCapital = currentBalance;
      } else {
        monthlyCapital = monthlyPayment - monthlyInterest;
      }
      
      currentBalance -= monthlyCapital;
      annualInterestPaid += monthlyInterest;
      annualCapitalPaid += monthlyCapital;

      if (month % 12 === 0) {
        const year: number = month / 12;

        cumulativeInterestPaid += annualInterestPaid;
        cumulativeCapitalPaid += annualCapitalPaid;

        yearlyAmortisationSchedule.push({
          year: year, 
          interest: annualInterestPaid, 
          capital: annualCapitalPaid, 
          balance: Math.max(0, currentBalance),
          cumulativeInterest: cumulativeInterestPaid,
          cumulativeCapital: cumulativeCapitalPaid,
        });

        annualInterestPaid = 0;
        annualCapitalPaid = 0;
      }
    }
    return yearlyAmortisationSchedule;
  }

export function calculateAffordabilityResults(annualIncome: number, depositAmount: number): AffordabilityResults {
  const borrowingAvailable: number = calculateBorrowingAvailable(annualIncome);
  const totalBudget: number = Number(depositAmount) + borrowingAvailable;
  
  return {
    borrowingAvailable: borrowingAvailable,
    totalBudget: totalBudget,
  };
}

export function calculateMortgageResults(borrowingAmount: number, interestRate: number, mortgageTerm: number): MortgageResults {
  const monthlyInterestRate: number = calculateMonthlyInterestRate(interestRate);
  const paymentMonths: number = calculatePaymentMonths(mortgageTerm);
  const monthlyPayment: number = calculateMonthlyPayment(borrowingAmount, monthlyInterestRate, paymentMonths);

  const totalPayment: number = calculateTotalPayment(monthlyPayment, paymentMonths);
  const totalInterest: number = calculateTotalInterest(totalPayment, borrowingAmount);
  const totalCapital: number = borrowingAmount;

  const stressTestAnnualInterestRate: number = calculateStressTestAnnualInterestRate(interestRate);
  const stressTestMonthlyInterestRate: number = calculateMonthlyInterestRate(stressTestAnnualInterestRate);
  const stressTestMonthlyPayment: number = calculateMonthlyPayment(borrowingAmount, stressTestMonthlyInterestRate, paymentMonths);

  const yearlyAmortisationSchedule: AmortisationRow[] = calculateYearlyAmortisationSchedule(borrowingAmount, paymentMonths, monthlyInterestRate, monthlyPayment);

  return {
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    totalCapital: totalCapital,
    stressTestMonthlyPayment: stressTestMonthlyPayment,
    mortgageTerm: mortgageTerm,
    yearlyAmortisationSchedule: yearlyAmortisationSchedule,
  };
}




