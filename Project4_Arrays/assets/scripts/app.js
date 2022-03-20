/*
test URLs to use:

// Black Widow: https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg
// Dora: https://m.media-amazon.com/images/M/MV5BOTVhMzYxNjgtYzYwOC00MGIwLWJmZGEtMjgwMzgxMWUwNmRhXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_.jpg
// Scream: https://m.media-amazon.com/images/M/MV5BM2E4ZGFmZTgtMDVkYS00ZTk0LWIzYWMtODk5OGVmYmEyMzEzXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg
*/

/*
Notice that in contrast to React, there needs to be a special
function created and then called which will render everything in
state to the user in HTML. This is done automatically in React
whenever state changes are made. 
*/

//state
let movies = [];

// element selectors
const cancelButton = document.querySelector(
  "#add-modal > div.modal__actions > button.btn.btn--passive"
);
const addButton = cancelButton.nextElementSibling;
const backGround = document.querySelector("#backdrop");
const addMovieModal = document.querySelector("#add-modal");
const removeMovieModal = document.querySelector("#delete-modal");
const startAddMovieButton = document.querySelector("body > header > button");
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.querySelector("#entry-text");
const listRoot = document.getElementById("movie-list");
const cancelDeletionButton = document.querySelector(
  "#delete-modal > div > button.btn.btn--passive"
);
const deletionButton = document.querySelector(
  "#delete-modal > div > button.btn.btn--danger"
);

// event listeners
const toggleMovieModal = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackDrop(); // hoisting ;)
};
const toggleRemovalModal = () => {
  removeMovieModal.classList.toggle("visible");
  toggleBackDrop();
};
const toggleBackDrop = () => {
  backGround.classList.toggle("visible");
};
const backGroundClick = () => {
  if (addMovieModal.classList.contains("visible")) {
    toggleMovieModal();
  }
  if (removeMovieModal.classList.contains("visible")) {
    cancelDeleteMovie();
  }
};
// add new movie in state
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
    movies.push({ ...data, id: Math.random().toString() });
    updateUI();
    toggleMovieModal();
  }
};
let boundDeleteMovieFcn;
function deleteMovie() {
  toggleRemovalModal();
  deletionButton.removeEventListener("click", boundDeleteMovieFcn);
  // then update the movie list in state
  let deletionIndex = 0;
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === this.id) {
      deletionIndex = i;
      break;
    }
  }
  movies.splice(deletionIndex, 1);
  // update UI
  updateUI();
}
// reveal delete movie modal
function deleteMoviePrompt() {
  toggleRemovalModal();
  boundDeleteMovieFcn = deleteMovie.bind(this);
  deletionButton.addEventListener("click", boundDeleteMovieFcn);
}
// cancel delete movie
function cancelDeleteMovie() {
  deletionButton.removeEventListener("click", boundDeleteMovieFcn);
  toggleRemovalModal();
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
// essentially the re-render function based on the movies array
const updateUI = () => {
  //clear out existing visible list
  listRoot.innerHTML = "";
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    // clear out placeholder first
    entryTextSection.style.display = "none";
    // list out movie card
    for (const movie of movies) {
      renderNewMovieElement(
        movie["id"],
        movie["title"],
        movie["image-url"],
        movie["rating"]
      );
    }
  }
};
// create an HTML entry for each element
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element"; // style element
  newMovieElement.id = id;
  newMovieElement.innerHTML = `
  <div class='movie-element__image'>
        <img src="${imageUrl}" alt=${title}>
  </div>
  <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
  </div>
    `;

  // add a deletion function to the movie element that gets triggered when you click it
  /*
    What this does is ensure that the function for the event handler is a (new) deleteMovie
    function bound to the newMovieElement object. Therefore 'this' inside deleteMovie
    will now always refer to the newMovieElement node Object itself (ie the element).

    This is an alternative to simply passing it in as a parameter.
    */
  newMovieElement.addEventListener(
    "click",
    deleteMoviePrompt.bind(newMovieElement)
  );

  // add a new child node to the list
  listRoot.append(newMovieElement);
};

// set event listeners
startAddMovieButton.addEventListener("click", toggleMovieModal);
cancelButton.addEventListener("click", cancelMovieInput);
backGround.addEventListener("click", backGroundClick);
addButton.addEventListener("click", addMovie);
cancelDeletionButton.addEventListener("click", cancelDeleteMovie);
