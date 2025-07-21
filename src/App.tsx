import './App.css'
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    depositAmount: "",
    annualIncome: "",
    propertyPrice: "",
    annualInterestRate: "",
    mortgageTerm: "",
    borrowingAvailable: "",
    borrowingAmount: "",
    monthlyCost: "",
    totalCost: "",
    totalCostBreakdown: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const borrowingAvailable = formData.annualIncome * 4;
    const displayBorrowingAvailable = new Intl.NumberFormat().format(borrowingAvailable);

    const monthlyInterestRate = (formData.annualInterestRate / 100) / 12;
    const numberOfPaymentMonths = formData.mortgageTerm * 12;
    const borrowingAmount = (formData.propertyPrice - formData.depositAmount)

    const monthlyCost = Math.round(borrowingAmount * monthlyInterestRate * (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths)) / (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths) -1));
    const displayMonthlyCost = new Intl.NumberFormat().format(monthlyCost);
    
    const totalCost = monthlyCost * numberOfPaymentMonths;
    const displayTotalCost = new Intl.NumberFormat().format(totalCost);

    const totalInterestCost = totalCost - borrowingAmount;
    const displayTotalInterestCost = new Intl.NumberFormat().format(totalInterestCost);

    const totalCapitalCost = borrowingAmount;
    const displayTotalCapitalCost = new Intl.NumberFormat().format(totalCapitalCost);

    setFormData(prevState => ({
        ...prevState,
        borrowingAvailable: `You can likely borrow up to: £${displayBorrowingAvailable}`,
        monthlyCost: `Your monthly payment will be: £${displayMonthlyCost} per month`,
        totalCost: `You will pay: £${displayTotalCost} over the ${formData.mortgageTerm} year mortgage term`,
        totalCostBreakdown: `This is made up of: £${displayTotalCapitalCost} Capital and £${displayTotalInterestCost} Interest`,
    }));
    }
  
  return (
    <>
      <h1> Mortgage Calculator </h1>
      <div>
        <h2> How much can i borrow?</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Deposit Amount:
            <input 
              type="number" 
              name="depositAmount"
              value={formData.depositAmount} 
              onChange={handleChange}
            />
          </label>
            Annual Income:
            <input 
              type="number" 
              name="annualIncome"
              value={formData.annualIncome} 
              onChange={handleChange}
            />
          <input type="submit" value="calculate"/>
          <p>{formData.borrowingAvailable}</p>
        </form>
      </div>

      <div>
        <h2> How much will it cost me?</h2>
          <form onSubmit={handleSubmit}>
          <label>
            Deposit Amount:
            <input 
              type="number" 
              name="depositAmount"
              value={formData.depositAmount} 
              onChange={handleChange}
            />
          </label>
          <label>
            Property Price:
            <input 
              type="number" 
              name="propertyPrice"
              value={formData.propertyPrice} 
              onChange={handleChange}
              />
          </label>
          <label>
            Interest Rate:
            <input 
              type="float" 
              name="annualInterestRate"
              value={formData.annualInterestRate} 
              onChange={handleChange}
              />
          </label>
          <label>
            Mortgage Term:
            <input 
              type="number" 
              name="mortgageTerm"
              value={formData.mortgageTerm} 
              onChange={handleChange}
            />
          </label>
          <input type="submit" value="calculate" />
          <p>{formData.monthlyCost}</p>
          <p>{formData.totalCost}</p>
          <p>{formData.totalCostBreakdown}</p>
        </form>
        </div>
    </>

  )
}

export default App;