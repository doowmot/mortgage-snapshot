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

export const calculateAmortisationSchedule = (loanAmount, paymentMonths, monthlyRate, monthlyPayment) => {
    const amortisationSchedule = [];
    let currentBalance = loanAmount;
    let annualInterestPaid = 0;
    let annualCapitalPaid = 0;
    amortisationSchedule.push({year: 0, interest: 0, capital: 0, balance: currentBalance});

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
        amortisationSchedule.push({
          year: year, 
          interest: annualInterestPaid, 
          capital: annualCapitalPaid, 
          balance: Math.max(0, currentBalance)
        });
        annualInterestPaid = 0;
        annualCapitalPaid = 0;
      }
    }
    return amortisationSchedule;
  }

export function calculateMortgageResults(propertyPrice, depositAmount, interestRate, mortgageTerm) {
  const monthlyInterestRate = calculateMonthlyInterestRate(interestRate);
  const paymentMonths = calculatePaymentMonths(mortgageTerm);
  const borrowingRequired = calculateBorrowingRequired(propertyPrice, depositAmount);
  const monthlyPayment = calculateMonthlyPayment(borrowingRequired, monthlyInterestRate, paymentMonths);

  const totalPayment = calculateTotalPayment(monthlyPayment, paymentMonths);
  const totalInterest = calculateTotalInterest(totalPayment, borrowingRequired);
  const totalCapital = borrowingRequired;

  const stressTestAnnualInterestRate = calculateStressTestAnnualInterestRate(interestRate);
  const stressTestMonthlyInterestRate = calculateMonthlyInterestRate(stressTestAnnualInterestRate);
  const stressTestMonthlyPayment = calculateMonthlyPayment(borrowingRequired, stressTestMonthlyInterestRate, paymentMonths);

  const amortisationSchedule = calculateAmortisationSchedule(borrowingRequired, paymentMonths, monthlyInterestRate, monthlyPayment);

  return {
    monthlyPayment: monthlyPayment,
    totalPayment: totalPayment,
    totalInterest: totalInterest,
    totalCapital: totalCapital,
    stressTestMonthlyPayment: stressTestMonthlyPayment,
    mortgageTerm: mortgageTerm,
    amortisationSchedule: amortisationSchedule,
  };
}




