# Expressions vs Statements

An expression is something that returns a value and can be used from the right side of an equal sign. For example a function expression or a ternary operator is an example of something that returns some value.

On the other hand the if statement has no such return, it just controls logic so it is an example of a statement.

# Javascript Engines

Every browser has a JS engine and they do the parsing and execution. This engine contains an interpreter and a JIT compiler. The interpreter translates the script into bytecode and hands off this bytecode to the compiler.

The browser does give you some APIs to use with the JS code. Such as location services. These APIs themselves are written in C++ and built into the browser.

## The Heap

The heap refers to memory allocation. It stores data in system memory (RAM) and manages access to it.

## The Stack

The stack is the short term memory. It manages program flow: it keeps control over which function is currently executing and if a function returns, to which function it is returning to.

When the script runs, the stack is being used. The browser pushes the execution onto the stack.

stack -> LIFO

The Stack is a temporary data structure that holds all of the functions called. When functions are called, they are added on top of the stack.

When a function returns or completes the action, it is popped off the stack.

To view the stack itself, go to the console in the browser and then,

Sources -> click on the breakpoint you want

Reload the page

Use the down arrow key to step down through the stack.

## Threading

JavaScript is SINGLE-THREADED. Only one thing happens at a time and the stack shows one how this proceeds.

This makes some sense as JavaScript is really a language for browsers not backends.

# Primitive vs Reference Values

## Primitive Values

- Strings
- Number
- Boolean
- null
- undefined
- Symbol

These are stored in memory (normally on Stack) and the variable stores the value itself.

Copying a variable (assigning to a different variable) COPIES the value itself. The implication is quite important. This means that there is a copy by value.

<script>
let userName = "Max";
let anotherUser = userName;
userName = 'Manuel';
</script>

anotherUser retains the value 'Max' because that value is directly COPIED over. So copying a variable means copy by value for primitive data types. 

## Reference Values

These refer to all other objects. They are more expesnive to create and are stored in the Heap. 

As such the variable only stores a pointer (address) to location in a memory. So think of the variable itself as a memory address such as 00012CCXGW. 

Copying a variable (assigning to different variable) copies the pointer/reference and not the value itself.

<script>
let hobbies = ["Sports"];
let newHobbies = hobbies;

hobbies.push("Cooking");

console.log(hobbies); // Sports, Cooking
console.log(newHobbies); // Sports, Cooking

console.log(newHobbies = hobbies); //Output: true

let person1 = { age: 30 };
let person2 = { age: 30 };

console.log(person1===person2); // Output: false
</script>

* As such, both newHobbies and hobbies both have the changes reflected to just  hobbies. This is because copying over the array simply gives the second variable a pointer to the location in memory of the first. 

The same logic applies to objects as well. 

* Since the variables themselves refer to memory addresses, using an equality operator on them will return false when two objects/reference types are set equal to each other even when they contain the same data. 

However note that hobbies and newHobbies are still equal to each other because in that case the pointers are literally the same. 

* Every time you assign the variable to a new array or an object, you create a brand new memory location and a new pointer to it. 

Also note that pushing KV pairs or items to the object will not impact the memory address itself. This is not blockchain. 

## Why is this important?

Because it leads to confusion sometimes when certain arrays or objects are changed seemingly without explanation at times. This is due to the fact that these objects are simply references to other objects and that the 'original' had been changed.

Keep this in mind when setting objects or arrays equal to each other!!!