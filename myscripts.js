const affordabilityDisplay = document.createElement("p");
document.body.appendChild(affordabilityDisplay);

const monthlyCostDisplay = document.createElement("p");
document.body.appendChild(monthlyCostDisplay);

const totalCostDisplay = document.createElement("p");
document.body.appendChild(totalCostDisplay);

const calculateBorrowingBtn = document.getElementById("calculate-borrowing-btn");

calculateBorrowingBtn.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    const availableBorrowing = calculateAvailableBorrowing(annualIncome);
    const requiredBorrowing = calculateRequiredBorrowing(housePrice, depositAmount);

    if (availableBorrowing >= requiredBorrowing) {
        affordabilityDisplay.innerHTML = `Great news! You can likely borrow £${availableBorrowing} which is more than you're required borrowing of £${requiredBorrowing}`;
    } else {
        affordabilityDisplay.innerHTML = `Bad news! You require £${requiredBorrowing} but can only borrow £${availableBorrowing}`;
    }
});

function calculateRequiredBorrowing(housePrice, depositAmount) {
    return (housePrice - depositAmount);
}

function calculateAvailableBorrowing(annualIncome) {
    return (annualIncome * 4);
}

const calculateMonthlyCostBtn = document.getElementById("calculate-monthly-cost-btn");

calculateMonthlyCostBtn.addEventListener("click", () => {
    const annualInterestRate = Number(document.getElementById("annual-interest-rate").value);
    const mortgageTerm = Number(document.getElementById("mortgage-term").value);
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);

    const requiredBorrowing = calculateRequiredBorrowing(housePrice, depositAmount);
    const monthlyCost = calculateMonthlyCost(requiredBorrowing, annualInterestRate, mortgageTerm);
    const totalCost = calculateTotalCost(monthlyCost, mortgageTerm);
    const totalInterestCost = totalCost - requiredBorrowing;

    monthlyCostDisplay.innerHTML = `You will pay £${monthlyCost} per month`;
    totalCostDisplay.innerHTML = `You will pay £${totalCost} over a ${mortgageTerm} year mortgage term (amount you borrowed: £${requiredBorrowing} + interest charged: £${totalInterestCost})`;
});

function calculateMonthlyCost(requiredBorrowing, annualInterestRate, mortgageTerm) {
    const monthlyInterestRate = (annualInterestRate / 100) / 12;
    const numberOfPaymentMonths = mortgageTerm * 12;

    return Math.round(requiredBorrowing * monthlyInterestRate * (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths)) / (Math.pow(1+monthlyInterestRate, numberOfPaymentMonths) -1));
}

function calculateTotalCost(monthlyCost, mortgageTerm) {
    return (monthlyCost * 12) * mortgageTerm;
}