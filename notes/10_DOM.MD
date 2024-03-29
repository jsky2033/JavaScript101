# Basics

The DOM is a programming interface that represents the page so that programming languages can interact with it and change the structure, style and content as well as access data on the page.

When an HTML file is accessed, it is parsed and rendered by the browser. Javascript is a hosted language which means the browser provides the environment for it to run. This was discussed earlier with JS engines.

It also exposes WebAPI to allow JavaScript to work with the parsed document. This is so that JavaScript can interact with the browser. This Web API is known as the Document Object Model, abbreviated to DOM.

Part of these are models such as document.querySelector which allows us to access elements. DOM is not strictly tied to Browsers though and there are other tools that can parse HTML. Environments like NodeJS may not have this built in but it does have extensions that allow you to parse HTML.

# Document vs Window

- Document is the Root DOM Node and provides access to element querying.
- The window is the browser/window and acts as a global storage from the script and also provides access to window specific methods.

In fact, if functions are called in source js files, the browser automatically looks for the window. method for it! So there is no need to do something like window.alert(). There is a need for document. however.

console.dir(window) will give you a complete list of all APIs for the browser window.

It should be noted that this does refer to the currently loaded tab!

# Element Nodes

The HTML elements are represented as element nodes and the hierarchy/setup of the HTML elements are reflected in the created objects (element nodes) so that the browser understands the relationships between the HTML elements.

Even white spaces are reflected as text nodes in the DOM as well.

console.dir($0) gives you all the APIs of the element provided by the DOM!

# Nodes vs. Elements

## Nodes

These are the objects that make up the DOM. HTML tags are element nodes or just elements. Text creates Text Nodes and Attributes create Attribute Nodes.

## Elements

These are just the element nodes, one type of nodes. What is the difference? The Elements have special properties and methods to interact with other elements. They can be selected in different ways and can be created/removed via JavaScript.

# Querying Elements

- querySelector()
- getElementById()

These return single elements and are direct references to the DOM element. There are different ways of querying elements such as by CSS selector or ID.

- Note that doing querySelector on a list item will simply return the first item in the list.

* querySelectorAll()
* getElementsByTagName(), eg: document.getElementsByTagName('input')

These return collections of elements (array-like objects): NodeList.

- Remember to address the element by the proper CSS format as well: for example .someclass or #someid

# Targeting within elements

It is also entirely possible to target from within elements themselves.

<script>
// target the title from the whole document
const docTitle = document.querySelector('title');

// target the title in the head section only
const docTitle2 = document.head.querySelector('title');

docTitle.textContent = "Assignment - Solved!"
</script>

# Best practices

The older methods is to use getElementByClassName or getElementsByTagName but the newer more reccomended method is to use the query selector.

- ALWAYS use the defer keyword so that the document is fully parsed before the script starts interacting with it. Otherwise the script MIGHT be executed before the document is fully parsed and accessible through the DOM.

Of course you could always put the script at the end of body but this is unprofessional.

# Dynamic Code Alteration

Properties can be changed on the fly through JS code.

<script>
const h1 = document.querySelector('h1');

h1.textContent = "I have hacked yoU!!";
h1.style.color = "red";
h1.style.backgroundColor = "black";

console.dir(h1); // list all properties
</script>

Some elements do not have properties of their own and all the properties they have are inherited from the HTML element!

# Attributes

The DOM preconfigures some properties based on the HTML attributes. For example an input element with attributes id, class and value:

Maps the element values to the properties of id, className and value respectively.

There is a special method to change the attributes:

<script>
const input = document.querySelector('input');

input.setAttribute('value', 'some text');
</script>

You do this instead of changing the properties directly.

# Traversing the DOM

This means triangulating to the children of an element through that element rather than manually going to that element directly.

Why do this instead of queryselector? When the elements are static and will not change. React Apps are a bad place to do this for example.

## Accessing Child Nodes

Accessing the children of a list can be done as follows:

<script>
const ul = document.querySelector('ul');
console.log(ul.children[1]); // list element nodes
console.log(ul.childNodes); // list all nodes
console.log(liFirst.closest('ul')); // select closest
</script>

The latter provides all of the nodes including the textnodes such as the whitespaces as well.

Parent Element or Parent Node is the way to go in reverse. The closest allows you to select the closest ancestor of a certain type.

## Accessing Sibling

What if we were to access elements that are on the same level in the DOM tree as the element?

This is done with the nextSibling/previousElementSibling etc.

Doing this is not only faster for you, but it is also faster for the browser as well!

# Styling DOM Elements

- Via property. This involves directly accessing the elements and changing the element
- Via className.
- Via classList.

Toggling class names using regular code vs via classLists:

<script>
const button = document.querySelector("button");

const section = document.querySelector("section");

button.addEventListener("click", () => {
  section.className = section.className === "red-bg" ? "no-bg" : "red-bg";

  section.classList.toggle('red-bg'); // if it exists remove, if not add
});
</script>

There are a number of other methods and properties in classList which helps a lot with managing classes.

# Creating and Inserting Elements

- innerHTML: This swaps the entirety of the contents with the innerHTML you have provided to it. Sometimes this is necessary but other times we want to add some content instead.

- insertAdjacentHTML: This allows for inserting relative to the element described. The benefit of this over the above is that there is no re-rendering of the page (as a brand new element is created) and all values in the page remain still.

<script>
const list = document.querySelector("ul");

