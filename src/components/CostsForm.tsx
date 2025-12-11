import { formatCurrency } from "../utils/format";

export function CostsForm(props) {
  return (
    <div className="py-4">
      <h2 className="text-4xl font-bold p-2 mb-4 text-left">How much will it cost me?</h2>
      
      <form onSubmit={props.handleCostsSubmit} noValidate>
        
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

        <label className="block font-medium m-2 text-left">What's the property price?</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-0 bottom-0 bg-blue-500 text-white font-medium flex items-center px-4 rounded-l border-2 border-black">
            £
          </span>
          <input 
            type="number" 
            name="propertyPrice"
            value={props.propertyPrice} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 pl-16 w-full"
          />
        </div>

        <label className="block font-medium m-2 text-left">What's the interest rate?</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-0 bottom-0 bg-blue-500 text-white font-medium flex items-center px-4 rounded-l border-2 border-black">
            %
          </span>
          <input 
            type="number" 
            name="annualInterestRate"
            value={props.annualInterestRate} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 pl-16 w-full"
          />
        </div>

        <label className="block font-medium m-2 text-left">What's the mortgage term?</label>
        <div className="relative mb-4">
          <span className="absolute left-0 top-0 bottom-0 bg-blue-500 text-white font-medium flex items-center px-4 rounded-l border-2 border-black">
            Years
          </span>
          <input 
            type="number" 
            name="mortgageTerm"
            value={props.mortgageTerm} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 pl-20 w-full"
          />
        </div>

        <input 
          type="submit" 
          value="Calculate"
          className="bg-blue-500 text-white px-6 py-3 text-lg font-semibold rounded block mx-auto hover:bg-blue-400 cursor-pointer border-2 border-black transition-colors duration-200 mt-8"
        />

        {props.monthlyPayment > 0 && (
          <div className="py-8">
            <p className="text-2xl">
              Your monthly payment will be {' '}
              <span className="text-4xl font-bold bg-yellow-300 px-3 py-1 rounded-lg inline-block">
                {formatCurrency(props.monthlyPayment)}.
              </span>
            </p>
            <p className="text-sm text-gray-600 italic">
              If your interest rate increases by 3%, your monthly payment will be {formatCurrency(props.stressTestMonthlyPayment)}
            </p>
            <p className="text-2xl">
              In total, you will repay {' '}
              <span className="text-4xl font-bold bg-yellow-300 mt-8 px-3 py-1 rounded-lg inline-block">
                {formatCurrency(props.totalPayment)}.
              </span>
            </p>
            <p className="text-1xl italic">
              (With your assumed borrowing of {formatCurrency(props.totalCapital)}, you'll repay {formatCurrency(props.totalCapital)} capital and {formatCurrency(props.totalInterest)} in interest.)
            </p>
          </div>
        )}
      </form>
    </div>
  );
}