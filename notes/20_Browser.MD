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


A good example of this is in Project1_Vars


# Browser Support

Ideally you want your JS to work across all the Browsers. However some functions such as fetch() function which do not work across all browsers. 

Transpiling refers to the means of getting newer Syntax to work with older browsers that only recognize previous versions. However, note that if the older Browsers do not have features like geolocation of users, it will not be able to do so regardless of this!

## Feature Detection

This is done in order to detect if features exist before using them and potentially causing error. 

Instead of using a try/catch fail you could simply use feature detection to avoid these problems. 

## Polyfills

This is a third party package that adds features if they are not available on the browser. It essentially tries to use JS to duplicate the beahavior of the feature. 

You can use caniuse or google for github code to use this. 

## Transpilation

Sometimes we want to use core JS syntax like let/const/async/await and make sure this works for older browsers. 

The best way of doing this is through Babel

# Note on NodeJS

Here you have control over what code you run. So Transpilation will not be a problem here. 