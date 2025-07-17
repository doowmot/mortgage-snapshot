import './App.css'
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    depositAmount: "",
    annualIncome: "",
    propertyValue: "",
    interestRate: "",
    mortgageTerm: "",
    borrowingAmount: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let borrowingAmount = formData.annualIncome * 4;

    setFormData(prevState => ({
        ...prevState,
        borrowingAmount: `You can likely borrow £${borrowingAmount}`
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
          <p>{formData.borrowingAmount}</p>
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
              name="propertyValue"
              value={formData.propertyValue} 
              onChange={handleChange}
              />
          </label>
          <label>
            Interest Rate:
            <input 
              type="number" 
              name="interestRate"
              value={formData.interestRate} 
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
          <input type="submit" />
          <p>{formData.monthlyCost}</p>
        </form>
        </div>
    </>

  )
}

export default App;