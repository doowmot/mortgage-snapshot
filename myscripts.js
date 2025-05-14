const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    let requiredBorrowingParagraph = document.createElement("p");
    requiredBorrowingParagraph.innerHTML = "Required Borrowing: " + calculateRequiredBorrowing(housePrice, depositAmount);
    document.body.appendChild(requiredBorrowingParagraph);

    console.log("required borrowing: ", calculateRequiredBorrowing(housePrice, depositAmount));
    console.log("available borrowing: ", calculateAvailableBorrowing(annualIncome));
});

function calculateRequiredBorrowing(housePrice, depositAmount) {
    const requiredBorrowing = (housePrice - depositAmount);
    return requiredBorrowing;
}

function calculateAvailableBorrowing(annualIncome) {
    const availableBorrowing = (annualIncome * 4);
    return availableBorrowing;
}

