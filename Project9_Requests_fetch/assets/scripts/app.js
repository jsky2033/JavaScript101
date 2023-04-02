const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post>form");
const fetchButton = document.querySelector("#available-posts>button");
const postList = document.querySelector("ul");

// request wrappers

function sendHttpRequest(method, url, data) {
  /*
  fetch returns a promise. You need to then extract the 
  resolution in json format.

  The reason error handling is complicated here is because
  response.json() yields a promise. So the result is NOT
  available in the next line. 

  1) We could add a chain segment above: .then(response=> return response.json)

  and THEN check for status but then the response object itself is lost. Remember
  that response.json() is only a promise

  2) We could add the error handling code in the response statement but then response.json
  cannot be used directly since it is a promise and needs to be 'awaited'.
  */
  return fetch(url, {
    method: method,
    body: data,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong - server-side");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

// GET

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      "GET",
      "https://jsonplaceholder.typicode.com/posts"
    );

    var listOfPosts = responseData;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true); // create deep clone
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id; // so that we can delete/edit posts through code
      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error);
  }
}

// POST

async function createPost(form) {
  const userId = Math.random();

  const fd = new FormData(form);

  fd.append("userId", userId);

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", fd);
}

// event handlers

// GET POSTS

fetchButton.addEventListener("click", fetchPosts);

// ADD POSTS

form.addEventListener("submit", (event) => {
  event.preventDefault();

  createPost(event.currentTarget);
});

// DELETE POSTS

/*
Here we take advantage of the fact that clicks on the post item 
will bubble up to the post list!
*/

postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;

    sendHttpRequest(
      "DELETE",
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});
