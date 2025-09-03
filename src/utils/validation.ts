export const validateDeposit = (deposit) => {
  if (isNaN(deposit) || deposit <= 0) {
    return "Error: Please enter a valid deposit amount";
  }
  return null;
}
  
export const validateIncome = (income) => {
  if (isNaN(income) || income <= 0) {
    return "Error: Please enter a valid annual income";
  }
  return null;
}

export const validatePropertyPrice = (deposit, housePrice) => {
  if (isNaN(Number(housePrice))) {
    return "Error: Please enter a number for the house price";
  } else if (Number(housePrice) <= 0) {
    return "Error: Please ensure property price is greater than 0";
  } else if (Number(housePrice) < deposit) {
    return "Error: Please ensure property price is greater than the deposit";
  } 
  return null;
}

export const validateInterestRate = (annualRate) => {
  if (isNaN(Number(annualRate))) {
    return "Error: Please enter a number for the interest rate";
  } else if (Number(annualRate) <= 0) {
  return "Error: Please ensure interest rate is greater than 0";
  } 
  return null;
}

export const validateMortgageTerm = (mortgageYears) => {
  if (isNaN(Number(mortgageYears))) {
    return "Error: Please enter a number for the mortgage term";
  } else if (Number(mortgageYears) <= 0) {
  return "Error: Please ensure mortgage term is greater than 0";
  } else if (Number(mortgageYears) > 40) {
  return "Error: Please ensure mortgage term is 40 years or less";
  }
  return null;
}