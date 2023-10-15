const display = document.querySelector('.display');
const inputBtns = document.querySelectorAll('.input');

inputBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    let displayVal = display.textContent;
    const btnVal = btn.textContent;

    if (btnVal === '0' && displayVal === '0') return;
    if (btnVal === '.' && displayVal.includes('.')) return;
    if (displayVal.length >= 15) return;
    if (displayVal === '0' && btnVal !== '.') displayVal = '';
    display.textContent = displayVal + btnVal;
  })
);

function operate(x, y, operator) {
  if (operator === '+') return add(x, y);
  if (operator === '-') return subtract(x, y);
  if (operator === '*') return multiply(x, y);
  if (operator === '/') return divide(x, y);
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}
