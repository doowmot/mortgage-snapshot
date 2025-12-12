// @ts-nocheck
import './App.css'
import { useState, useRef, useEffect } from "react";
import { calculateAffordabilityResults, calculateMortgageResults } from './utils/mortgageCalculations';
import { AffordabilityForm } from "./components/AffordabilityForm";
import { CostsForm } from "./components/CostsForm";
import { MortgageBalanceChart } from './components/MortgageBalanceChart';
import { MortgageTable } from "./components/MortgageTable";
import { validateDeposit, validateIncome, validateInterestRate, validateMortgageTerm, validatePropertyPrice } from './utils/validation';

function App() {
  
  const [formData, setFormData] = useState({
    depositAmount: "",
    annualIncome: "",
    propertyPrice: "",
    annualInterestRate: "",
    mortgageTerm: "",
    borrowingAvailable: 0,
    totalBudget: 0,
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    totalCapital: 0,
    stressTestMonthlyPayment: 0,
    amortisationSchedule: [],
  });

  const [showCostsForm, setShowCostsForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }
  
  const handleAffordabilitySubmit = (event) => {
    event.preventDefault();
  
    const depositErrorAffordability = validateDeposit(formData.depositAmount);
    if (depositErrorAffordability) {
      setFormData(prevState => ({
        ...prevState,
        borrowingAvailable: depositErrorAffordability,
      }));
      return;
    }
  
    const incomeError = validateIncome(formData.annualIncome);
    if (incomeError) {
      setFormData(prevState => ({
        ...prevState,
        borrowingAvailable: incomeError,
      }));
      return;
    }
        
    const results = calculateAffordabilityResults(formData.annualIncome, formData.depositAmount);
      
    setFormData(prevState => ({
      ...prevState,
      ...results
    }));
  
    setShowCostsForm(true);
  }

  const handleCostsSubmit = (event) => {
    event.preventDefault();

    const depositErrorCosts = validateDeposit(formData.depositAmount);
    if (depositErrorCosts) {
      setFormData(prevState => ({
        ...prevState,
        monthlyPayment: depositErrorCosts,
      }));
      return;
    }

    const propertyPriceError = validatePropertyPrice(formData.depositAmount, formData.propertyPrice);
    if (propertyPriceError) {
      setFormData(prevState => ({
        ...prevState,
        monthlyPayment: propertyPriceError,
      }));
      return;
    }

    const interestRateError = validateInterestRate(formData.annualInterestRate);
    if (interestRateError) {
      setFormData(prevState => ({
        ...prevState,
        monthlyPayment: interestRateError,
      }));
      return;
    }

    const mortgageTermError = validateMortgageTerm(formData.mortgageTerm);
    if (mortgageTermError) {
      setFormData(prevState => ({
        ...prevState,
        monthlyPayment: mortgageTermError,
      }));
      return;
    }

    try {
      const results = calculateMortgageResults(
        formData.propertyPrice, 
        formData.depositAmount, 
        formData.annualInterestRate, 
        formData.mortgageTerm
      );
      
      setFormData(prevState => ({
        ...prevState,
        ...results
      }));

    } catch (error) {
      setFormData(prevState => ({
        ...prevState,
        monthlyPayment: "Sorry, there was an error calculating your mortgage. Please try again."
      }));
    }
  }
    
  return (
    <>
      <div className="py-2 px-8">
        <h1 className="text-6xl font-bold">Mortgage Snapshot</h1>
      </div>

      <div className="py-2 px-8">
        <h2 className="text-3xl font-bold">Finally, mortgages made simple.</h2> 
      </div>

      <div className="max-w-2xl mx-auto border-black m-8">
      <AffordabilityForm 
        handleAffordabilitySubmit={handleAffordabilitySubmit} 
        handleChange={handleChange}
        depositAmount={formData.depositAmount}
        annualIncome={formData.annualIncome}
        borrowingAvailable={formData.borrowingAvailable}
        totalBudget={formData.totalBudget}
      />
      </div>

      {showCostsForm &&
        <div className="max-w-2xl mx-auto border-black m-8">
          <CostsForm 
            handleCostsSubmit={handleCostsSubmit}
            handleChange={handleChange}
            depositAmount={formData.depositAmount}
            propertyPrice={formData.propertyPrice}
            annualInterestRate={formData.annualInterestRate}
            mortgageTerm={formData.mortgageTerm}
            monthlyPayment={formData.monthlyPayment}
            totalPayment={formData.totalPayment}
            totalInterest={formData.totalInterest}
            totalCapital={formData.totalCapital}
            stressTestMonthlyPayment={formData.stressTestMonthlyPayment}
          />
        </div>
      }
      
      {formData.amortisationSchedule.length > 0 && 
      <div>
        <MortgageBalanceChart
        amortisationSchedule={formData.amortisationSchedule}
        />
      </div>
      }
      
      {formData.amortisationSchedule.length > 0 && 
      <div>
        <MortgageTable
        amortisationSchedule={formData.amortisationSchedule}
        />
      </div>
      }
    </>
  )
}

export default App;