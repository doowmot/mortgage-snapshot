import './App.css'

function App() {

  return (
    <>
      <h1>Mortgage Calculator</h1>

      <div className="container">
        <h2>How Much Can I Borrow?</h2>
        <form id="borrowing-amount-form" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="house-price">house price:</label>
          <input type="text" id="house-price" name="house-price"/>
          <br/>

          <label htmlFor="deposit-amount">deposit amount:</label>
          <input type="text" id="deposit-amount" name="deposit-amount"/>
          <br/>

          <label htmlFor="annual-income">annual income:</label>
          <input type="text" id="annual-income" name="annual-income"/>
          <br/>

          <button id="calculate-borrowing-btn">Calculate borrowing</button>
        </form>
      </div>

    </>
  )
}

export default App
