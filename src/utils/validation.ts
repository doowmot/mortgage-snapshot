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