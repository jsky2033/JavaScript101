const form = document.getElementById("user-input");

function signupHandler(event) {
  event.preventDefault();

  const userNameInput = document.getElementById("username");
  const enteredUserName = userNameInput.value;

  const passwordInput = document.getElementById("password");
  const enteredPassword = passwordInput.value;

  if (enteredUserName.trim().length === 0) {
    alert("Invalid input - username must not be empty!");
    return;
  }
  if (enteredPassword.trim().length <= 5) {
    alert("Invalid input - password must be six characters or longer!");
    return;
  }

  const user = {
    userName: enteredUserName,
    password: enteredPassword,
  };

  console.log(user);
}

form.addEventListener("submit", signupHandler);
