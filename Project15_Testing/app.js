import { createElement, checkAndGenerate } from "./util.js";
import { fetchData } from "./http.js";

const initApp = () => {
  // Initializes the app, registers the button click listener
  const newUserButton = document.querySelector("#btnAddUser");
  newUserButton.addEventListener("click", addUser);
};

const addUser = async () => {
  // Fetches the user input, creates a new HTML element based on it
  // and appends the element to the DOM
  const newUserNameInput = document.querySelector("input#name");
  const newUserAgeInput = document.querySelector("input#age");
  const outputText = checkAndGenerate(
    newUserNameInput.value,
    newUserAgeInput.value
  );

  if (!outputText) {
    return;
  }

  const userList = document.querySelector(".user-list");

  const element = createElement("li", outputText, "user-item");
  userList.appendChild(element);

  const responseData = await fetchData();
  console.log(responseData);
};


// Start the app!
initApp();
