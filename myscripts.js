const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const housePrice = Number(document.getElementById("house-price").value);
    const depositAmount = Number(document.getElementById("deposit-amount").value);
    const annualIncome = Number(document.getElementById("annual-income").value);

    console.log(housePrice);
    console.log(depositAmount);
    console.log(annualIncome);

    const requiredBorrowing = (housePrice - depositAmount);

    const newContent = document.createTextNode("Required Borrowing: " + requiredBorrowing);
    document.body.appendChild(newContent);
});


