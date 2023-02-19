const listElement = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post>form");
const fetchButton = document.querySelector("#available-posts>button");
const postList = document.querySelector("ul");

// GET

async function fetchPosts() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/poss"
    );

    var listOfPosts = response.data;

    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true); // create deep clone
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id; // so that we can delete/edit posts through code
      listElement.append(postEl);
    }
  } catch (error) {
    console.log(error.response);
  }
}

// POST

async function createPost(form) {
  const userId = Math.random();

  const entryTitle = form.querySelector("#title").value;
  const entryContent = form.querySelector("#content").value;

  const postData = {
    title: entryTitle,
    content: entryContent,
    userId: userId,
  };

  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    postData
  );

  console.log(response);
}

/* event handlers */

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
