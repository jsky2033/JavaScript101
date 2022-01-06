# Functions

Functions are essentially blocks of code. It can have parameters and return values but does need to have them. Every function execution is independent from other function executions. 

If you are using functions imported from another script, make sure to import that script first! This is why GTM containers are usually placed as high in the head as possible. 

This applies for variables in script imports as well. You can reference these variables correctly as long as the script imports are in the right order. 

* A very slight detail: Concrete values passed into the function are called arguments while variables passed into it are called parameters. 

# Functions vs. Methods

Functions can be placed inside of objects and used through the object.

<script>
const person = {
    name: "Max",
    greet: function greet(){
        console.log('Hello there!');
    }
}
</script>

A function created this way is called a Method and this means it is essentially a function that is part of an object. Very similar to how functions were defined in Java and C++. Except with Javscript there is no need to make objects from classes as objects can be created by thesmelves. 

A function that is defined in the traditional way (through an expression or defintion) can be called a Function. 


## Hoisting

Functions are hoisted by Javascript so function DEFINITIONS can be declared after they are used/called. 

However function EXPRESSIONS(functions that use let and const) do not have this utility. 

Hoisting also works with variables somewhat. However it should be noted that there is no need to initialize variables. 

## Shadowing

This refers to making a locally scoped variable with the same name as a globally scoped one. It creates a new variable on a different scope - this variables does not overwrite or remove the global variable by the way - both co-exist. 

<script>
let userName="Max"
function display(){
    let userName="Manu";
    alert(userName);
}
display();
</script>

This will not generate an error and will output "Manu". Note that the function prioritizes the local scope before moving on to the global scope. 

## Self calling functions

It is entirely possible to call the function immediately as it is defined. However this means it cannot be called by its name afterwards. 


## Return

Nothing after the return statement will be returned. There are some instances of "return-less" functions but they are mainly for HTTP requests. 

Something to watch out for: try not to place these in other functions as this will only return out of that specific function!

## Event Listeners

Functions can be added as event listeners. However parantheses should be avoided because that will immediately call the function!

Functions can be called directly or indirectly with the indirect method being to add it to an event listener. 

