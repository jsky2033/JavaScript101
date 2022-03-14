# Loops

## Types of Loops

In Javascript there are four types of loops. In most cases we use the for loops however the while loop is useful when we do not know how many times the loop needs to execute.

- for loop

Execute code a certain amount of times with a counter variable.

<script>
    for(let i=0; i<10;i++){
        //some code
    }
    for(let i=10; i>0; i--){
        //some code
    }
    for(let i=10; i>0; ){
        i--;
        //some code
    }
</script>

Something to keep in mind about the for loop. The above will have i be equal to 0 through 9 in the loop itself. So if you were to print out to the console, it would print out 0-9. 

* The increment is done AFTER the loop and the comparison is done IMMEDIATELY AFTER the increment. 

Note that the above are all the same. On the last one, notice you can adjust when the decrement is made and can ensure it comes after your code. Also note that you cannot use const for the counter variable.

- Note when using this to loop through an array backwards, the index variable has to have one subtracted from it.

<script>
for(let i=array1.length-1;i>0;i--){
    console.log(array1[i]);
}
</script>

- for-of loop

Execute for every element in an array

<script>
for(const el of array){
    console.log(el);
}
</script>

Note that const does not change, a new iteration of const is being created with each iteration of the element.

We have no access to the index in this loop however.

- for-in loop

Execute for every key in an object

<script>
for (const key in obj){
    console.log(key);
    console.log(obj[key]);
}
</script>

- while loop

<script>
    //classic while
while(truthyVariable){
    //repeating code
}
    //do while
do{
    //repeating code
}while(truthyVariable)
</script>

Execute code as long as a condition is true. The difference between while and do while is that the do while loop always executes the code at least once.

## Break and Continue

These are used when you would like to interrupt a loop based on whichever condition.

Note that these will only work on the loop closest to it! It will not interfere with the outer loop in any way.

- Break: With this, the entire execution of the loop is stopped and the console will only print up to 2.

- Continue: Here we just want to skip just one iteration and forward to one other iteration.

These would be an alternative to an if-else statement when iterating.

<script>
    // break
for(let i=0; i<5; i++){
  if(i===3){
    break; // stop this loop entirely!
  }
  console.log(i);
}
    // continue
for(let i=0; i<5; i++){
  if(i===3){
    continue; // skip over this iteration and go to next
  }
  console.log(i);
}
</script>

## Labeled Statements

In this case, we can reference exactly which loop we would like to break. In the code below, when the condition is met, not only will the inner loop break but the outer one referenced will break too. 

Consider using the break statement inside of an event listener where the statement will end a loop that is infinitely executing elsewhere. 

<script>
// print 10 to 13 five times
outerFor: for(let i=0; i<5; i++){
  innerFor: for(let i=10; i<13; i++){
    if(i===11){
      break outerFor;
    //   continue outerFor;
    }
    console.log(i);
  }
  console.log("------");
}
</script>

You can also use continue to skip directly to the next step of the outer loop itself. The continue statement above will have the printout be 10 five times. 

## Caution about Coninue and While 

However note that using continue for loops is dangerous if the increment comes later than continue statement. This is because it may simply cause the loop to repeat infinitely as shown below. 

This can happen both without labeled statements and labeled statements but in the former case, your IDE will usually catch it. 

<script>
// labeled infinite loop
let j = 0;
outerFor: while (j < 3) {
  innerFor: for (let i = 10; i < 13; i++) {
    if (i === 11) {
      continue outerFor;
    }
    console.log(i);
  }
  console.log("------");
  j++;
}
// unlabeled infinite loop
let j = 0;
while (j < 3) {
  console.log(j);
  continue;
  j++;
}
</script>