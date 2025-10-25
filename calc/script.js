// ===== SELECT ELEMENTS =====
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equalsBtn = document.querySelector(".equals");
const clearBtn = document.querySelector(".clear");
const delBtn = document.querySelector(".del");
const historyList = document.getElementById("history-list");
const clearHistoryBtn = document.getElementById("clearHistory");
const modeToggle = document.getElementById("modeToggle");

// ===== DARK/LIGHT MODE =====
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// ===== APPEND VALUE FUNCTION =====
function appendValue(value) {
  const lastChar = display.value.slice(-1);

  // Prevent multiple operators
  if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(lastChar)) {
    display.value = display.value.slice(0, -1) + value;
    return;
  }

  // Prevent multiple decimals in same number
  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  display.value += value;
}

// ===== BUTTON CLICKS =====
buttons.forEach(btn => {
  const value = btn.getAttribute("data-value");
  if (value) {
    btn.addEventListener("click", () => appendValue(value));
  }
});

// ===== CALCULATE FUNCTION =====
function calculate() {
  try {
    if (display.value.trim() === "") return;
    const expression = display.value;
    const result = eval(expression);
    addToHistory(expression + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// ===== EQUALS BUTTON =====
equalsBtn.addEventListener("click", calculate);

// ===== CLEAR AND DELETE =====
clearBtn.addEventListener("click", () => display.value = "");
delBtn.addEventListener("click", () => display.value = display.value.slice(0, -1));

// ===== HISTORY FUNCTIONS =====
function addToHistory(value) {
  const li = document.createElement("li");
  li.textContent = value;
  historyList.appendChild(li);
}

clearHistoryBtn.addEventListener("click", () => historyList.innerHTML = "");

// ===== KEYBOARD SUPPORT =====
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (!isNaN(key)) appendValue(key);          // Numbers 0-9
  else if (["+", "-", "*", "/"].includes(key)) appendValue(key); // Operators
  else if (key === ".") appendValue(".");     // Decimal
  else if (key === "Enter") calculate();      // Enter = Calculate
  else if (key === "Backspace") display.value = display.value.slice(0, -1); // DEL
  else if (key === "Escape") display.value = ""; // C
});
3