# Basics

Arrays are not limited by size in JavaScript and are declared like variables. They are accessed with [] and added to with .push, note that push can accept multiple parameters.

# Iterables

An iterable is an object that has the iterator method and Symbol. This means we can use a for-of loop on this. Not all iterables are arrays though!

An Array-like Object has a length property and uses indexes to access items. NodeLists and Strings are an example of this. They also have access to the array class methods. 

# Array class static methods

The Array class has some static methods that can be used!

<script>
const numbers = [1,2,3];

// new array of fixed length
console.log(new Array(5));

// create array from the inputs
const yetMoreNumbers = Array.of(1,2);
console.log(yetMoreNumbers);

// convert array-like object to array
const moreNumbers = Array.from('Hello There!');
console.log(moreNumbers);
</script>

# Array types

Javascript allows for much more freedom in what sort of data types in the array are allowed. So for example:

<script>
const hobbies = ["Cookies", "Sports"];

const personalData = [30, "Max", { moredetail: [] }];

// multi-dimensional array
const analyticsData = [
  [1, 1.6],
  [-5.4, 2.1],
  [5.6, 30],
];

for (const data of analyticsData) {
  for (const dataPoint of data) {
    console.log(dataPoint);
  }
}
</script>

# Array instance methods

## Simple removal and addition

<script>
const hobbies = ["Cookies", "Sports"];

// add to end
hobbies.push("Reading");
// add to start
hobbies.unshift("Coding");
// remove last element from array
const poppedValue = hobbies.pop();
// remove first element from array
const poppedValue2 = hobbies.shift();
</script>

- push and pop are actually much faster than shift/unshift

- placing an element like hobbies[9] = "Test" will create empty spaces (undefined) up until the targeted index.

## Replacing elements and copying arrays

- splice

This is used to remove element(s) from an existing array.

The splice method is only available on array instances, not array-like objects. This may be why we convert the array-like object to an array.

<script>
const hobbies = ["Cookies", "Sports", "Reading", "Coding"];

// 1 -> start at index 1, index 1 INCLUSIVE
// 0 -> delete 0 elements
// Food -> insert Food at this location
// essentially, insert Cooking after index 1
hobbies.splice(1, 0, "Food");

// remove element at index 2 and return the removed item(s) as an array
const splicedItems = hobbies.splice(2, 1);
</script>

- Doing splice(x) would delete everything past the 'x' value index inclusive!

Splice alters the array itself, much like pop() does.

This is useful for getting all values past a certain index

- slice

This is used to create copies or slices (hence the name) of your array! Note that it is also different from splice in that the two parameters refer to the start and end indices. The start index INCLUSIVE and end index EXCLUSIVE.

<script>
const hobbies = ["Cookies", "Sports", "Reading", "Coding"];

const storedHobbies = hobbies.slice(-3,-1);

console.log(storedHobbies); // would output: 
</script>

- Negative indexes in either case refer to the elements counted from the right to left with the zero index not counted.

<script>
const hobbies = ["Cookies", "Sports", "Reading", "Coding"];

// const storedHobbies = hobbies.slice(1,2); // output: Sports
const storedHobbies = hobbies.slice(-3,-1); // output: Sports, Reading

console.log(storedHobbies);

</script>

## Combining Arrays

This is done using the concat method. This allows for the creation of a brand new array by combining the two arrays.

- array3 = array1.concat(array2)

## Searching by Value

### With Primitive Values

The indexOf method allows for the search of the array to determine the index of a certain value.

<script>
const hobbies = ["Cookies", "Sports", "Reading", "Coding", "Sports"];

hobbies.splice(hobbies.indexOf("Sports"), 1);
</script>

The above would remove the first instance of "Sports" from the array.

- lastIndexOf would remove the last instance of "Sports" from the array.

* If the return is -1, then this value does not exist!

There is a method that does this comparison check.

<script>
let found = false;

found = hobbies.indexOf("Reading") !== -1;
//this is equivalent to
found = hobbies.includes("Reading");
</script>

### With Reference Values

This works as long as the values in the array are primitive values. If reference values are used then you would simply get a return of -1. Why is that? Remember that all objects are referred to by their memory address, which are not the same at all! Therefore when we try to find something equal to the memory address it will not work.

<script>
const persons = [
  { name: "Max", age: 25 },
  { name: "Mark", age: 21 },
];

console.log(persons.indexOf({name: "Max"})); // returns -1
</script>

The solution is to use find() which accepts a callback function in the parameter which gets executed on every element in the array.

- Note that the person object itself is inside the callback, which means you can perform some operations on the person attributes to find the desired match.

For example, you may want to match for the result of a mathematical operation involving two of the attribute values in the object.

<script>
const persons = [
  { name: "Max", age: 25 },
  { name: "Mark", age: 21 },
];

// gets reference of the object, find does NOT create a copy!!
const personMark = persons.find((person, idx, persons) => {
  return person.name === "Mark";
});

personMark.name = "Jack"; // changes object through reference

console.log(personMark, persons); // will reflect new name Jack in both structures

// gets index of object
const personMaxIndex = persons.findIndex((person, idx, persons) => {
    return person.name === "Max";
  });

console.log(personMaxIndex); // will return 0
</script>

## Alternative to For Loops

Let us say we wanted to perform some sort of operation on every element of the array. A for loop could be used to go through it.

### forEach

forEach essentially replaces this and also allows us to use the index!

This is similar to find but we do not have to return anything.

<script>
const prices = [4, 5, 3.99, 6.32, 7.44];

const tax = 0.19;

