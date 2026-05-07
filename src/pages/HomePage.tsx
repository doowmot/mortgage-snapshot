import { useState, useRef } from "react";
import { calculateMortgageResults } from "../utils/mortgageCalculations";
import { formatCurrency } from "../utils/format";
import { MortgageTable } from "../components/MortgageTable";
import { InflectionPointChart } from "../components/InflectionPointChart";
import { MilestoneChart } from "../components/MilestoneChart";
import { validateBorrowingAmount, validateInterestRate, validateMortgageTerm } from "../utils/validation";

// Form inputs are stored as strings to keep fields empty on page load
// Numbers are converted when passed as arguments to calculateMortgageResults()
interface MortgageFormData {
  borrowingAmount: string;
  interestRate: string;
  mortgageTerm: string;
}

export function HomePage() {
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState<MortgageFormData>({
    borrowingAmount: "",
    interestRate: "",
    mortgageTerm: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [borrowingAmountError, setBorrowingAmountError] = useState<string | null>(null);
  const [interestRateError, setInterestRateError] = useState<string | null>(null);
  const [mortgageTermError, setMortgageTermError] = useState<string | null>(null);

  let results = null;
  if (hasSubmitted) {
    results = calculateMortgageResults(
      Number(formData.borrowingAmount),
      Number(formData.interestRate),
      Number(formData.mortgageTerm)
    );
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const borrowingError = validateBorrowingAmount(formData.borrowingAmount);
    const rateError = validateInterestRate(formData.interestRate);
    const termError = validateMortgageTerm(formData.mortgageTerm);

    setBorrowingAmountError(borrowingError);
    setInterestRateError(rateError);
    setMortgageTermError(termError);

    if (borrowingError || rateError || termError) {
      return;
    }

    setHasSubmitted(true);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  return (
    <>
      <section className="py-14 max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold">When do you actually start owning your home?</h2>
        <p className="text-xl mt-4 text-gray-600">Most people don't realise the bank gets paid first for years.</p>
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
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {borrowingAmountError && (
              <p className="text-red-600 text-sm mt-1">{borrowingAmountError}</p>
            )}
          </div>

          <div>
            <label htmlFor="interestRate" className="block font-medium">Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              step="0.1"
              value={formData.interestRate}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {interestRateError && (
              <p className="text-red-600 text-sm mt-1">{interestRateError}</p>
            )}
          </div>

          <div>
            <label htmlFor="mortgageTerm" className="block font-medium">Mortgage Term (Years)</label>
            <input
              type="number"
              id="mortgageTerm"
              name="mortgageTerm"
              value={formData.mortgageTerm}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {mortgageTermError && (
              <p className="text-red-600 text-sm mt-1">{mortgageTermError}</p>
            )}
          </div>

          <button type="submit" className="w-full bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium">
            Calculate
          </button>
        </form>
      </div>

      {results && (() => {
        const yearlyData = results.yearlyAmortisationSchedule.filter((item) => item.year !== 0);
        const inflectionRow = yearlyData.find((item) => item.capital > item.interest);
        const milestoneRow = yearlyData.find((item) => item.cumulativeCapital > item.cumulativeInterest);
        // const repaymentRatio = (results.totalPayment / Number(formData.borrowingAmount)).toFixed(2);

        return (
          <>
            {/* Summary cards: three columns */}
            <section ref={resultsRef} className="max-w-6xl mx-auto px-8 mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Card 1: Total Cost */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">What you actually pay back</h3>
                  <p className="text-3xl font-bold mb-2">{formatCurrency(results.totalPayment)}</p>
                  <p className="text-sm text-gray-600 mb-4">This is what the bank earns from your mortgage over {formData.mortgageTerm} years.</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Monthly payment</p>
                      <p className="text-sm font-bold">{formatCurrency(results.monthlyPayment)}/mo</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Borrowed</p>
                      <p className="text-sm font-bold text-green-600">{formatCurrency(Number(formData.borrowingAmount))}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">Interest</p>
                      <p className="text-sm font-bold text-red-600">{formatCurrency(results.totalInterest)}</p>
                    </div>
                  </div>
                </div>

                {/* Card 2: Inflection Point */}
                {inflectionRow && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">The Inflection Point</h3>
                    <p className="text-3xl font-bold mb-2">Year {inflectionRow.year}</p>
                    <p className="text-sm text-gray-600 mb-4">Before this point, most of each payment is interest. After it, most goes to your loan.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">That year's interest</p>
                        <p className="text-sm font-bold text-red-600">{formatCurrency(inflectionRow.interest)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">That year's capital</p>
                        <p className="text-sm font-bold text-green-600">{formatCurrency(inflectionRow.capital)}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Card 3: Milestone */}
                {milestoneRow && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">The Milestone</h3>
                    <p className="text-3xl font-bold mb-2">Year {milestoneRow.year}</p>
                    <p className="text-sm text-gray-600 mb-4">The cumulative crossover — total capital repaid finally overtakes total interest paid.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Total interest paid</p>
                        <p className="text-sm font-bold text-red-600">{formatCurrency(milestoneRow.cumulativeInterest)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">Total capital paid</p>
                        <p className="text-sm font-bold text-green-600">{formatCurrency(milestoneRow.cumulativeCapital)}</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </section>

            {/* Charts section */}
            <section className="max-w-6xl mx-auto px-8 mt-16 pt-16 border-t border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Annual Breakdown</p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                <InflectionPointChart yearlyAmortisationSchedule={results.yearlyAmortisationSchedule} />
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-8 mt-12">
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-4">Cumulative Breakdown</p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm">
                <MilestoneChart yearlyAmortisationSchedule={results.yearlyAmortisationSchedule} />
              </div>
            </section>

            <section className="max-w-6xl mx-auto px-8 mt-16 pt-16 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Year-by-Year Breakdown</h3>
              <MortgageTable yearlyAmortisationSchedule={results.yearlyAmortisationSchedule} />
            </section>
          </>
        );
      })()}

    </>
  )
}