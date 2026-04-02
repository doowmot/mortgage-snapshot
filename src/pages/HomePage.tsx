// @ts-nocheck
import { useState } from "react";
import { calculateMortgageResults } from "../utils/mortgageCalculations";
import { formatCurrency } from "../utils/format";
import { MortgageTable } from "../components/MortgageTable";
import { InflectionPointChart } from "../components/InflectionPointChart";
import { MilestoneChart } from "../components/MilestoneChart";

export function HomePage() {
  const [formData, setFormData] = useState({
    borrowingAmount: "",
    interestRate: "",
    mortgageTerm: "",
    totalPayment: 0,
    totalInterest: 0,
    yearlyAmortisationSchedule: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const results = calculateMortgageResults(
      formData.borrowingAmount,
      formData.interestRate,
      formData.mortgageTerm
    );

    setFormData(prevState => ({
      ...prevState,
      totalPayment: results.totalPayment,
      totalInterest: results.totalInterest,
      yearlyAmortisationSchedule: results.yearlyAmortisationSchedule,
    }));
  }

  return (
    <>
      <section className="py-14">
        <h2 className="text-5xl font-bold px-50">When do you actually start owning your home?</h2>
        <p className="text-1xl px-50 mt-4">Most people don't realise the bank gets paid first for years.</p>
      </section>

      <div className="max-w-2xl mx-auto m-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="borrowingAmount" className="block font-medium">Borrowing Amount (&pound;)</label>
            <input
              type="number"
              id="borrowingAmount"
              name="borrowingAmount"
              value={formData.borrowingAmount}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="interestRate" className="block font-medium">Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              step="0.01"
              value={formData.interestRate}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="mortgageTerm" className="block font-medium">Mortgage Term (Years)</label>
            <input
              type="number"
              id="mortgageTerm"
              name="mortgageTerm"
              value={formData.mortgageTerm}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>

          <button type="submit" className="bg-black text-white px-6 py-2 rounded">
            Calculate
          </button>
        </form>
      </div>

      {formData.yearlyAmortisationSchedule.length > 0 && (() => {
        const yearlyData = formData.yearlyAmortisationSchedule.filter((item) => item.year !== 0);
        const inflectionRow = yearlyData.find((item) => item.capital > item.interest);
        const milestoneRow = yearlyData.find((item) => item.cumulativeCapital > item.cumulativeInterest);
        const repaymentRatio = (formData.totalPayment / Number(formData.borrowingAmount)).toFixed(2);

        return (
          <>
            <section className="max-w-4xl mx-auto px-8 mt-10">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">What you actually pay back</h3>
                <p className="text-3xl font-bold mb-2">{formatCurrency(formData.totalPayment)}</p>
                <p className="text-sm text-gray-600">
                  {formatCurrency(Number(formData.borrowingAmount))} borrowed + {formatCurrency(formData.totalInterest)} in interest — for every £1 borrowed, you repay £{repaymentRatio}
                </p>
              </div>
            </section>

            {inflectionRow && (
              <section className="max-w-4xl mx-auto px-8 mt-10">
                <h3 className="text-2xl font-bold">The Inflection Point</h3>
                <p className="text-gray-600 mb-4">When annual capital beats annual interest</p>

                <p className="text-3xl font-bold mb-2">Year {inflectionRow.year}</p>
                <p className="text-gray-600 mb-4">This is when you start paying off more of your actual home than padding the bank's profits each year.</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">That year's interest</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(inflectionRow.interest)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">That year's capital</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(inflectionRow.capital)}</p>
                  </div>
                </div>

                <InflectionPointChart yearlyAmortisationSchedule={formData.yearlyAmortisationSchedule} />
              </section>
            )}

            {milestoneRow && (
              <section className="max-w-4xl mx-auto px-8 mt-10">
                <h3 className="text-2xl font-bold">The Milestone</h3>
                <p className="text-gray-600 mb-4">When total capital beats total interest</p>

                <p className="text-3xl font-bold mb-2">Year {milestoneRow.year}</p>
                <p className="text-gray-600 mb-4">The day you've paid more towards your home than to the bank in interest — total, since day one.</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total interest paid</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(milestoneRow.cumulativeInterest)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Total capital paid</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(milestoneRow.cumulativeCapital)}</p>
                  </div>
                </div>

                <MilestoneChart yearlyAmortisationSchedule={formData.yearlyAmortisationSchedule} />
              </section>
            )}

            <section className="max-w-4xl mx-auto px-8 mt-10">
              <h3 className="text-2xl font-bold mb-4">Year-by-Year Breakdown</h3>
              <MortgageTable yearlyAmortisationSchedule={formData.yearlyAmortisationSchedule} />
            </section>
          </>
        );
      })()}

      {/* TODO: Overpayment Slider */}
      {/* Slider input for monthly overpayment amount */}
      {/* Dynamically updates both charts and displayed years */}
    </>
  )
}
