const inputs = document.querySelectorAll(".form-control");

const patterns = {
  username: /^\w{5,12}$/, //between 5 to 12 characters
  email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  password: /^(?=.*?[a-z])(?=.*?\d)(?=.*?[!@#$%^&*-]).{8,20}$/i,
  telephone: /^\d{10}$/,
  slug: /^[a-z\d-]{8,20}$/
};

//validation function
function validate(input) {
  const regEx = patterns[input.name];
  if (regEx.test(input.value)) {
    input.classList.add("valid");
  } else {
    input.classList.remove("valid");
  }
}

//validation adopts pattern
const validatePattern = validate.bind(patterns);

//onStart
for (const input of inputs) {
  input.addEventListener("keyup", (e) => validatePattern(e.target));
}
