# Functions

Functions are essentially blocks of code. It can have parameters and return values but does need to have them. Every function execution is independent from other function executions.

If you are using functions imported from another script, make sure to import that script first! This is why GTM containers are usually placed as high in the head as possible.

This applies for variables in script imports as well. You can reference these variables correctly as long as the script imports are in the right order.

- A very slight detail: Concrete values passed into the function are called arguments while variables passed into it are called parameters.

# The Nature of a Function

A function is essentially an object and is, as such, placed in the Heap along with the other reference values. Functions can be expressions or definitions and there is no functional difference between the two besides when it comes to hoisting.

## Hoisting

Functions are hoisted by Javascript so function DEFINITIONS can be declared after they are used/called.

However function EXPRESSIONS(functions that use let and const) do not have this utility.

Hoisting also works with variables somewhat. However it should be noted that there is no need to initialize variables.

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

# Anonymous Functions

<script>
//add event listeners
startGameBtn.addEventListener("click", function () {
  console.log("Game is starting...");
});
</script>

# Arrow Syntax

The use of arrow syntax for function expressions has extra utilities. For one the arrow syntax assumes you will return the result of an expression (such as an operation or a ternary expression). As such there is no need for the return keyword IF THERE IS ONLY ONE LINE. This is especially helpful if you want to perform some quick calculation.

<script>
const add = (a,b) => a+b;

//other ways to express this:
// arg => {}
// (a,b) => a + b
// (a,b) => { a*=2; return a+b; }

const add2 = function(a,b){
  return a+b;
}
</script>

# Default Parameters

<script>
const add = (a=3,b) => a+b;
</script>

What this does is ensure that if no value is passed into this function,
the default will be used.

Note that this is only for undefined (or missing) parameters. Any other falsy values will be counted as 0.

You can even use some logic in the default values as well!

<script>
const add = (a,b= a >7?5:3) => a+b;
</script>

# Rest Operator

This allows for an unknown amount of parameters to be present in the functions. It will take those parameters and treat them as if they are in an array.

<script>
const sumUp = (multiplier, ...numbers) =>{
    let sum = 0;
    for(const num of numbers){
        sum+=num;
    }
    return sum*multiplier;
}
console.log(sumUp(10,5,6));
</script>

- Note that the one you want to spread out needs to be the last one in the parameter list.

The function keyword also allows for an assumed arguments parameter to be passed in.

<script>
const sumUp = function (){
    let sum = 0;
    for(const num of arguments){
        sum+=num;
    }
    return sum;
}
console.log(sumUp(10,5,6));
</script>

# Shadowing

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

# Functions inside other Functions

This is generally not reccomended however there can be certain cases where this utility comes in handy.

<script>
const sumUp = function (){
    let sum = 0;
    for(const num of arguments){
        sum+=num;
    }
    return sum;
}
console.log(sumUp(10,5,6));
</script>

# Callback Functions

This is when functions are passed in as arguments to other functions. There are several reasons for this. You may want the callback to take in some value that is produced by the main function to aid in the fulfillment of the main function.

In the example below, the main function passes off the sum to the handler function. This allows the handler function to be defined by the caller of the main function.

The caller of the function can now essentially insert their own code inside of the function itself.

Why not just use parameters? Because not every possibility can be accounted for in the main function and we want to give the caller direct control over what happens in the function.

This is also what is most commonly used with event handlers and listeners.

<script>
// main function
const sumUp = (resultHandler, ...numbers) => {
  const validateNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    sum += validateNumber(num);
  }

  resultHandler(sum);
};
// callback function
const showResult = (result) => {
  console.log("Joey says the result is " + result);
};
// using main function and passing in the callback
sumUp(showResult, 10, 20);
// using main function and defining callback directly
sumUp(
  (finalSum) => {
    console.log("The sum is " + finalSum);
  },
  100,
  200,
  700
);
</script>

# bind()

This is so that an object is bound to a function and then that object is referenced in that function by the 'this' keyword.

The reason to do this is that otherwise, when the function is invoked, 'this' will refer to the document itself and not be locally scoped to the object.

1. Bind an object to a function by creating a new function
2. Reference it using 'this' in the original function

The point is convinience when it comes to parameters. This way functions can be written in such a way that they do not need an excessive amount of parameters passed into it. An example of this is React components where the 'this' can be used to refer to props instead of referring to the passes in props by name.

The easiest way to think about it is giving each object its own function based on a template. 

<script>
const c1 = {
  x:5,
  y:10
}

function printCoordinates(){
  console.log(this.x); // output: 5
}

const c1_func = printCoordinates.bind(c1);

c1_func();
</script>

## Do not use with arrow function ()=>

You cannot rebind this in an arrow function. It will always be defined as the context in which it was defined. If you require this to be meaningful you should use a normal function.




# call() and apply()

This does the same as bind() but they execute the function immediately instead of preparing the functions. 