export function CostsForm(props) {
    return (
      <div className="p-8">
        <h2 className="text-3xl font-semibold p-2">How much will it cost me?</h2>
        <form onSubmit={props.handleCostsSubmit}>
          <label className="block font-medium m-2">How much is your deposit?</label>
          <input 
            type="number" 
            name="depositAmount"
            value={props.depositAmount} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 mb-4"
          />
          <label className="block font-medium m-2">What is the property price?</label>
          <input 
            type="number" 
            name="propertyPrice"
            value={props.propertyPrice} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 mb-4"
          />
          <label className="block font-medium m-2">What is the interest rate?</label>
          <input 
            type="float" 
            name="annualInterestRate"
            value={props.annualInterestRate} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 mb-4"
          />
          <label className="block font-medium m-2">What is the mortgage term?</label>
          <input 
            type="number" 
            name="mortgageTerm"
            value={props.mortgageTerm} 
            onChange={props.handleChange}
            className="border-2 border-black rounded p-2 mb-4"
          />
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