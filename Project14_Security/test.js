document.querySelector("button").addEventListener("click", () => {
  var userInput = document.querySelector("input").value;
  document.querySelector("h3").innerHTML = userInput;

  document.querySelector("h4").innerHTML = window.location.href;
});
