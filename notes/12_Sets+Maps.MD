# Basics

Here we can break down the similarities between Maps, Sets and Arrays:

## Arrays:

- Store (nested) data of any kind and length
- Iterable
- Many special array methods available
- Order is guranteed
- Duplicates allowed
- Zero based index

Maps and Sets are similar, BUT:

## Sets:

- Order is NOT guranteed
- Duplicates are NOT allowed
- No index-based access

Think of this as a loose box of unique items. There is no order to it as the items as they rattle around in the box and they have no assigned place in the box. The only condition is that they are unique.

This is a data storage that states if the values inside it exist or not.

There are a number of special functions with Sets:

### Use Case Example

Why use this instead of simply using arrays? Because sometimes we want to absolutely ensure the uniqueness of values during runtime such as where the ids of several participants in a game is concerned. We care less about whether these values are uniquely accessible/modifiable and more about whether they exist and are unique!

<script>
const ids = new Set(["E121", "E589", "E735"]);

// This allows for iteration through the set.
for (const entry of ids.values()) {
  console.log(entry); // log out the item itself.
}

// This allows for addition/deletion of a value
ids.delete("E589");
ids.add("E000");

// Simple check to see if it exists
console.log(ids.has("E000"));
</script>

## Maps

- Store key/value data of any kind and length
- Duplicate KEYS are not allowed!
- Key-based access

It is essentially an object with these three differences:

- Map is ordered and iterable
- We can put any type of data as a Map key whereas objects can only have a number, string or symbol as a key

We know that if the object's key is not a string or symbol then JavaScript implicitly transforms it into a string wheras the Map returns the data type of the key.

- A Map inherits from the Map class means it has special functions/utilities that makes working with it a lot easier.

### Use Case Example

Why use this instead of an object? Let us say we have a simple object {name: "Max}. We want more information in this object but we do not want to give it too much because this object is used several times in the application and we want to keep it lean and simple.

So essentially, an object for an object!

<script>
const person1 = { name: "Max" };
const person2 = { name: "Manuel" };

const personData = new Map([
  [
    person1,
    [
      { date: "yesterday", price: 300 },
      { date: "today", price: 400 },
    ],
  ],
  [
    person2,
    [
      { date: "yesterday", price: 800 },
      { date: "today", price: 100 },
    ],
  ],
]);

// add a new purchase to person2's array
personData.set(person2, [
  ...personData.get(person1),
  { date: "next week", price: 20 },
]);
// output all the K/V pairs (no need to use values like for Sets)
for (const [key, value] of personData.entries()) {
  console.log(key, value);
}
// output the keys only (same for values)
for (const key of personData.keys()) {
  console.log(key);
}
</script>