const taxAdjustedPrices = [];

prices.forEach((price, idx, prices) => {
  const priceObj = { index: idx, taxAdjustedPrice: price * (1 + tax) };
  taxAdjustedPrices.push(priceObj);
});
</script>

### map

This is if you want to create a new array based on the old one where the new array's elements are variations of the old elements. Unlike forEach, a brand new array is created.

<script>
const prices = [4, 5, 3.99, 6.32, 7.44];

const tax = 0.19;

const taxAdjustedPrices = prices.map((price, idx) => {
  return { index: idx, taxAdjustedPrice: price * (1 + tax) };
});

console.log(taxAdjustedPrices);
</script>

## Sorting the Array

This allows you to sort the array in an order you determine. By default it casts everything to a string and then uses string logic to sort the values (where the first character is used for comparison). For example 10<3 because 1<3.

The sort method takes in a sorting function as a callback which allows the caller to dictate the logic of the sorting algorithm. This callback is given a pair of values and it uses that pair to sort.

So to sort from lowest to highest:

<script>
const sortedPrices = prices.sort((a, b) => {
  if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  } else {
    return -1;
  }
});
</script>

To reverse the order simple invert the negative/positive signs.

reverse() also simply reverses order.

## Filtering the Array

This allows you to create a new array which is a subset of the original array based on logic that you can define.

Return true if you want to include that element in the new array.

<script>
const prices = [4, 5, 3.99, 6.32, 7.44];

const filteredArray = prices.filter((price, index, prices) => price>5);
</script>

## Summing up the array

Let us say you want to get some sort of accumulated result of all the values in the array. To reduce means to reduce the data strucutre to a simpler value.

<script>
const prices = [1,2,3];

// second parameter is the initial value of the reduced result
const sum = prices.reduce((prevValue, curValue, curIndex, prices) => {
  return prevValue + curValue;
}, 0);
// 0 + 1 -> First Execution
// 1 + 2 -> Second Execution
// 3 + 3 -> Third Execution
</script>

## Chaining array methods

<script>
const originalArray = [{ price: 10.99 }, { price: 5.99 }, { price: 29.99 }];

// get sum of prices over 10
const sumOfPrices = originalArray
  .map((priceObj) => priceObj.price)
  .filter((price) => price > 10)
  .reduce((curVal, prevVal) => curVal + prevVal, 0);
</script>

# Arrays and Strings

## String to Array

Let us say we are reading data from a CSV file. We get three items of data in a long string and we wish to seperate it into elements of data.

The split function turns the string to an array along the character given in the parameter.

<script>
const data = "new york;10.99;2000";

const dataNames = ["City", "Price", "Year"];

const transformedData = data.split(";").map((dataPoint, idx) => {
  return { [dataNames[idx]]: dataPoint };
});

// expected output: [new york,10.99,2000]
</script>

## Array to String

The parameter determines what sort of seperation exists between the string parts.

<script>
const names = ["James", "Black"];

const combined_name = names.join(' '); // output is James Black
</script>

# Copying Arrays and the Spread (...) Operator

The spread operator allows for the fragmentation of arrays and objects into their constitutent elements/key-value pairs so that they can then be included in other, similar data structures.

<script>
const names = ["James", "Black"];

const copiedNameFragments = [...names];

names.push("Mr");

console.log("Original array: " + names); // Output: James, Black, Mr

console.log("Copied array: " + copiedNameFragments); // Output: James,Black
</script>

Note that you are creating a brand new array here. This allows you to avoid the pitfalls of copying over reference values as mentioned before.

The spread operator can also be used when functions want to accept an undetermined number of parameters.

Note that even in the destructured state of the accepted parameter, it is still possible to treat the inputs as a single array

<script>
const findMax = (...numbers) => {
  let max = numbers[0];
  for (const num of numbers) {
    if (num > max) max = num;
  }
  return max;
};
</script>

## Be careful when about inner reference values when copying reference values!!!

However you should note that this ONLY applies to the copied array itself! Not to any reference values that may be inside of it.

<script>
const persons = [
  { name: "Max", age: 30 },
  { name: "Manuel", age: 31 },
];

const copiedPersons = [...persons];

persons[1].age = 52;
// note that copiedPersons[1].age = 52 does the same thing!
</script>

The age of Manuel is altered in both arrays because the copied array still contains references to the objects created in the original array. Note that making changes inside the copied array also does the same inside the original array.

So how do we get around this?

<script>
const persons = [
  { name: "Max", age: 30, hobbies: ["Driving, Coding"] },
  { name: "Manuel", age: 31, hobbies: ["Archery, Golfing"] },
];

const copiedPersons = persons.map((person) => ({
  name: person.name,
  age: person.age,
}));

copiedPersons[1].age = 52;
</script>

Now we can forcefully create new objects based off the old objects. Note that this will not solve the problem with the hobbies arrays! This is because those arrays are not copied over.

That is fine as long as we do not want to copy those over. Instead of copying all the reference values over, think about what you want to copy over specifically.

# Extract and Assign from an Array

This gets the first two elements out of the array and assigns them.

<script>
const [mininmum, maximum] = [35,34,21,34];
</script>

# Destructuring Arrays

Let us say we only want to use specific elements from an array. This saves us the time of accessing the array via index or value.

<script>
const persons = [
  { name: "Max", age: 30, hobbies: ["Driving, Coding"] },
  { name: "Manuel", age: 31, hobbies: ["Archery, Golfing"] },
];

const [firstPerson, secondPerson, ...otherPersons] = persons;
</script>
