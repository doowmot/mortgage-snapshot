const calculateButton = document.getElementById("calculate-btn");

calculateButton.addEventListener("click", () => {
    const newContent = document.createTextNode("Hi there and greetings!");
    document.body.appendChild(newContent);
});
