document.getElementById("toggle-dark").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

async function fetchCurrencies() {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await response.json();
    const currencySelects = document.querySelectorAll("select");
    
    Object.keys(data.rates).forEach(currency => {
        currencySelects.forEach(select => {
            let option = document.createElement("option");
            option.value = currency;
            option.textContent = currency;
            select.appendChild(option);
        });
    });
}

async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("from-currency").value;
    const toCurrency = document.getElementById("to-currency").value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const result = amount * data.rates[toCurrency];
    document.getElementById("result").textContent = `Sonuç: ${result.toFixed(2)} ${toCurrency}`;
}

document.getElementById("convert").addEventListener("click", convertCurrency);
fetchCurrencies();