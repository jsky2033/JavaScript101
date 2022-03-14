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
