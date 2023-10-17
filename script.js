const display = document.querySelector('.display');
const resetBtn = document.querySelector('.reset');
const signBtn = document.querySelector('.sign');
const inputBtns = document.querySelectorAll('.input');
const operatorBtns = document.querySelectorAll('.operator');
const operateBtn = document.querySelector('.operate');

const MAX_INPUT_LENGTH = 15;
const MAX_DECIMAL_LENGTH = MAX_INPUT_LENGTH - 2;

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

    const maxInputLength = displayVal.includes('-')
      ? MAX_INPUT_LENGTH + 1
      : MAX_INPUT_LENGTH;
    const maxDecimalLength = displayVal.includes('-')
      ? MAX_DECIMAL_LENGTH + 1
      : MAX_DECIMAL_LENGTH;

    if (displayVal.length >= maxInputLength) return;
    if (btnVal === '0' && displayVal === '0') return;
    if (
      btnVal === '.' &&
      (displayVal.includes('.') || displayVal.length > maxDecimalLength)
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

resetBtn.addEventListener('click', () => {
  display.textContent = '0';
  number = null;
  operator = null;
  resetDisplay = false;
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
  const intLength = unsignedInt.toString().length;

  if (intLength > MAX_INPUT_LENGTH || isNaN(result) || result === Infinity) {
    return 'ERROR';
  }

  let maxDecimalLength = MAX_DECIMAL_LENGTH - (intLength - 1);
  if (maxDecimalLength < 0) maxDecimalLength = 0;

  return +result.toFixed(maxDecimalLength);
}
