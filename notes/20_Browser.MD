# Browser Storage

This refers to things like localStorage, sessionStorage, Cookies, IndexDB and other convinience data. 

## localStorage

- simple K/V store
- user preferences and user-data
- can be cleared by user and via JS

This is pretty bad for more complex data though. However even then you can store the data in JSON format. 

The data here can easily be changes by the user though so do not store anything important here!!!

A very simple use case for localStorage:

<script>
    const storeBtn = document.querySelector("#btn-add");
const retrBtn = document.querySelector("#btn-subtract");

const userId = "u123";
const user = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
};

storeBtn.addEventListener("click", () => {
  localStorage.setItem("uid", userId);
  localStorage.setItem("user", JSON.stringify(user));
});

retrBtn.addEventListener("click", () => {
  const extractedId = localStorage.getItem("uid");
  const extractedUser = JSON.parse(localStorage.getItem("user"));

  console.log(extractedUser);
  if (!!extractedId) {
    console.log("Got the id - " + extractedId);
  } else {
    console.log("Could not find id!");
  }
});

</script>

## sessionStorage

sessionStorage works the exact same way except it will dissapear when the page is closed in the browser. That is to say the tab is closed, the page is closed or the domain changes.

It will not be affected by reloads however.

## Cookies

Similar to localStorage but config options exist to do things like expire them after some time. 

A key feature is that they are sent to the server with outgoing HTTP requests in the headers. This makes them extremely valuable for online advertising since the ad servers can now potentially identify the user using some identifyin key in the cookie. 

Of course your server needs to be able to use the cookies for something. Otherwise they don't really have any use. 

Some extra features for cookies include the fact that cookies have settings that allow them to only be seen by server side script (HttpsOnly).

<script>
    storeBtn.addEventListener("click", () => {
  // ADDS, not replaces, to a cookie
  const userId = "u123";
  const user = { name: "Max", age: 30 }; 

  // setting cookie to expire in 2 seconds
  document.cookie = `uid=${userId}; max-age=2`;
  // storing complex data in cookie
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener("click", () => {
  console.log(document.cookie);
});

</script>

The data output by document.cookie is plain JS string so any kind of analysis of that data will require working on that string. 


## IndexedDB

This is a clientside database that can manage complex data in it. Good for non-critical data. 