const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post>form");
const fetchButton = document.querySelector("#available-posts>button");
const postList = document.querySelector("ul");

// request wrappers

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    // configuration
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    // setting this ensures you do not have to parse return
    xhr.responseType = "json";

    // onload function -> will always fire and return response of server
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error("Something went wrong!"));
      }
    };
    // POST request -> will fire if method is POST
    xhr.send(JSON.stringify(data));

    // error handling -> will NOT trigger if error is only server side
    xhr.onerror = function () {
      console.log(xhr.response);
      console.log(xhr.status);
    };
  });

  return promise;
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

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    usrId: userId,
  };

  sendHttpRequest("POST", "https://jsonplaceholder.typicode.com/posts", post);
}

// DELETE

// event handlers

// GET POSTS

fetchButton.addEventListener("click", fetchPosts);

// ADD POSTS

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entryTitle = event.currentTarget.querySelector("#title").value;
  const entryContent = event.currentTarget.querySelector("#content").value;

  createPost(entryTitle, entryContent);
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
