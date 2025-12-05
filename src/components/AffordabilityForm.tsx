import { formatCurrency } from "../utils/format";

export function AffordabilityForm(props) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold p-2">How much can I borrow?</h2>
      <form onSubmit={props.handleAffordabilitySubmit} noValidate>
        <label className="block font-medium m-2 text-left">How much is your deposit?</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-0 bottom-0 bg-blue-500 text-white font-medium flex items-center px-4 rounded-l border-2 border-black">
            £
          </span>
          <input
            type="number"
            name="depositAmount"
            value={props.depositAmount}
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 pl-16 w-full"
          />
        </div>
        
        <label className="block font-medium m-2 text-left">What's your annual household income?</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-0 bottom-0 bg-blue-500 text-white font-medium flex items-center px-4 rounded-l border-2 border-black">
            £
          </span>
          <input
            type="number"
            name="annualIncome"
            value={props.annualIncome}
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 pl-16 w-full"
          />
        </div>

        <input
          type="submit"
          value="calculate"
          className="bg-blue-500 text-white px-4 py-2 rounded block mx-auto hover:bg-blue-400 cursor-pointer border-2 border-black"
        />

        {props.borrowingAvailable && ( 
          <div className="py-8">
            <p className="text-2xl">
              You can likely borrow{' '}
              <span className="text-4xl font-bold bg-yellow-300 px-3 py-1 rounded-lg inline-block">
                {formatCurrency(props.borrowingAvailable)}.
              </span>
            </p>
            <p className="text-1xl italic">
              (With your deposit of {formatCurrency(Number(props.depositAmount))}, your total budget is{' '}
              <span>
                {formatCurrency(props.totalBudget)})
              </span>
            </p>
          </div>
        )}
        </form>
      </div>
  )
}