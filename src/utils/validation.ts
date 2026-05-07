// export const validateDeposit = (deposit: string | number): string | null => {
//   if (isNaN(Number(deposit))) {
//     return "Error: Please enter a number for the deposit";
//   } else if (Number(deposit) <= 0) {
//     return "Error: Please ensure the deposit is greater than 0";
//   }

//   return null;
// };

// export const validateIncome = (income: string | number): string | null => {
//   if (isNaN(Number(income))) {
//     return "Error: Please enter a number for the income";
//   } else if (Number(income) <= 0) {
//     return "Error: Please ensure income is greater than 0";
//   }

//   return null;
// };

// export const validatePropertyPrice = (
//   deposit: string | number,
//   housePrice: string | number,
// ): string | null => {
//   if (isNaN(Number(housePrice))) {
//     return "Error: Please enter a number for the house price";
//   } else if (Number(housePrice) <= 0) {
//     return "Error: Please ensure property price is greater than 0";
//   } else if (Number(housePrice) < Number(deposit)) {
//     return "Error: Please ensure property price is greater than the deposit";
//   }

//   return null;
// };

export const validateBorrowingAmount = (borrowingAmount: string | number): string | null => {
  if(isNaN(Number(borrowingAmount))) {
    return "Error: Please enter a number for the borrowing amount";
  } else if (Number(borrowingAmount) <= 0) {
    return "Error: Please ensure borrowing amount is greater than 0";
  } else if (Number(borrowingAmount) > 5000000) {
    return "Error: Please ensure borrowing amount is less than £5,000,000";
  }

  return null;
};

export const validateInterestRate = (annualRate: string | number): string | null => {
  if (isNaN(Number(annualRate))) {
    return "Error: Please enter a number for the interest rate";
  } else if (Number(annualRate) <= 0) {
    return "Error: Please ensure interest rate is greater than 0%";
  } else if (Number(annualRate) > 20) {
    return "Error: Please ensure interest rate is less than 20%";
  }

  return null;
};

export const validateMortgageTerm = (mortgageYears: string | number): string | null => {
  if (isNaN(Number(mortgageYears))) {
    return "Error: Please enter a number for the mortgage term";
  } else if (Number(mortgageYears) <= 0) {
    return "Error: Please ensure mortgage term is greater than 0";
  } else if (Number(mortgageYears) > 40) {
    return "Error: Please ensure mortgage term is 40 years or less";
  }

  return null;
};