// list.innerHTML = list.innerHTML + "<li> hello </li>";

list.insertAdjacentHTML('beforeend', '<li>Something</li>')

// beforend means just inside element, after last child. There are other options
</script>

- createElement: This is always called on the document itself, NOT on any other element.

<script>
const list = document.querySelector("ul");

const newLi = document.createElement('li');

newLi.textContent = 'Item 4';

list.appendChild(newLi);

list.firstElementChild.after(newLi); // after the first entry in the list
</script>

The obvious advantage is that properties of the element can now be modified before it is added to the bigger element.

- append vs appendChild:

The difference is that append is used to add an element in the form of a Node object or a DOM String(text) but appendChild only accepts an object!

append can also be used to add multiple elements but adding the same element over again will not work (which makes sense as each node is an object with a reference value) so in this case simply clone a new node.

- IMPORTANT: Internet Explorer does not support appendChild/append.

There are also other methods like before and after that can be used with the inner elements themselves.

## Static and Dynamic Elements

The NodeList is a snapshot of the DOM and does not keep track of future changes to the DOM object that was selected.

<script>
const list = document.querySelector("ul");

// returns STATIC node list
const listItems = list.querySelectorAll('li');
// returns DYNAMIC HTML collection
const listItems2 = list.getElementsByTagName('li');

// add a new element to the list
const newLi = document.createElement('li');
newLi.textContent = "Item 4";
list.append(newLi);
</script>

However it really is reccomended that you use querySelector instead.

## Remove Element

The simple remove() method called on the element reference itself should work but it does not work for Internet Explorer.

Would this create a memory leak if we had a function that is an
event handler that is tied to this element? No! This is because Javascript understands that if an object is removed from the DOM, all functions related to it are also removed!

# Caution about Event Listeners and Functions when using bind!

It may seem prudent at times to add event listeners to elements dynamically as, often times, the event listeners need to be given access to references to newly created elements. However this can be a problem.

<script>
  deletionButton.addEventListener("click", deleteMovie.bind(this));
</script>

If deletionButton is a global variable, then we are esentially giving the element's click listeners more functions every time we run this code. Which means if it is clicked twice, the function will execute twice.

An additional problem is that .bind() will create a new function with a brand new signature. Therefore we must remove this newly created function if we are to use this function again.

The solution:

<script>
let boundDeleteMovieFcn;
function deleteMovie() {
  toggleRemovalModal();
  deletionButton.removeEventListener("click", boundDeleteMovieFcn);
  // then update the movie list in state
}
// reveal delete movie modal
function deleteMoviePrompt() {
  toggleRemovalModal();
  boundDeleteMovieFcn = deleteMovie.bind(this);
  deletionButton.addEventListener("click", boundDeleteMovieFcn);
}
</script>

See how much trouble React saves you?!!

There you do not need to worry about adding multiple event listeners to an elment at all! Mainly because you can use state hooks to highlight the selected item!

# DOMStringMap

This is a map that allows you to store data about an element. See the example in Project 6. The data in it is contained within the dataset property and you set it like this with the "data-" prepend. 

<script>
     <li
          id="p3"
          data-extra-info="Super important conference! Fictional but still!"
          class="card"
        >
</script>

This is now avaliable as extraInfo in the DOMStringMap

# Template Tag

This is a useful piece of HTML due to the fact that it is not rendered at the beginnning. Instead it is loaded into the DOM and can be accessed by Javascript. 

There is an example of this in Project 6. 

# Dynamic Script Addition

This is done if you want to control when certain pieces of Javascript runs. Such as if you only want to import some Javascript when and only when a certain action or event occurs. 

<script>
    const analyticsScript = document.createElement("script");
    analyticsScript.src = "assets/scripts/analytics.js";
    analyticsScript.defer = true;

    document.head.append(analyticsScript);
</script>

# Timing and Intervals

This will wait for 3000 milliseconds before the code is executed. Note that this will not pause script execution. Instead it will come back to your script once the timer expires. This is an example of asynchronus Javscript!

<script>
  const timerId = setTimeout(this.startAnalytics, 3000);

  clearTimeout(timerId); // to stop timeout
</script>

What if you want to execute a function at a certain interval?

<script>
  const interVal = setInterval(() => {
  console.log("Sending analytics data...");
}, 2000);

  clearInterval(timerId); // to stop interval, though clearTimeOut also works!!

</script>

# The Location Object

Location allows you to navigate between pages. It has good utilities such as host, origin, pathname etc. 

# Window

Location and history work together. Location allows you to change history, while history allows you to look at the path of the user. history.back() and history.forward() and history.length() are good examples of self explanatory methods there. 

# The Navigator Object

This allows you to interact with the browser and operating system of your user in a limited way. navigator.userAgent is used to check the operating system for example. 

navigator.geolocation is useful for doing things with the user's position. 

<script>
  navigator.geolocation.getCurrentPosition((data)=>console.log(data));
</script>

# Working with Dates

The Date object and constructor function provides useful features for date and time functionality. 

<script>
  const date = new Date();

  const date2 = new Date('07/11/19'); // attempts to create a date object based on this

  const duration = date - date2; // difference in time in milliseconds

</script>

# The Error Object

<script>
  throw new Error('something went wrong')
</script>

It is best to do it this way because this way you get a stack trace on the error itself. Also, being an object, you can add features to it!

<script>
  const customError = new Error('Something went wrong!');
  console.dir(customError);
</script>