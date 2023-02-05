# Functions

Functions are essentially blocks of code. It can have parameters and return values but does need to have them. Every function execution is independent from other function executions.

If you are using functions imported from another script, make sure to import that script first! This is why GTM containers are usually placed as high in the head as possible.

This applies for variables in script imports as well. You can reference these variables correctly as long as the script imports are in the right order.

- A very slight detail: Concrete values passed into the function are called arguments while variables passed into it are called parameters.

# The Nature of a Function

A function is essentially an object and is, as such, placed in the Heap along with the other reference values. Functions can be expressions or definitions and there is no functional difference between the two besides when it comes to hoisting.

## Hoisting

Functions are hoisted by Javascript so function DEFINITIONS can be declared after they are used/called.

However function EXPRESSIONS(arrow functions) do not have this utility.

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

# Arrow Syntax () =>

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

Something to watch out for: try not to place these in other functions as this will only return out of that specific function!!

Note that this returns from a FUNCTION, not a STATEMENT. It will break right through any statements you put it into.

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

This is so that an object is bound to a function (and a new object-specific function is created) and then that object is referenced in that function by the 'this' keyword.

The reason to do this is that otherwise, when the function is invoked, 'this' will refer to the document itself and not be locally scoped to the object.

1.  an object to a function by creating a new function
2.  Reference it using 'this' in the original function

The point is convinience when it comes to parameters. This way functions can be written in such a way that they do not need an excessive amount of parameters passed into it. An example of this is React components where the 'this' can be used to refer to props instead of referring to the passes in props by name.

The easiest way to think about it is giving each object its own function based on a template. Sort of how a class-based object would act with its own functions! Except you create a new function each time.

<script>
const c1 = {
  x:5,
  y:10
}

function printCoordinates(){
  console.log(this.x); // output: 5
}

const c1_func = printCoordinates.bind(c1); // new function is old function bound to object

c1_func();
</script>

Bind is also a very good way of tying event handlers to dynamic or repeated Elements as they are considered Node Objects. Please see Project 5 for a very clear example.

## DO NOT USE WITH ARROW FUNCTION ()=>

You cannot rebind this in an arrow function. It will always be defined as the context in which it was defined. If you require this to be meaningful you should use a normal function.

# call() and apply()

This does the same as bind() but they execute the function immediately instead of preparing the functions.

# Overloading

One aspect that not many people ever think about with JavaScript is that if you define multiple functions with the same name then the last one defined will be the one that actually runs. JavaScript functions are not polymorphic the way that functions in many other languages are in that JavaScript doesn't care if the actual arguments defined for the functions are different as it can't distinguish between them on that basis. Where in other languages you might have myfunc(oneparm) and myfunc(parmone, parmtwo) as two separate functions with the one that gets run depending on the number of parameters passed, in JavaScript the last one defined will always be the one run regardless of the number of parameters.

# Pure Functions

In a pure function:

1. The same input ALWAYS produces the same output.
2. It does NOT change anything outside the function!

<script>
  // pure function
function add(num1, num2) {
  return num1 + num2;
}

// impure functions
function addRandom(num1) {
  return num1 + Math.random();
}

let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum;
  return sum;
}

const hobbies = ["Sports", "Cooking"];

function printHobbies(h) {
  h.push("NEW HOBBY");
  console.log(h);
}

</script>

An example of an impure function could be a function that has an HTTP request since it is interacting with something that is outside of the function. I.e: it has 'side effects'. It could also be as simple as changing a variable outside the function. This includes arrays and objects outside the function.

Typically it is best to use pure functions. This is because it is reliable and does not have any unforseen side effects. This keeps your functions predictable and pure. Always aim for as many pure functions as possible.

# Factory Functions

The point of a factory function is to product another function.

<script>
  // without factory function

function calculateTax(amount, tax) {
  return amount * tax;
}

const vatAmount = calculateTax(100, 0.19);
const incomeTax = calculateTax(100, 0.19);

// with factory function

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }
  return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(300));

// with callback function

function calculateTaxEasy(amount, getTax) {
  return amount * getTax();
}

console.log(calculateTaxEasy(100, () => 0.19));
console.log(calculateTaxEasy(100, () => 0.25));

</script>

As you can see, a different function is created each time the factory function is called with a different fixed value in it.

This may have greater utility when there are more complex operations that need to be done to determine Vat or IncomeTax (interaction with servers) before it is multiplied by amount.

Note that the same could be done by using callback functions but using a factory function allows you to narrow things down a bit more and constrain the functionality of the function call.

# Closures

Every function in JavaScript is a closure.

In short, the function closes over its lexical environment and locks in access to any variables outside of its scope by REFERENCE and not by value. Therefore even if the variable is changed later on before the function is called, the function will use the newly updated value!

TLDR: The function will use the latest version of a variable in the code.

<script>
  let userName = "Max";

function greetUser() {
  console.log("Hi " + userName); // will output 'Manuel'
  let name = userName; // name will still refer to 'Manuel' inside this function!
  console.log(name); // will output 'Manuel' as the inner lexical environment trumps outer
  console.log(name2); // will output 'Max' as name2 is present in outer lexical environment
}

userName = "Manuel";

let name = "Anna";

let name2 = "Max";

greetUser(); 
</script>

Note that this somewhat violates the initial rule of primitive variables being passed by value. Just rememebr that this exception occurs only:

1. When the original variable is a global variable
2. When it is copied over inside of a function

So if you see your function having a different value for a global variable, it may be the case that this variable was changed after the function was declared and built.

# Recursion

The idea of recursion or a recursive function is that the function calls itself!

 <script>
  // non-recursive function
function powerOf(x, n) {
  let result = 1;

  for (var i = 0; i < n; i++) {
    result *= x;
  }
  return result;
}

// recursive function

function powerOfRecursive(x, n) {
  if (n === 1) {
    return x;
  }
  return x * powerOf(x, n - 1);
}

</script>

This is interesting but what practical application does recursion have? Let us consider deeply nested structures. For example:

<script>
  const myself = {
  name: "Max",
  friends: [{ name: "Chris" }, { name: "Julia" }],
};
</script>

Note that each person object could have a friends array with person objects that have a friends array and on and on.

<script>
  const myself = {
  name: "Max",
  friends: [
    { name: "Manuel", friends: [{ name: "Chris" }] },
    { name: "Julia" },
  ],
};

// FOR LOOP FAILURE
function printFriendNames(person) {
  // we do not know how many nested for loops to do!
  for (const friends of person.friends) {
  }
}

// RECURSIVE SOLUTION
function printFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...printFriendNames(friend));
  }

  return collectedNames;
}

console.log(printFriendNames(myself));

</script>
