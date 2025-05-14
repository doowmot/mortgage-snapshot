const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    const availableBorrowing = calculateAvailableBorrowing(annualIncome);
    const requiredBorrowing = calculateRequiredBorrowing(housePrice, depositAmount);

    let p = document.createElement("p");

    if (availableBorrowing >= requiredBorrowing) {
        p.innerHTML = `Great news! You can likely borrow £${availableBorrowing} which is more than you're required borrowing of £${requiredBorrowing}`;
        document.body.appendChild(p);
    } else {
        p.innerHTML = `Bad news! You require £${requiredBorrowing} but can only borrow £${availableBorrowing}`;
        document.body.appendChild(p);
    }
});

function calculateRequiredBorrowing(housePrice, depositAmount) {
    return (housePrice - depositAmount);
}

function calculateAvailableBorrowing(annualIncome) {
    return (annualIncome * 4);
}


