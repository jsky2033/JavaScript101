import { fetchData } from "./http.js";

export function generateText(name, age) {
  // Returns output text
  return `${name} (${age} years old)`;
}

export function createElement(type, text, className) {
  // Creates a new HTML element and returns it
  const newElement = document.createElement(type);
  newElement.classList.add(className);
  newElement.textContent = text;
  return newElement;
}

export function validateInput(text, notEmpty, isNumber) {
  // Validate user input with two pre-defined rules
  if (!text) {
    return false;
  }
  if (notEmpty && text.trim().length === 0) {
    return false;
  }
  if (isNumber && +text === NaN) {
    return false;
  }
  return true;
}

export function checkAndGenerate(name, age) {
  if (!validateInput(name, true, false) || !validateInput(age, false, true)) {
    return;
  }
  return generateText(name, age);
}

export function loadTitle() {
  return fetchData().then((extractedData) => {
    const title = extractedData.title;
    return title;
  });
}
