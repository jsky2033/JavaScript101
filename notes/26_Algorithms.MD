# Optimizing an Algorithm

## Get Minimum of an Array

This is the straightforward solution

<script>
  var min = array1[0];

  for (var i = 1; i < array1.length; i++) {
    if (array1[i] < min) {
      min = array1[i];
    }
  }
</script>

However an alternate solution could be to write our own sorting algortihm (JS has a sort method of its own fyi)

## Sorting method

[A,B,C]

We want whatever is in position A to be compared to what is in position B and C. And for this logic to continue even if the values of A,B or C change over time.

If you DO NOT reset position references then we will have values be overwritten by other values while a duplicate remains. Which is NOT what we want to happen in a sorting method.

<script>
      for (var i = 0; i < array1.length; i++) {
    // console.log(outerElement);
    for (var j = i + 1; j < array1.length; j++) {
      let innerElement = array1[j];

      if (outerElement > innerElement) {
        // swap
        array1[i] = innerElement;
        array1[j] = outerElement; // [1, 3, 2]

        // reset position references
        outerElement = array1[i];
      }
    }
  }
</script>

# The Big O Notation

When we have two alogrithms that do the same thing, we want to determine the best approach to take. This is done by comparing how long each operation takes.

This duration is measured in a generalized form, not in time units but in mathematical terms. That is to say, the Time Complexity.

1. Count the number of executions of the different parts. Meaning you count how often each line is reached for a given input.

2. Sort out the executions into blocks. Both these functions have sets of code that execute exactly once at the start and end no matter what input is placed into them. This counts as 1 execution each. The array in the center will run n number of times depending on the array length and b2 denotes the code governed by the loop.

3. Simplify to remove constants that do not depend on n.

4. Determine the mathematical relationship between T and n.

T=n implies a Linear relationship denoted by the Big O notation O(n) which means for
every x increase in input size, the time complexity increases by x as well.

<script>


    function getMin(array1) { // [3,1,2]
  if (!array1.length) { // 1 execution (at most if it even executes)
    throw new Error("Should not be an empty array!");
  }

  var min = array1[0]; // 1 execution

  for (var i = 1; i < array1.length; i++) {  // 1 execution
    if (array1[i] < min) { // 2 executions
      min = array1[i]; // 0-2 executions, 1 real execution
    }
  }

  return min; // 1 execution
}

// T = b1 + n*b2 + b3
// T= n*b2
// T = n
// Linear Time Complexity => O(n)



function sortArray(array1) {
  if (!array1.length) {
    throw new Error("Should not be an empty array!");
  }
  if (array1.length === 1) {
    return array1[0];
  }

  for (var i = 0; i < array1.length; i++) {
    let outerElement = array1[i]; // n times
    for (var j = i + 1; j < array1.length; j++) {
      let innerElement = array1[j]; // n times

      if (outerElement > innerElement) {
        // swap
        array1[i] = innerElement;
        array1[j] = outerElement; // [1, 3, 2]

        // reset position references
        outerElement = array1[i];
      }
    }
  }
  return array1[0];
}

// Time Complexity => n*n => 0(n^2)
</script>

Now if we compare the two equations, we have linear time complexity vs a exponential time complexity. 

So clearly the best function is the first one!

## O(1) Notation

When the input does not matter at all, we have Constant Time Complexity => 0(1). Operations that have this constant include the 'push' function. 

By contrast, shift and unshift requires the re-set of all indices of the array besides the first item. Therefore it has a Linear Time Complexity O(n)

That is why push and pop are much faster!

# Data Structures

A data structure is any entity that can store data. Variables, sets, maps etc. are all includeded. 

Sometimes using different data structures can result in simpler Time Complexities!

<script>
    const age = [30, 29, 54];

age.push(60);

const namePop = [
  { userName: "max", usages: 5 },
  { userName: "manu", usages: 10 },
];

const manuUsages = namePop.find((person) => person.userName === "manu").usages;

// BEST CASE: manu obj is first, CTC=> 0(1)
// WORST CASE: manu obj comes later, LTC=> 0(n)
// AVG CASE:  manu obj comes later, LTC=> 0(n)

const nameMap = {
  max: 5,
  manu: 6,
};

const mapManuUsages = nameMap["manu"];

// AVG CASE: manu obj always found in one execution, CTC => 0(1)
</script>