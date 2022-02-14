//state
let movies = [];

// element selectors
const cancelButton = document.querySelector(
  "#add-modal > div.modal__actions > button.btn.btn--passive"
);
const addButton = cancelButton.nextElementSibling;
const backGround = document.querySelector("#backdrop");
const addMovieModal = document.querySelector("#add-modal");
const startAddMovieButton = document.querySelector("body > header > button");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.querySelector("#entry-text");
const listRoot = document.getElementById("movie-list");

// event listeners
const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackDrop(); // hoisting ;)
};
const toggleBackDrop = () => {
  backGround.classList.toggle("visible");
};
const addMovie = () => {
  let data = {};
  let valid = true;

  for (const userInput of userInputs) {
    const input = userInput.value;
    if (
      input.trim() === "" ||
      (userInput.name === "rating" && (input < 1 || input > 5))
    ) {
      alert("Please enter valid values!");
      valid = false;
    } else {
      data[userInput.name] = userInput.value;
    }
  }

  if (valid) {
    movies.push(data);
    updateUI();
    toggleMovieModal();
  }
};
const deleteMovie = () =>{

}
const clearMovieInput = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};
const cancelMovieInput = () => {
  clearMovieInput();
  toggleMovieModal();
};
//essentially the re-render function based on the movies array
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    // clear out placeholder
    entryTextSection.style.display = "none";
    //clear out existing visible list
    listRoot.innerHTML = "";
    // list out movie card
    for (const movie of movies) {
      renderNewMovieElement(
        movie["title"],
        movie["image-url"],
        movie["rating"]
      );
    }
  }
};
const renderNewMovieElement = (title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element"; // style element
  newMovieElement.innerHTML = `
  <div class='movie-element__image'>
        <img src="${imageUrl}" alt=${title}>
  </div>
  <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
  </div>
    `;
    /*
    What this does is ensure that the function for the event handler is a deleteMovie
    function bound to the newMovieElement object. Therefore 'this' inside deleteMovie
    will now always refer to the newMovieElement node Object itself (ie the element)
    */
newMovieElement.addEventListener('click', deleteMovie.bind(newMovieElement));
  listRoot.append(newMovieElement);
};


// set event listeners
startAddMovieButton.addEventListener("click", toggleMovieModal);
cancelButton.addEventListener("click", cancelMovieInput);
backGround.addEventListener("click", toggleMovieModal);
addButton.addEventListener("click", addMovie);
