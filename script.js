const display = document.querySelector('.display');
const signBtn = document.querySelector('.sign');
const inputBtns = document.querySelectorAll('.input');

inputBtns.forEach((btn) =>
  btn.addEventListener('click', () => {
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
