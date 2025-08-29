import './App.css'
import { useState, useRef, useEffect } from "react";
import { 
  calculateBorrowingAvailable,
  calculateMonthlyPayment,
  calculateMonthlyInterestRate,
  calculatePaymentMonths,
  calculateBorrowingRequired,
  calculateTotalPayment,
  calculateTotalInterest,
  calculateStressTestAnnualInterestRate,
  calculateAmortisationSchedule
} from './utils/mortgageCalculations';
import { formatCurrency } from "./utils/format";
import { AffordabilityForm } from "./components/AffordabilityForm";
import { CostsForm } from "./components/CostsForm";
declare const Chart: any;

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
  const barChartRef = useRef(null);

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
          datasets: [
            {
            label: 'Balance Remaining',
            data: formData.amortisationSchedule.map((item) => item.balance),
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
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: 'Capital',
              data: formData.amortisationSchedule.map((item) => item.capital),
              backgroundColor: 'rgba(54, 162, 235, 0.8)',
              borderColor: 'rgba(54, 162, 235, 1)',
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
      <div className="p-8">
        <h1 className="text-6xl font-bold">Mortgage Calculator</h1>
      </div>

      <AffordabilityForm 
        handleAffordabilitySubmit={handleAffordabilitySubmit}
        handleChange={handleChange}
        depositAmount={formData.depositAmount}
        annualIncome={formData.annualIncome}
        borrowingAvailable={formData.borrowingAvailable}
      />

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
          stressTestmonthlyPayment={formData.stressTestmonthlyPayment}
        />
      }

      {formData.amortisationSchedule.length > 0 && 
      <div>
        <h2>Mortgage Balance Over Time</h2>
        <canvas ref={chartRef} width="400" height="200"></canvas>
        
        <h2>Annual Interest vs Capital Payments</h2>
        <canvas ref={barChartRef} width="400" height="200"></canvas>
        
        <table>
          <tbody>
            <tr>
              <th>Year</th>
              <th>Interest</th>
              <th>Capital</th>
              <th>Balance Remaining</th>
            </tr>
            {formData.amortisationSchedule.map((item) => (
              <tr key={item.year}>
                <td>{item.year}</td>
                <td>{formatCurrency(item.interest)}</td>
                <td>{formatCurrency(item.capital)}</td>
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