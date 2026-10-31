
const display = document.getElementById("display");
let expression = "";

document.querySelectorAll("button").forEach(function (button) {
  button.addEventListener("click", function () {
    press(button.dataset.value);
  });
});

function press(value) {
  if (expression === "Error") expression = "";

  if (value === "AC") expression = "";
  else if (value === "=") expression = calculate(expression);
  else if (value === "%") expression = calculate(expression + "/100");
  else expression += value;

  display.textContent = expression || "0";
}

function calculate(text) {
  if (text === "") return "";
  try {
    return String(eval(text));
  } catch (e) {
    return "Error";
  }
}
