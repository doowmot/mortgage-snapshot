export const formatCurrency = (amount: number): string => new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);