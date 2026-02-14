// @ts-nocheck
import { useState } from "react";

export function HomePage() {
  const [formData, setFormData] = useState({
    borrowingAmount: "",
    interestRate: "",
    mortgageTerm: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: validate inputs, run calculations, display results
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

      {/* TODO: Inflection Point section */}
      {/* Line chart: Year vs Annual Payment (interest line + capital line) */}
      {/* Display: "Your Inflection Point: Year X" */}

      {/* TODO: Milestone section */}
      {/* Line chart: Year vs Cumulative Payment (interest line + capital line) */}
      {/* Display: "Your Milestone: Year Y" */}

      {/* TODO: Overpayment Slider */}
      {/* Slider input for monthly overpayment amount */}
      {/* Dynamically updates both charts and displayed years */}
    </>
  )
}
