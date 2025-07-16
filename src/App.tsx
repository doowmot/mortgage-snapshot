import './App.css'
import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    housePrice: "",
    depositAmount: "",
    annualIncome: "",
    result: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let availableBorrowing = formData.annualIncome * 4;
    console.log("available borrowing:", availableBorrowing)

    let requiredBorrowing = formData.housePrice - formData.depositAmount;
    console.log("required borrowing:", requiredBorrowing)

    let result = formData.result

    if (availableBorrowing >= requiredBorrowing) {
        setFormData(prevState => ({
            ...prevState,
            result: `Great news! You can likely borrow £${availableBorrowing} which is more than you're required borrowing of £${requiredBorrowing}`
        }));
    } else {
        setFormData(prevState => ({
            ...prevState,
            result: `Bad news! You require £${requiredBorrowing} but can only borrow £${availableBorrowing}`
        }));
    }
  }

  return (
        <form onSubmit={handleSubmit}>
          <label>
            House Price:
            <input 
              type="number" 
              name="housePrice"
              value={formData.housePrice} 
              onChange={handleChange}
              />
          </label>
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
          <input type="submit" />
          <p>{formData.result}</p>
        </form>
  )
}

export default App;