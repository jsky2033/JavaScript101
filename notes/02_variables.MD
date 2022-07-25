# Variables

A variable is simply a container for some data. JavaScript is a weakly typed language meaning there is no type associated with the variable.

Best practice for variable names is always camelCase. It is a bad practice to use snake-case: user_name.

It is not necessary to 'end' code with semicolon but it is reccomended.

The only names that are not allowed is:
fist Name
first-Name
@firstName
2firstName

Though this is allowed:

- \_firstName
- $firstName
- firstName2

A small disctinction: const, var and let are not data types. They are different types of definitions. Different data types refer to numbers and strings and the like.

Despite being a weakly typed language, data types STILL exist in Javascript. Note that '30' and 30 are not the same despite the equality operator stating that it may be true.

## Global vs Local Scope

ANY variable created outside of a block (that is let or const) is global and ANY variable of the same nature created inside of a block is local.

- Variables created in local scope with the same name will be SHADOWED.

<script>
let thisName="Max";

function Main(){
  let thisName = "John";
  let age = 13;
  console.log(thisName, age); // Output: John 13
}

console.log(thisName); // Output: Max

console.log(age); //will produce error

Main();
</script>

- If it is not already obvious, the local variable definition will be prioritized in local operations and the global one in global operations.

- Also all the variables above could be changed to const and the code would still work.

Global variables are present outside functions or code blocks.

It is considered bad practice to involve global variables inside the function itself. This is because functions should be self contained units. This is known as a pure function.

However functions can access other functions and global variables if needed. In fact it can be used quite well as long as things dont get too complicated. Try not to mix these things up though.

## Const, Var and Let

> const -> global scope, block scope
> let -> global scope, block scope
> var -> global sscope, function scope

Anything within curly braces counts as local scope for const and let while only function counts as local scope for var. Everything else is global.

### Const

Variables cannot be changed. They should be used as much as possible and only switch to let if you want to change it. It is used to make the code easier to understand.

Note that const variables cannot be set to anything else after declaration even if they are set to the same thing.

<script>
const max=30;
max=30;
</script>

Is still an illegal operation!

Also they HAVE to be declared upon initialization. You cannot initialize and re-assign later. This is not like final classes that can be declared but not initialized.

Note that this does not apply to the contents of an object or array which can be changed even though they are const. 

<script>
  // both are legal
const course2 = new Course("Python 2202", "4hrs10min", 20.2);
const a1 = [34, 53];
course2.title = "Jaws 101";
a1[0] = 3;
</script>

### Let

Variables can be changed. The distingushing feature from Var is that it is global scoped as shown above.

### Var

Var has been available from ES5 but let and const have not been introduced until ES6.

- Note that variables that do not have a type definition will have by default, the definition var.

* A minor difference is that var can be redeclared with the latest declaration being the valid one. This is not the case with const and let.

The following will work!

<script>
var thisName="Max";
var thisName="Pax";

console.log(thisName);
</script>

- The big difference is that var only knows global scope and function scope so it will be scope limited only by a function. Whereas let and const will be scope limited by curly braces. 

<script>
var thisName = "Max";

if (thisName === "Max") {
  var hobby = "cooking";
}

function Main() {
  let thisName = "John";
  let age = 13;
  var hobby2 = "cooking";
  console.log(thisName, age); // Output: John 13
}

Main();

console.log(thisName, hobby); // Output: Max cooking

console.log(thisName, hobby2); // will not work
</script>

As shown above, hobby is accessible despite being declared inside of a block but hobby2 is not accessible since it is inside of a function.

- var variables are assigned an undefined value when they are hoisted. Const and let are also hoisted but they are not initialized so any attempt to use them will result in an uncaught error.

<script>
console.log(password); // Output: undefined
console.log(username); // Output: Error

var password = 1234;
let userName="Max";
</script>

On the other hand, this is not very clean code in itself. However this may be a good way of determining where an undefined log comes from!

## When to use the type defintions?

Let and Const forces you to write better, cleaner code as it gives you much greater control on where you want to use your variables.

As a guideline, there is no real reason to use var anymore.

- However note that const and let are not supported in pre-ES6 environments so in that case you would have to use var.

## Strict Mode

<script>
// 'use strict';

userName = 'jack';

console.log(userName);
</script>

What this does is disable certain permissive behavior such as a default type definition.

## Primitives vs Objects

Javascript has 5 primitive data types. String, Number, Boolean, Undefined and Null.

However in Javascript, the variable takes the type of whatever was passed into it.

### Strings

Strings are enclosed in " " or ' '. If you want quotes in String: "'John' eats".

Escape characters are usually placed with the backslash: "\". \n to go to a new line. \'' allows to insert a single quote. The backslash allows us to escape text meanings in syntax. Just put it before anything you dont want syntantically understood by JavaScript.

### Number

Javascript has only one number type and it encloses both int and double. Floats are also covered in this category.

### Boolean

This is used in the same way as all the other languages.

### Objects

Independent data type for grouping and relating data. Introduces key/value pairs and the like.

### Arrays

Important for list data. Unlike other languages, unknown amounts of data are allowed for JavaScript!

### Undefined

Undefined means that the variable was created but nothing was assigned to it. Not defined means that this memory space simply does not exist (variable was not created).

### Null

This is used when we want to actively clear out a value which is previously held. 

## Operators

Operators will follow the same precedence as basic math.

### == vs ====

== does not check for types! So 5=='5' will be true unlike ====

### Type Coercion

This means that a value from one type can be converted to another type on the fly. So if a number is added to a string or some other operation is used, String concatanation is prioritized and the variable is set as string, but with the other operators, the variable is set as a number and the numeric operation is done.

5 + 10 + 'b' = 15b
'b' + 5 + 10 = b510
100-'30' = 70
100\*'30'=300

### Data Type Conversion

Usually when data is retrieved from user inputs, it gets them as strings instead of numbers. As such it can be hard to do numerical operations.

Casting would help if this were a strongly typed language however in this case we need to use parseInt. This will extract out the integer. This can be complicated if actual text characters are attempted to be converted though.

<script>
//convert string to integer
parseInt(value);
//convert to float (decimal numbers)
parseFloat(value);
//convert integer to string
value.toString();
</script>

### null/undefined/NaN

Undefined is the default value for uninitialized variables. DO NOT manually assign undefined as a value.

Null is never assumed by default and is useful in 'clearing' a variable.

NaN is more like an error code that occurs when operations occur with non number values. (eg: 3\*hi).

### typeof

This allows for the type of a variable at runtime to be discovered. Numbers, string, arrays and objects are detected. Note that array is counted as type of object.

## Assigning multiple variables

<script>
//assign to different variables
let name1="Jack", name2="Jill";
//assign to the same variable
let name1,name2;
name1=name2="James";
</script>
