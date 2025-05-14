const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    const availableAmount = calculateAvailableBorrowing(annualIncome);
    const requiredAmount = calculateRequiredBorrowing(housePrice, depositAmount);

    let p = document.createElement("p");

    if (availableAmount >= requiredAmount) {
        p.innerHTML = `Great news! You can likely borrow ${availableAmount} which is more than you're required borrowing of ${requiredAmount}`;
        document.body.appendChild(p);
    } else {
        p.innerHTML = `Bad news! You require ${requiredAmount} but can only borrow ${availableAmount}`;
        document.body.appendChild(p);
    }

    console.log("available borrowing: ", availableAmount);
    console.log("required borrowing: ", requiredAmount);
});

function calculateRequiredBorrowing(housePrice, depositAmount) {
    const requiredBorrowing = (housePrice - depositAmount);
    return requiredBorrowing;
}

function calculateAvailableBorrowing(annualIncome) {
    const availableBorrowing = (annualIncome * 4);
    return availableBorrowing;
}


