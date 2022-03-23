# Basics

Objects are declared with {} and are accessed using the dot notation or with square brackets using the key. Though this latter process is less desirable.

An object is an important data dtructure as it often reflects real-world entities. They are made up of properties and methods. Allow you to "group" related data together.

Anything that is not a primitive value is an object.

Let us take a look at a basic object.

<script>
const person = {
  name: "Max",
  "last-name": "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there!");
  },
};
//change a property
person.age = 50;
//add a property
person.isAdmin = true;
//delete a property and its key
delete person.age;
//delte a property value but retain key
person.age = null;
//copy over a property
let personHobbies = person.hobbies;

console.log(person);
console.log(person["last-name"]); //how to access unusual keys
</script>

- Note that changing person.age is valid because the variable person itself is a reference and is not really changing.

- Although numbers can be used as keys it should be noted that they should be accessed through square brackets.

# Dynamic key value access

What if we wished to access a property but we wanted to dynamically change which property we wanted to access by having a dynamic key?

<script>
const person = {
  name: "Max",
};
const accessor = "name";
console.log(person[accessor]);
</script>

Note that person.accessor doesn't really work so if you would like to use a dynamic accessor to the object then it is best you use the square brackets.

# Dynamic key setting

What if we wished to set a key/value pair but by using a dynamic key?
This may pose a challenge as we do not wish to literally set the variable name to the key.

<script>
const userChosenKeyName = "level";

const person = {
  name: "Max",
  [userChosenKeyName]: "Level 3",
};
</script>

# Shorthand for when key name = key value

In the following example we want the key name to be 'title' while the value variable has the same word for it.

<script>
const title = 'Iron Man 3';
const extraName = 'myComment';
const movie = {
  title,
  [extraName]: 'My favorite Marvel movie'
}
</script>

In this case extraName is not literally set as extraName but myComment is set as the key instead while title is literally the key.

# Copying Objects and the Spread (...) Operator

Similar to how arrays operate, trying to copy over objects through equality will not really work since the variable that is used to access an object is a reference value.

<script>
  const person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there!");
  },
};

const anotherPerson = person;

// this sets BOTH person and anotherPerson age to 50
person.age = 50;
</script>

Therefore if you want to copy over an object be cognizant of this! Also note that if you find your object or array suddenly changing values without explanation this could be due to two causes:

1. The object is a copy of another object and the original is being changed.
2. The object has a copy which is being changed.

So to properly create a brand new object that is divorced from the original object you would do the following. Note that the hobbies array is copied as a reference UNLESS you also use the spread operator in it as well.

<script>
const anotherPerson = { ...person, age: 29, hobbies: [...person.hobbies, 'Golfing'] };

// you could also do this through the assign method though the above is more reccomended. 
const person2 = Object.assign({}, person);
</script>

# Destructuring the Object

Let us say we want to pull out specific variables from the object.

<script>
const person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  greet: function () {
    alert("Hi there!");
  },
  extraInfo: {
    sleepingPattern: "nocturnal"
  }
};

// age is just the value
// otherProps is an object containing the remainder
const { age, ...otherProps } = person;

// pull out age and assign it to a variable with a new name, extract age AS personAge
const { age: personAge } = person;
</script>

# Checking for existence of keys

Both of these execute if the key does not exist.

<script>
if(!('info' in movie))
if(movie.info===undefined)
</script>

# The 'this' keyword

Inside functions, "this" will always refer to whatever called that function! Therefore if the function is called on the document itself then 'this' refers to the document. On the other hand if it was called by an object (making it a method) then 'this' would refer to the object itself.

- This (pun intended) is also the case for functions that are created as a result of an object being bound to a function.

- This (pun intended again) also allows us to insert logic into our objects rather than simply making them store data.

- Using 'strict mode' on the global js file means that using 'this' inside of (non arrow) function will now be undefined as the browser will no longer fix the problem of it not referring to anything.

