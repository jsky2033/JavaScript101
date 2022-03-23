// ELEMENT SELECTORS
const addMovieBtn = document.querySelector("#add-movie-btn");
const searchBtn = document.querySelector("#search-btn");

/*
Observe how it is necessary to call the renderMovies
function at the end of every function that changes 
state objects.

This is not necessary in React because React does 
this for you. See Light? React can be helpful :P
*/

//STATE
const state = {
  movies: [],
};

//USE EFFECT FUNCTIONS
const renderMovies = (filter = "") => {
  const movies = state.movies;
  const movieList = document.getElementById("movie-list");

  //clear out the list
  movieList.innerHTML = null;
  //make section visible
  if (movies.length === 0) {
    movieList.classList.remove("visible");
  } else {
    movieList.classList.add("visible");
  }

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));
  //render all movies
  filteredMovies.forEach((movie) => {
    const { info } = movie; //get info from movie
    const movieEl = document.createElement("li");
    /*
    Note how we run into an issue here. We want to use extraName here but
    it is not really an accessible variable in this scope. It is function
    scoped (well more accurately block scoped since it is const) to the
    addMovieHandler!
    However this only works because we know that anything that is not title
    is this. Things could get complicated if more than one dynamic field
    is used or if there are many set keys. 
    */
    let text = `${info.title.toUpperCase()} - `;
    for (const key in info) {
      if (key !== "title") {
        text += `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

// EVENT HANDLERS
const addMovieHandler = () => {
  const title = document.querySelector("#title").value.trim();
  const extraName = document.querySelector("#extra-name").value.trim();
  const extraValue = document.querySelector("#extra-value").value.trim();

  if (title === "" || extraName === "" || extraValue === "") {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toString(),
  };

  state.movies.push(newMovie);
  renderMovies();
};
const searchMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

//SET EVENT LISTENERS
addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);
