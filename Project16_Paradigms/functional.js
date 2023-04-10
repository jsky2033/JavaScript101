const REQUIRED = "REQUIRED";
const MIN_LENGTH = "MIN_LENGTH";

function validate(value, flag, validatorValue) {
  if (flag === REQUIRED) {
    return value.trim().length > 0; // returns true if item exists
  }
  if (flag === MIN_LENGTH) {
    return value.trim().length > validatorValue; // returns true if value length greater
  }
}

function getUserInput(inputElementId) {
  return document.getElementById(inputElementId).value;
}

function createUser(userName, userPassword) {
  if (!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)) {
    throw new Error("Invalid Input!");
  }

  return {
    userName: userName,
    password: userPassword,
  };
}
function greetUser(user) {
  console.log("Hi am I am " + user);
}

function signupHandler(event) {
  event.preventDefault();

  const enteredUserName = getUserInput("username");
  const enteredPassword = getUserInput("password");

  try {
    const newUser = createUser(enteredUserName, enteredPassword);
    console.log(newUser);
    greetUser(newUser.userName);
  } catch (err) {
    alert(err.message);
  }
}

function connectForm(formId, formSubmitHandler) {
  const form = document.getElementById(formId);
  form.addEventListener("submit", formSubmitHandler);
}

connectForm("user-input", signupHandler);
