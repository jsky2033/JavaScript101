const defaultResult = 0;
let currentResult = defaultResult; //global value

//array defintion
let logEntries = [];

//define functions
function getUserNumberInput() {
  return parseInt(userInput.value);
}

function writeToLog(operationIdentifier, prevResult, opValue, newResult) {
  //shorthanding the k/v process
  const logEntry = {
    operationIdentifier,
    prevResult,
    opValue,
    newResult,
  };
  logEntries.push(logEntry);
}

function createAndWriteLog(operator, initialResult, opValue) {
  const calcDescription = `${initialResult} ${operator} ${opValue}`;
  writeToLog(operator, initialResult, opValue, currentResult); //function used inside other function
  outputResult(currentResult, calcDescription);
  console.log(logEntries);
}

//mega-function for calculation
function calculateResult(calculationType) {
  let operationTypes = ["ADD", "SUBTRACT", "MULTIPLY", "DIVIDE"];

  let found = false;
  for (let op of operationTypes) {
    if (calculationType === op) {
      found = true;
    }
  }

  //check
  if (!found || !calculationType) {
    alert(`INTERNAL ERROR: ${calculationType} is not a valid operation`);
    return;
  }

  const unfilValue = getUserNumberInput();
  const opValue = !!unfilValue ? unfilValue : 0;
  let operation = "";
  const initialResult = currentResult;
  if (calculationType === "ADD") {
    currentResult += opValue;
    operation = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= opValue;
    operation = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= opValue;
    operation = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= opValue;
    operation = "/";
  }

  createAndWriteLog(operation, initialResult, opValue);
}

function add() {
  calculateResult("ADD");
}

function subtract() {
  calculateResult("SUBTRACT");
}

function multiply() {
  calculateResult("MULTIPLY");
}

function divide() {
  calculateResult("DIVIDE");
}

//add functions as event listeners
addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