<script>
const person = {
  name: "Max",
  age: 30,
  hobbies: ["Sports", "Cooking", "Golfing"],
  greet: function () {
    const greetingText = `Hello there ${this.name}, did you enjoy ${
      this.hobbies[Math.floor(Math.random() * 3)]
    }`;
    console.log(greetingText);
  },
  meet(newPerson){ // another syntax for putting functions here
    console.log(`Hello there ${newPerson}`);
  },
  extraInfo: {
    sleepingPattern: "nocturnal",
  },
};

person.greet();
</script>

## bind()

Remember bind? It is a way of tying functions to objects and returning a new function tied to the object. The following is a continuation of the "person" function and involves creating a new function just for person1 based on the sleep() function template.

Remember that these are function methods! They are called by the Function on the Object.

<script>
function sleep(time) {
  console.log(`${this.name ? this.name : "Person"} is sleeping at ${time}`);
}

const person1Sleep = sleep.bind(person1);

person1Sleep("10:00AM");
</script>

## call() and apply()

With call() we do something similar, however the difference is that we execute immediately instead of creating a new function. We can also pass in parameters as a comma seperated list.

apply() is the same as call() except we pass in the parameters as an array.

<script>
function sleep(time, duration) {
  console.log(
    `${this.name ? this.name : "Person"} is sleeping at ${time} for ${duration}`
  );
}

sleep.call(person1, "9:00AM", "3 hours");
sleep.apply(person1, ["9:00AM", "3 hours"]);
</script>

## 'this' and Event Listeners

Remember we said earlier that 'this' refers to whatever is calling the object. Therefore, in functions assigned as event listeners to elements, the keyword would refer to whatever element the event occurs in. In the case of:

<script>
searchBtn.addEventListener("click", searchMovieHandler);
</script>

The button is 'this' in the context of the searchMovieHandler function. Again, this is only if an arrow function is NOT used.

## () => Arrow Functions

This special ES6 function format do not bind 'this' to anything. It will always refer to the global window itself and will never be overridden. Given this (pun intended again I'm sorry I'll stop :P ) weakness why use it at all with objects?

What if the function inside the object would like to iterate through lists or arrays in the object itself:

<script>
const members = {
  teamName: "Blue Rockets",
  people: ["Max", "Manuel"],
  getTeamMembers() {
    // this.people.forEach(function (p) { will lead to a global 'this' as it is called without an object
    this.people.forEach((p) => {
      console.log(`${p} - ${this.teamName}`);
    });
  },
};

members.getTeamMembers();
</script>

Note that this ensures the arrow syntax when iterating will ensure that there is no binding in the iterating function of 'this' to anything. Thus 'this' will fall back to the outer binding which comes from the outer function that identifies 'this as the current object.

## Calling an Object method on a different Object

<script>
const person = {
    name: 'Max',
    greet() {
        console.log(this); // ???
        console.log(this.name);
    }
};
 
const admin = { age: 30 };
 
admin.greet = person.greet;
admin.greet();
</script>

Note that even though functions are passed by reference, since 'this' will always refer to whatever called it, having the admin object call the function that was copied over means that the 'this' in greet will refer to admin when admin calls it.

# Getters and Setters

What if we wanted to restrict how properties inside of objects are accessed? Much like how private variables are accessed inside of Java.

Note that the internal reference is different from the external reference.

<script>
const members = {
  set teamName(val) {
    if (val.trim() === "") {
      this._teamName = "Default Name"; // _teamName is the INTERNAL reference
      return;
    }
    this._teamName = val;
  },
  get teamName() {
    return !this._teamName ? "Default Name" : this._teamName;
  },
  people: ["Max", "Manuel"],
  getTeamMembers() {
    this.people.forEach((p) => {
      console.log(`${p} - ${this._teamName}`); //use internal reference
    });
  },
};

console.log(members.teamName); // will return Default Name
members.getTeamMembers(); // will have undefined for team name

members.teamName = "Red Rockets";
members.getTeamMembers();
</script>

* Keep in mind that there is no internal default value for _teamName until it is set. If you want to do this the solution is to use a Proxy. 
