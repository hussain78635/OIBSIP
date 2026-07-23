const temperature = document.getElementById("temperature");
const unit = document.getElementById("unit");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");
const resetBtn = document.getElementById("resetBtn");
const error = document.getElementById("error");
const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");
const copyBtn = document.getElementById("copyBtn");
const historyList = document.getElementById("historyList");
const resultBox = document.querySelector(".result-box");

function clearResults() {
    celsiusResult.textContent = "--";
    fahrenheitResult.textContent = "--";
    kelvinResult.textContent = "--";
    resultBox.classList.remove("active");
}

function showError(message) {
    error.textContent = message;
    clearResults();
}

function updateHistory(value, unit) {
    const entry = `${value} ${unit} → ${celsiusResult.textContent}, ${fahrenheitResult.textContent}, ${kelvinResult.textContent}`;
    const items = historyList.querySelectorAll("li");

    if (items.length > 0 && items[0].textContent === "No conversions yet.") {
        historyList.innerHTML = "";
    }

    const newItem = document.createElement("li");
    newItem.textContent = entry;
    historyList.prepend(newItem);

    if (historyList.children.length > 5) {
        historyList.removeChild(historyList.lastChild);
    }
}

function convertTemperature(value) {
    let celsius;
    let fahrenheit;
    let kelvin;

    switch (unit.value) {
        case "celsius":
            if (value < -273.15) {
                showError("Temperature cannot be below absolute zero.");
                return;
            }
            celsius = value;
            fahrenheit = (value * 9 / 5) + 32;
            kelvin = value + 273.15;
            break;

        case "fahrenheit":
            if (value < -459.67) {
                showError("Temperature cannot be below absolute zero.");
                return;
            }
            celsius = (value - 32) * 5 / 9;
            fahrenheit = value;
            kelvin = celsius + 273.15;
            break;

        case "kelvin":
            if (value < 0) {
                showError("Kelvin cannot be negative.");
                return;
            }
            kelvin = value;
            celsius = value - 273.15;
            fahrenheit = (celsius * 9 / 5) + 32;
            break;
    }

    error.textContent = "";
    celsiusResult.textContent = celsius.toFixed(2) + " °C";
    fahrenheitResult.textContent = fahrenheit.toFixed(2) + " °F";
    kelvinResult.textContent = kelvin.toFixed(2) + " K";
    resultBox.classList.add("active");
    updateHistory(value, unit.value);
}

convertBtn.addEventListener("click", () => {
    const rawValue = temperature.value.trim();

    if (rawValue === "") {
        showError("Please enter a temperature.");
        return;
    }

    const value = parseFloat(rawValue);

    if (isNaN(value)) {
        showError("Please enter a valid temperature.");
        return;
    }

    convertTemperature(value);
});

swapBtn.addEventListener("click", () => {
    const currentUnit = unit.value;

    if (currentUnit === "celsius") {
        unit.value = "fahrenheit";
    } else if (currentUnit === "fahrenheit") {
        unit.value = "kelvin";
    } else {
        unit.value = "celsius";
    }
});

resetBtn.addEventListener("click", () => {
    temperature.value = "";
    unit.value = "celsius";
    error.textContent = "";
    clearResults();
});

copyBtn.addEventListener("click", () => {
    const resultText = `${celsiusResult.textContent}, ${fahrenheitResult.textContent}, ${kelvinResult.textContent}`;

    if (resultText.includes("--")) {
        error.textContent = "Nothing to copy yet.";
        return;
    }

    navigator.clipboard.writeText(resultText).then(() => {
        error.textContent = "Results copied to clipboard!";
    }).catch(() => {
        error.textContent = "Unable to copy results.";
    });
});

temperature.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        convertBtn.click();
    }
});