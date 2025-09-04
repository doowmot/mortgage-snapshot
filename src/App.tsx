import './App.css'
import { useState, useRef, useEffect } from "react";
import { calculateBorrowingAvailable, calculateMortgageResults} from './utils/mortgageCalculations';
import { formatCurrency } from "./utils/format";
import { AffordabilityForm } from "./components/AffordabilityForm";
import { CostsForm } from "./components/CostsForm";
import { MortgageTable } from "./components/MortgageTable";
import { validateDeposit, validateIncome, validateInterestRate, validateMortgageTerm, validatePropertyPrice } from './utils/validation';
declare const Chart: any;

function App() {
  const [formData, setFormData] = useState({
    depositAmount: "",
    annualIncome: "",
    propertyPrice: "",
    annualInterestRate: "",
    mortgageTerm: "",
    borrowingAvailable: "",
    borrowingRequired: "",
    monthlyPayment: "",
    totalPayment: "",
    totalPaymentBreakdown: "",
    stressTestMonthlyPayment: "",
    amortisationSchedule: [],
  });

  const [showCostsForm, setShowCostsForm] = useState(false);

  const chartRef = useRef(null);
  const barChartRef = useRef(null);

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
  
    const borrowingAvailable = calculateBorrowingAvailable(formData.annualIncome);
    const displayBorrowingAvailable = formatCurrency(borrowingAvailable);
  
    setFormData(prevState => ({
      ...prevState,
      borrowingAvailable: `You can likely borrow up to: ${displayBorrowingAvailable}`,
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
  
  useEffect(() => {
    if (formData.amortisationSchedule.length > 0 && chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      
      const ctx = chartRef.current.getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: formData.amortisationSchedule.map((item) => item.year),
          datasets: [
            {
              label: 'Balance Remaining',
              data: formData.amortisationSchedule.map((item) => item.balance),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              borderWidth: 2
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Year"
              }
            },
            y: {
              title: {
                display: true,
                text: "£"
              }
            },
          }
        }
      });
      
      chartRef.current.chart = newChart;
    }
  }, [formData.amortisationSchedule]);

  useEffect(() => {
    if (formData.amortisationSchedule.length > 0 && barChartRef.current) {
      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
      
      const barCtx = barChartRef.current.getContext('2d');
      const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: formData.amortisationSchedule.map((item) => item.year),
          datasets: [
            {
              label: 'Interest',
              data: formData.amortisationSchedule.map((item) => item.interest),
              backgroundColor: 'rgba(239, 68, 68, 0.8)', 
              borderColor: 'rgb(239, 68, 68)',
              borderWidth: 1
            },
            {
              label: 'Capital',
              data: formData.amortisationSchedule.map((item) => item.capital),
              backgroundColor: 'rgba(34, 197, 94, 0.8)',
              borderColor: 'rgb(34, 197, 94)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: true,
              title: {
                display: true,
                text: 'Year'
              }
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: '£'
              }
            }
          }
        }
      });
      
      barChartRef.current.chart = barChart;
    }
  }, [formData.amortisationSchedule]);
    
  return (
    <>
      <div className="py-2 px-8">
        <h1 className="text-6xl font-bold">Mortgage Calculator</h1>
      </div>

      <div className="max-w-2xl mx-auto border-black m-8">
      <AffordabilityForm 
        handleAffordabilitySubmit={handleAffordabilitySubmit} 
        handleChange={handleChange}
        depositAmount={formData.depositAmount}
        annualIncome={formData.annualIncome}
        borrowingAvailable={formData.borrowingAvailable}
      />
      </div>

      {showCostsForm &&
        <CostsForm 
          handleCostsSubmit={handleCostsSubmit}
          handleChange={handleChange}
          depositAmount={formData.depositAmount}
          propertyPrice={formData.propertyPrice}
          annualInterestRate={formData.annualInterestRate}
          mortgageTerm={formData.mortgageTerm}
          monthlyPayment={formData.monthlyPayment}
          totalPayment={formData.totalPayment}
          totalPaymentBreakdown={formData.totalPaymentBreakdown}
          stressTestMonthlyPayment={formData.stressTestMonthlyPayment}
        />
      }

      {formData.amortisationSchedule.length > 0 && 
      <div>
        <h2>Mortgage Balance Over Time</h2>
        <canvas ref={chartRef} width="400" height="200"></canvas>
        
        <h2>Annual Interest vs Capital Payments</h2>
        <canvas ref={barChartRef} width="400" height="200"></canvas>

        <MortgageTable
        amortisationSchedule={formData.amortisationSchedule}
        />
      </div>
      }
    </>
  )
}

export default App;