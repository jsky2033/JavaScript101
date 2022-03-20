/*
Create an array of numbers (of your choice) and perform three array
operations on it: filter for numbers greater than 5, map every number to
an object which holds the number on some property (e.g. "num") and
reduce the array to a single number (the multiplication of all numbers).
*/

const numArray = [3, 4, 10, 23, 5, 6, 12, 13, 2, 9];

const filteredArray = numArray.filter((num) => num > 5);

const mappedArray = numArray.map((num) => {
  return { elementNumber: num };
});

const reducedArray = numArray.reduce(
  (prevValue, curValue) => prevValue * curValue,
  1
);

/*
Write a function ("findMax") which executes some logic that finds the
largest number in a list of arguments. Pass the array from task 1 split
up into multiple arguments to that function.
*/

const findMax = (...numbers) => {
  let max = numbers[0];
  for (const num of numbers) {
    if (num > max) max = num;
  }
  return max;
};

findMax(...numArray);

/*
Tweak the "findMax" function such that it finds both the minimum and
maximum and returns those as an array. Then use destructuring when
calling the function to store the two results in separate constants.
*/

const findMinMax = (...numbers) => {
  let max, min;
  max = min = numbers[0];
  for (const num of numbers) {
    if (num > max) max = num;
    if (num < min) min = num;
  }
  return [max, min];
};

const [mininmum, maximum] = findMinMax(...numArray);

/*
Create a list (and possibly some surrounding logic) where you ensure
that NO duplicate values can be added. Use whichever approach seems
appropriate to you.
*/

const userIds = new Set();
