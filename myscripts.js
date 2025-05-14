const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    const requiredBorrowing = (housePrice - depositAmount);

    let requiredBorrowingParagraph = document.createElement("p");
    requiredBorrowingParagraph.innerHTML = "Required Borrowing: " + requiredBorrowing;
    document.body.appendChild(requiredBorrowingParagraph);

    console.log(calculateAvailableBorrowing(annualIncome));
});

function calculateAvailableBorrowing(annualIncome) {
    const availableBorrowing = (annualIncome * 4);
    return availableBorrowing;
}

