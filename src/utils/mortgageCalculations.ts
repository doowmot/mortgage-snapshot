export const calculateBorrowingAvailable = (income) => {
    return income * 4;
}

export const calculateMonthlyInterestRate = (annualRate) => {
    return (annualRate / 100) / 12;
}

export const calculatePaymentMonths = (mortgageYears) => {
    return (mortgageYears * 12);
}

export const calculateBorrowingRequired = (housePrice, deposit) => {
    return (housePrice - deposit);
}

export const calculateMonthlyPayment = (loanAmount, monthlyRate, paymentMonths) => {
    return (Math.round(loanAmount * monthlyRate * (Math.pow(1+monthlyRate, paymentMonths)) / (Math.pow(1+monthlyRate, paymentMonths) -1)));
}

export const calculateTotalPayment = (monthlyPayment, paymentMonths) => {
    return (monthlyPayment * paymentMonths);
}

export const calculateTotalInterest = (totalPayment, loanAmount) => {
    return (totalPayment - loanAmount);
}

export const calculateStressTestAnnualInterestRate = (annualRate) => {
    return (parseFloat(annualRate) + 3);
}

export const calculateYearlyAmortisationSchedule = (loanAmount, paymentMonths, monthlyRate, monthlyPayment) => {
    const yearlyAmortisationSchedule = [];
    let currentBalance = loanAmount;
    let annualInterestPaid = 0;
    let annualCapitalPaid = 0;
    let cumulativeInterestPaid = 0;
    let cumulativeCapitalPaid = 0;

    yearlyAmortisationSchedule.push({year: 0, interest: 0, capital: 0, balance: currentBalance, cumulativeInterest: cumulativeInterestPaid, cumulativeCapital: cumulativeCapitalPaid,});

    for (let month = 1; month <= paymentMonths; month++) {
      const monthlyInterest = currentBalance * monthlyRate;
      let monthlyCapital;
      
      if (month === paymentMonths) {
        monthlyCapital = currentBalance;
      } else {
        monthlyCapital = monthlyPayment - monthlyInterest;
      }
      
      currentBalance -= monthlyCapital;
      annualInterestPaid += monthlyInterest;
      annualCapitalPaid += monthlyCapital;

      if (month % 12 === 0) {
        const year = month / 12;

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

export function calculateAffordabilityResults(annualIncome, depositAmount) {
  const borrowingAvailable = calculateBorrowingAvailable(annualIncome);
  const totalBudget = Number(depositAmount) + borrowingAvailable;
  
  return {
    borrowingAvailable: borrowingAvailable,
    totalBudget: totalBudget,
  };
}

export function calculateMortgageResults(borrowingAmount, interestRate, mortgageTerm) {
  const monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
  const paymentMonths = calculatePaymentMonths(mortgageTerm);
  const monthlyPayment = calculateMonthlyPayment(borrowingAmount, monthlyInterestRate, paymentMonths);

  const totalPayment = calculateTotalPayment(monthlyPayment, paymentMonths);
  const totalInterest = calculateTotalInterest(totalPayment, borrowingAmount);
  const totalCapital = borrowingAmount;

  const stressTestAnnualInterestRate = calculateStressTestAnnualInterestRate(interestRate);
  const stressTestMonthlyInterestRate = calculateMonthlyInterestRate(stressTestAnnualInterestRate);
  const stressTestMonthlyPayment = calculateMonthlyPayment(borrowingAmount, stressTestMonthlyInterestRate, paymentMonths);

  const yearlyAmortisationSchedule = calculateYearlyAmortisationSchedule(borrowingAmount, paymentMonths, monthlyInterestRate, monthlyPayment);

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




