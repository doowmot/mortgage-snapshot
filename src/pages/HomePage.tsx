// @ts-nocheck
import { useState } from "react";
import { calculateMortgageResults } from "../utils/mortgageCalculations";
import { MortgageTable } from "../components/MortgageTable";
import { InflectionPointChart } from "../components/InflectionPointChart";
import { MilestoneChart } from "../components/MilestoneChart";

export function HomePage() {
  const [formData, setFormData] = useState({
    borrowingAmount: "",
    interestRate: "",
    mortgageTerm: "",
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
        const inflectionYear = yearlyData.find((item) => item.capital > item.interest)?.year;
        const milestoneYear = yearlyData.find((item) => item.cumulativeCapital > item.cumulativeInterest)?.year;

        return (
          <>
            <section className="max-w-4xl mx-auto px-8 mt-10">
              <h3 className="text-2xl font-bold mb-2">Inflection Point</h3>
              <p className="mb-4">The year when your annual capital payments overtake your annual interest payments.</p>
              {inflectionYear && (
                <p className="text-xl font-semibold mb-4">Your Inflection Point: Year {inflectionYear}</p>
              )}
              <InflectionPointChart yearlyAmortisationSchedule={formData.yearlyAmortisationSchedule} />
            </section>

            <section className="max-w-4xl mx-auto px-8 mt-10">
              <h3 className="text-2xl font-bold mb-2">Milestone</h3>
              <p className="mb-4">The year when the total capital you've paid exceeds the total interest you've paid.</p>
              {milestoneYear && (
                <p className="text-xl font-semibold mb-4">Your Milestone: Year {milestoneYear}</p>
              )}
              <MilestoneChart yearlyAmortisationSchedule={formData.yearlyAmortisationSchedule} />
            </section>

            <section className="max-w-4xl mx-auto px-8 mt-10">
              <h3 className="text-2xl font-bold mb-2">Year-by-Year Breakdown</h3>
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
