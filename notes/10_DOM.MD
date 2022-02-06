# Basics

The DOM is a programming interface that represents the page so that programming languages can interact with it and change the structure, style and content as well as access data on the page. 

When an HTML file is accessed, it is parsed and rendered by the browser. Javascript is a hosted language which means the browser provides the environment for it to run. This was discussed earlier with JS engines.

It also exposes WebAPI to allow JavaScript to work with the parsed document. This is so that JavaScript can interact with the browser. This Web API is known as the Document Object Model, abbreviated to DOM. 

Part of these are models such as document.querySelector which allows us to access elements. DOM is not strictly tied to Browsers though and there are other tools that can parse HTML.  Environments like NodeJS may not have this built in but it does have extensions that allow you to parse HTML. 

# Document vs Window

- Document is the Root DOM Node and provides access to element querying. 
- The window is the browser/window and acts as a global storage fro the script and also provides access to window specific methods. 

In fact, if functions are called in source js files, the browser automatically looks for the window. method for it! So there is no need to do something like window.alert(). 

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

These are just the element nodes, one type of nodes. What is the difference? The Elements have special properties and methods to interact with the elements. They can be selected in different ways and can be created/removed via JavaScript.

# Querying Elements

- querySelector()
- getElementById()

These return single elements and are direct references to the DOM element. There are different ways of querying elements such as by CSS selector or ID.

- querySelectorAll()
- getElementsByTagName()

These return collections of elements (array-like objects): NodeList.

# Querying child elements