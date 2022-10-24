# Introduction

## What is JavaScript?

For backend development there is a variety of languages but JavaScript dominates the frontend because it is built into all modern web browsers. JavaScript is an OOP language but it is different from many other OOP languages. To draw an analogy, HTML is the skeleton, CSS is the skin and JavaScript is what provides the motive force. 

JavaScript was created to make webpages more dynamic and was originally called LiveScript. However, due to the popularity of Java, it was renamed to JavaScript. It is totally independent from Java and has nothing to do with Java however!

There is no alternative to JavScript in the browser!

## How does the browser understand JavaScript?

It has its own engine that executes code inside script tags. It is a dynamic, weakly typed language and intepreted (compiled on the fly) language. It is a "hosted" language that runs on different environments. 

Dynamic: It is not pre-compiled and instead parsed and compiled on the fly. The code is evaluated and executed at runtime. Code can change at runtime! i.e: The type of a variable can change at runtime. 

Weakly Typed: Data types are assigned to variables automatically. This is in contrast to strongly typed languages such as Java. 

Host Environment: Javascript was invented to create more dynamic websites, manipulate HTML, send HTTP requests and more. It CANNOT access the local filesystem, interact with the operating system etc. 

# Server Side JS

NodeJS is simply Google's V8 engine that was extracted so that JS could be run anywhere not just the browser! Web backends can be built using JS as well. 

# The JavaScript Engine

This is built into the browser and is different for each type of one: V8 for chrome and SpiderMonkey for FireFox. The code is parsed, compiled and executed. All of this happens in a single thread! This has several implications for the execution itself.

# JavaScript vs Java

These are totally independent of each other. Java is Object-oriented and strongly typed whereas JavasScript is flexible and weakly typed. 

# index

Note that the index file will be executed by default if you try to execute a folder containing JS files. 

# Functions and Script Imports

Note that when scripts are imported in HTML, they are imported in the order they are written. Therefore if you have a function that one script import is using but that script import is after the first one, there will be an error as the function is not found!

# Location of script tags

Script tags can really be placed in the body or the head section. For inline or in page scripts, Async and defer cannot be used practically and if a src is used, the src file will be what is prioritized. 

However, this creates a problem. The browser will wait until all the scripts have been loaded until the next html is parsed. So if the script needs to be fetched from CDN or server, the page will literally halt loading until that network request is fulfilled. 

In the past this was solved by putting the script tags at the bottom of the body. However, the problem with this is that a lot of modern sites require dynamic functionality and simply cannot wait until everything is rendered to start loading script. 

Async and defer both tell the browser to keep parsing/loading while we are waiting for the network request to be fulfilled. The difference is what to do with the code once it is retrieved. 

no keyword -> pause parsing while fetching and execute code before parsing 
async -> keep parsing while fetching but then pause parsing and execute code before parsing 
defer -> keep parsing while fetching and even after that perform execution only at the end!

A reason that certain event handler scripts such as GTM codes may be placed at the very top might be that the scripts need to be present when the HTML elements are there. 

## async

Use when the script has no external dependencies (CDNs etc.) and if the script does not have to interact with the webpage as the code is executed as early as possible. 

It should be noted that the order of the scripts executed is not guranteed. Which is why external dependencies are not such a good idea. 

This tells the browser that script fetching is fine while the page loads but to wait until execution is over before resuming the parsing. This is only available for externally loaded files.

## defer

Use when external dependencies are present and a fully parsed DOM is necessary for execution of the script. 

This tells the browser that script fetching is fine and to go ahead with parsing. But the script will only execute once everything has been parsed!


# Nodemon

Nodemon is an extremely helpful tool that helps to test standalone Javascript files. 

Simply do 

nodemon [file.js]

And now nodemon will automatically run this file whenever alterations to it are made. Be sure to (npm install -g nodemon) to ensure that you can use nodemon globally.

# DevTools

Using chrome devtools allows for examination using breakpoints to move through function execution line by line. Breakpoints will pause the function call at one point and 

Changing the sources code directly will not alter the existing code and is a surefire way of testing code before making them permanent. Remember to save this to commit it to the page though! Might be an issue if the code doesn't have a known trigger though.

Note that the chrome console functions both as a single line executor AND as a file where you can store variables and such.