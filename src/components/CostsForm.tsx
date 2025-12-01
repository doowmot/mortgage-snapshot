export function CostsForm(props) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-semibold p-2">How much will it cost me?</h2>
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
          value="calculate"
          className="bg-blue-500 text-white px-4 py-2 rounded block mx-auto hover:bg-blue-400 cursor-pointer border-2 border-black" 
        />
        <p className="text-2xl p-10 font-extrabold">{props.monthlyPayment}</p>
        <p className="text-1xl p-10 font-extrabold">{props.totalPayment}</p>
        <p className="text-1xl p-10 font-extrabold">{props.totalPaymentBreakdown}</p>
        <p className="text-1xl p-10 font-extrabold">{props.stressTestMonthlyPayment}</p>
      </form>
    </div>
  );
}