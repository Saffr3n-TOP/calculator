const display = document.querySelector('.display');
const signBtn = document.querySelector('.sign');
const inputBtns = document.querySelectorAll('.input');
const operatorBtns = document.querySelectorAll('.operator');
const operateBtn = document.querySelector('.operate');

let number = null;
let operator = null;
let resetDisplay = false;

inputBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    if (resetDisplay) {
      display.textContent = '0';
      resetDisplay = false;
    }

    let displayVal = display.textContent;
    const btnVal = btn.textContent;
    const maxChars = displayVal.includes('-') ? 16 : 15;

    if (displayVal.length >= maxChars) return;
    if (btnVal === '0' && displayVal === '0') return;
    if (
      btnVal === '.' &&
      (displayVal.includes('.') || displayVal.length >= maxChars - 1)
    ) {
      return;
    }

    if (displayVal === '0' && btnVal !== '.') displayVal = '';
    display.textContent = displayVal + btnVal;
  })
);

operatorBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
    if (number === null) {
      number = +display.textContent;
      operator = btn.textContent;
    } else {
      const result = operate(number, +display.textContent, operator);
      display.textContent = result;

      if (result === 'ERROR') {
        number = null;
        operator = null;
      } else {
        number = result;
        operator = btn.textContent;
      }
    }

    resetDisplay = true;
  })
);

operateBtn.addEventListener('click', () => {
  if (!operator) return;

  const result = operate(number, +display.textContent, operator);
  display.textContent = result;

  number = null;
  operator = null;
  resetDisplay = true;
});

signBtn.addEventListener('click', () => {
  const displayVal = display.textContent;

  if (displayVal === '0') return;
  if (displayVal.includes('-')) {
    display.textContent = displayVal.slice(1);
  } else {
    display.textContent = '-' + displayVal;
  }
});

function operate(x, y, operator) {
  if (operator === '+') return add(x, y);
  if (operator === '-') return subtract(x, y);
  if (operator === '*') return multiply(x, y);
  if (operator === '/') return divide(x, y);
}

function add(x, y) {
  return normalizeResult(x + y);
}

function subtract(x, y) {
  return normalizeResult(x - y);
}

function multiply(x, y) {
  return normalizeResult(x * y);
}

function divide(x, y) {
  return normalizeResult(x / y);
}

function normalizeResult(result) {
  const unsignedInt = Math.floor(Math.abs(result));
  const nums = unsignedInt.toString().length;

  if (nums > 15) return 'ERROR';
  return +result.toFixed(14 - (nums < 13 ? nums : 14));
}
