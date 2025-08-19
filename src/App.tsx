import './App.css'
import { useState, useRef, useEffect } from "react";

function App() {
  const [formData, setFormData] = useState({
    depositAmount: "25000",
    annualIncome: "50000",
    propertyPrice: "250000",
    annualInterestRate: "5",
    mortgageTerm: "30",
    borrowingAvailable: "",
    borrowingRequired: "",
    monthlyPayment: "",
    totalPayment: "",
    totalPaymentBreakdown: "",
    stressTestmonthlyPayment: "",
    amortisationSchedule: [],
  });

  const [showCostsForm, setShowCostsForm] = useState(false);

  const chartRef = useRef(null);

  const calculateBorrowingAvailable = (income) => {
    return income * 4;
  }

  const calculateMonthlyInterestRate = (annualRate) => {
    return (annualRate / 100) / 12;
  }

  const calculatePaymentMonths = (mortgageYears) => {
    return (mortgageYears * 12);
  }

  const calculateBorrowingRequired = (housePrice, deposit) => {
    return (housePrice - deposit);
  }

  const calculateMonthlyPayment = (loanAmount, monthlyRate, paymentMonths) => {
    return (Math.round(loanAmount * monthlyRate * (Math.pow(1+monthlyRate, paymentMonths)) / (Math.pow(1+monthlyRate, paymentMonths) -1)));
  }

  const calculateTotalPayment = (monthlyPayment, paymentMonths) => {
    return (monthlyPayment * paymentMonths);
  }

  const calculateTotalInterest = (totalPayment, loanAmount) => {
    return (totalPayment - loanAmount);
  }

  const calculateStressTestAnnualInterestRate = (annualRate) => {
    return (parseFloat(annualRate) + 3);
  }

  const formatCurrency = (amount) => new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(amount);

  const calculateAmortisationSchedule = (loanAmount, paymentMonths, monthlyRate, monthlyPayment) => {
    const amortisationSchedule = [];
    let currentBalance = loanAmount;
    let annualInterestPaid = 0;
    let annualCapitalPaid = 0;
    amortisationSchedule.push({year: 0, interest: 0, capital: 0, balance: currentBalance});

    for (let month = 1; month <= paymentMonths; month++) {
      const monthlyInterest = currentBalance * monthlyRate;
      let monthlyCapital;
      
      if (month === paymentMonths) {
        monthlyCapital = currentBalance;
      } else {
        monthlyCapital = monthlyPayment - monthlyInterest;
      }
      
      currentBalance -= monthlyCapital;
      annualInterestPaid += monthlyInterest;
      annualCapitalPaid += monthlyCapital;

      if (month % 12 === 0) {
        const year = month / 12;
        amortisationSchedule.push({
          year: year, 
          interest: annualInterestPaid, 
          capital: annualCapitalPaid, 
          balance: Math.max(0, currentBalance) // Ensure balance never goes negative
        });
        annualInterestPaid = 0;
        annualCapitalPaid = 0;
      }
    }
    return amortisationSchedule;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleAffordabilitySubmit = (event) => {
    event.preventDefault();

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
    
    const monthlyInterestRate = calculateMonthlyInterestRate(formData.annualInterestRate);
    const paymentMonths = calculatePaymentMonths(formData.mortgageTerm);
    const borrowingRequired = calculateBorrowingRequired(formData.propertyPrice, formData.depositAmount);
    const monthlyPayment = calculateMonthlyPayment(borrowingRequired, monthlyInterestRate, paymentMonths);
    const totalPayment = calculateTotalPayment(monthlyPayment, paymentMonths);
    const totalInterest = calculateTotalInterest(totalPayment,borrowingRequired);
    const totalCapital = borrowingRequired;
    const stressTestAnnualInterestRate = calculateStressTestAnnualInterestRate(formData.annualInterestRate);
    const stressTestMonthlyInterestRate = calculateMonthlyInterestRate(stressTestAnnualInterestRate);
    const stressTestmonthlyPayment = calculateMonthlyPayment(borrowingRequired, stressTestMonthlyInterestRate, paymentMonths);
    
    const displaymonthlyPayment = formatCurrency(monthlyPayment);
    const displaytotalPayment = formatCurrency(totalPayment);
    const displaytotalInterest = formatCurrency(totalInterest);
    const displaytotalCapital = formatCurrency(totalCapital);
    const displayStressTestmonthlyPayment = formatCurrency(stressTestmonthlyPayment);

    const amortisationSchedule = calculateAmortisationSchedule(borrowingRequired, paymentMonths, monthlyInterestRate, monthlyPayment);
  
    setFormData(prevState => ({
        ...prevState,
        monthlyPayment: `Your monthly payment will be: ${displaymonthlyPayment}`,
        totalPayment: `You will pay: ${displaytotalPayment} over the ${formData.mortgageTerm} year mortgage term`,
        totalPaymentBreakdown: `This is made up of: ${displaytotalCapital} Capital and ${displaytotalInterest} Interest`,
        stressTestmonthlyPayment: `Disclaimer: If your interest rate goes up by 3%, your monthly payment will be: ${displayStressTestmonthlyPayment}`,
        amortisationSchedule: amortisationSchedule,
    }));
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
            datasets: [{
              label: 'Balance Remaining',
              data: formData.amortisationSchedule.map((item) => item.balance),
            }]
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
    
  return (
    <>
      <h1>Mortgage Calculator</h1>

      <div>
        <h2>How much can i borrow?</h2>
        <form onSubmit={handleAffordabilitySubmit}>
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

      {showCostsForm &&
      <div>
        <h2>How much will it cost me?</h2>
          <form onSubmit={handleCostsSubmit}>
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
          <p>{formData.monthlyPayment}</p>
          <p>{formData.totalPayment}</p>
          <p>{formData.totalPaymentBreakdown}</p>
          <p>{formData.stressTestmonthlyPayment}</p>
        </form>
      </div>
      }

      {formData.amortisationSchedule.length > 0 && 
      <div>
        <h2>Mortgage Balance Over Time</h2>
        <canvas ref={chartRef} width="400" height="200"></canvas>
          <table>
            <tbody>
              <tr>
                <th>Year</th>
                <th>Balance Remaining</th>
              </tr>
              {formData.amortisationSchedule.map((item) => (
                <tr key={item.year}>
                  <td>{item.year}</td>
                  <td>{formatCurrency(item.balance)}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      }
    </>
  )
}

export default App;
