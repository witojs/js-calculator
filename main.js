const display = document.getElementById('display');
const calculateHistory = document.getElementById('calculateHistory');
const displayResult = document.getElementById('displayResult');
const numberElement = document.querySelectorAll('.number');
const operationElement = document.querySelectorAll('.operator-btn');
const equalElement = document.querySelector('.equal');
const clearAllElement = document.querySelector('.clear-all');
const clearLastElement = document.querySelector('.clear-last');

let operationState = '';
let initialValue;
let nextValue; //tempValue before
let result;
let haveDot = false;

let isCalculate = false;

//prevent double dot in display
numberElement.forEach((number) => {
  number.addEventListener('click', (e) => {
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }
    display.value += e.target.innerText;
    initialValue = Number(display.value);
  });
});

//NOT IMPLEMENTED YET (FOR DEL BUTTON)
function deleteChar() {
  if (result) {
    return;
  }
  display.value = display.value.slice(0, -1);
  initialValue = Number(display.value);
}

//more simple operation
operationElement.forEach((operation) => {
  operation.addEventListener('click', (e) => {
    if (!display.value) {
      return;
    }
    haveDot = false;
    const operationName = e.target.innerText;
    if (nextValue && initialValue && operationState) {
      calculate();
    } else {
      result = Number(initialValue);
    }
    clearVar(operationName);
    operationState = operationName;
    //console.log(result);
  });
});

function clearVar(name = '') {
  //nextValue += initialValue + ' ' + name + ' '; SOURCE BUG
  nextValue = initialValue;
  calculateHistory.innerText += `${initialValue} ${name} `;
  display.value = '';
  initialValue = '';
  displayResult.innerText = result;
}

//updated calculate function
function calculate() {
  if (operationState === '+') {
    result = Number(result) + initialValue;
  } else if (operationState === '-') {
    result = Number(result) - initialValue;
  } else if (operationState === '*') {
    result = Number(result) * initialValue;
  } else if (operationState === '/') {
    result = Number(result) / initialValue;
  }
}

//bug ditampilan history ketika menekan tombol CE setelah menekan tombol operator - initial value
equalElement.addEventListener('click', (e) => {
  if (!nextValue || !initialValue) {
    return;
  }
  haveDot = false;
  calculate();
  clearVar();
  display.value = result;
  displayResult.innerText = '';
  initialValue = result;
  nextValue = '';
});

clearAllElement.addEventListener('click', (e) => {
  displayResult.innerText = '';
  calculateHistory.innerText = '';
  initialValue = '';
  nextValue = '';
  result = '';
  display.value = '';
});

clearLastElement.addEventListener('click', (e) => {
  display.value = '';
  initialValue = '';
});

//keybinding
window.addEventListener('keydown', (e) => {
  if (
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.'
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === '+' || e.key === '-' || e.key === '/' || e.key === '*') {
    clickOperation(e.key);
  } else if (e.key == 'Enter' || e.key === '=') {
    clickEqual();
  } else if (e.key == 'Escape') {
    clickClearAll();
  }
  // console.log(e.key)
});

function clickButtonEl(key) {
  numberElement.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operationElement.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalElement.click();
}

function clickClearAll() {
  clearAllElement.click();
}

//TO DO: ketika tombol 1+1 kemudian menekan tombol + maka akan memunculkan hasil 2.
//sehingga perhitungan terus menerus dapat dilakukan tanpa harus menekan tombol =.

//Source & inspiration:
//WEB CIFAR - Build A Simple Calculator With JavaScript | Mini Project For Beginners: https://www.youtube.com/watch?v=0Vg4EiYPCUc
