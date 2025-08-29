export const formatCurrency = (amount) => new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);