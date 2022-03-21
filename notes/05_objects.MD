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