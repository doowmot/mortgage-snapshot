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
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const borrowingAvailable = formData.annualIncome * 4;
    const monthlyInterestRate = (formData.annualInterestRate / 100) / 12;
    const numberOfPaymentMonths = formData.mortgageTerm * 12;
    const borrowingAmount = (formData.propertyPrice - formData.depositAmount)
    const monthlyCost = Math.round(borrowingAmount * monthlyInterestRate * (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths)) / (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths) -1));
    const totalCost = monthlyCost * numberOfPaymentMonths;

    setFormData(prevState => ({
        ...prevState,
        borrowingAvailable: `You can likely borrow: £${borrowingAvailable}`,
        monthlyCost: `Your monthly payment will be: £${monthlyCost} per month`,
        totalCost: `You will pay: £${totalCost} over the ${formData.mortgageTerm} year mortgage term`
    }));
    }
  
  return (
    <>
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
            Property Value:
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
              type="number" 
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
        </form>
        </div>
    </>

  )
}

export default App;