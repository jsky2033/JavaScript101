const button = document.querySelector("button");
const div = document.querySelector("div");

button.addEventListener("click", (event) => {
  console.log("CLICKED BUTTON");
});
div.addEventListener("click", (event) => {
  console.log("CLICKED DIV");
});

// list items
const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

/*The inefficient method*/

// listItems.forEach((item) => {
//   item.addEventListener("click", (event) => {
//     event.target.classList.toggle("highlight");
//   });
// });

/* Using Event Delegation */

list.addEventListener("click", (event) => {
  /* Will work but only highlight the innermost element of the list */

  //   event.target.classList.toggle("highlight");

  /* Refers to the element where the listener is present */

  //   console.log(event.currentTarget);

  /* Selects the list item itself */

  event.target.closest("li").classList.toggle("highlight");
});
