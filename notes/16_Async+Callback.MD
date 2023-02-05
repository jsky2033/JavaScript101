# Synchronous Code

JavaScript is single-threaded in contrast to langauges such as Java. This means that only one task can be completed at a time. Tasks are completed in sequence.

But what if some code requests that take longer than others (such as Http requests, timers, user inputs, user location etc.)

# Asynchronous Code

We get around this by passing off tasks to the browser so that the browser does the task while the Javascript code moves on. Remember that the browser is written in another language (such as C++).

The browser then uses callback functions to communicate with the JS code that the task is done. Callback functions are passed in with the asynchronous function as a parameter and executes when the async code is done.

<script>
const button = document.querySelector("button");
const output = document.querySelector("p");

function trackUserHandler() {
  console.log("Clicked!");
}

button.addEventListener("click", trackUserHandler);

let result = 0;
for (let i = 0; i < 100000000; i++) {
  result += 1;
}
console.log(result);
</script>

In this code, the event listener is passed as a callback to the browser which triggers it upon the event happening.

Due to the linear nature of JavaScript, the click events are only processed once the loop is done. Even though the browser hands the callback to the JS once the event occurs, the JS code thread is still busy with the loop! So the code is not executed until the loop is complete.

# The Event Loop

The Event Loop is NOT part of the JS Engine. It is part of the browser and it's purpose is to synchronize the call stack in the engine with the waiting messages.

It runs all the time and asks, is the stack empty?

If yes, then it pushes any waiting messages or todo functions onto the stack.

In the above example, the call stack is occupied by the for loop while it is counting up. Once it is done, the stack is clear and the event loop can push the todo handler function onto the stack to be executed.

If it is clicked multiple times, the functions are stacked in the message queue.

<script>
function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    // nested callbacks
    (posData) => {
      setTimeout((posData)=>{
        console.log("Nested Timer" + posData);
      }, 10000)
    },
    (error) => {
      console.log(error);
    }
  );
  // sequential callback
    setTimeout(() => {
    console.log("Timer done!");
  }, 0);
  console.log("Getting position..."); // will always execute first!
}
</script>

getCurrentPosition hands off the handler function(s) to the message queue where the event loop will push it back onto the stack IF the stack is empty.

ANY code after the function declaration will immediately be on the stack so JS will always wait for that to finish (and the stack is empty) before moving onto the geolocation function. No matter how fast the geolocation is.

Also note that "Timer done!" will only execute after "Getting Position...". That is because it is placed on the message queue (just like the geo function) while the latter gets placed immediately on the stack. Therefore the stack function needs to execute before it gets clear for the message queue to push something in.

This is why timers aren't always guranteed to work on time. If there is code to execute in the stack, it needs to clear before the event loop can push the timer callback in.

# Promises

A promise is a way of dealing with asynchronous code in JS that allows you to avoid having to deal with nested callbacks shown in the code above. 

<script>
const button = document.querySelector("button");
const output = document.querySelector("p");

/*
The reason the wrapper function was written for the promise was
so that there was a way of transferring data to the promise in
a convinient way.

This is also known as 'promisifying' an API and the point is to place
the code in a sequential promise chain. 

The key thing to remember is that the parameter of the then() is the same
as the parameter of resolve()

resolve(data) ---> then((data)=>{console.log(data)})
*/

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, duration);
  });

  return promise;
};

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (success) => {
        resolve(success);
      },
      (error) => {
        reject(error);
      },
      opts
    );
  });

  return promise;
};

function trackUserHandler() {
  // this is known as promise chaining
  let positionData;
  getPosition()
    .then((posData) => {
      positionData = posData; // if we want to transmit chain data in addition to promise output
      return setTimer(2000); // return promisified function to output its result into next chain segment
    })
    .then((data) => {
      console.log(data, positionData);
    })
    .catch((err) => {
      // will catch anything prior to this
      console.log(err);
    });
  console.log("Getting Position...");
}
</script>

Note that both the then() and catch() blocks always return promises even if you return nothing in them. 

## The catch statement

The catch statement will catch errors prior to where it is placed and proceed to cancel the chain segments before it up until where the error occurred. This allows us to structure our code in such a way that certain pieces of code will not fire if an error occurs but the other ones further down are allowed to. 

Multiple catch statements can be placed throughout the chain and the safe thing to do is to place the catch statement at the very end to serve as a 'catch-all'. 

If there is no other catch statement in the chain, any error at any point will cause the chain to skip to the end catch. 

.finally() can be used at the end to do some cleanup work as it will NOT return a new promise. 


# Async/Await

This STILL uses promises however it allows you to make your code look more like synchronous code. It can look pretty straightforward but it doesn't really 'block' code. It wraps the async function in a big promise and then adds a 'then' statement whenever it encounters an 'await'.

<script>
async function trackUserHandler() {
  // this is known as promise chaining
  try {
    const posData = await getPosition();
    const timerData = await setTimer(2000);

    console.log(timerData, posData);
  } catch (error) {
    console.log(error);
  }
}
</script>

The downside is that the code that occurs immediately after the 'await' will be delayed until the asynchronous code executes. 

Also note that the await statement can NOT work on its own. It definitely needs a function to work. 


## Misc. Promise Methods

### Race

This allows you to choose the fastest promise to be resolved and then fires that one while ignoring the other one:

<script>
  Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});
</script>

### All

The performs all the promises. When the promise is done, the output is passed into the function. The promises will execute in the order of the array. First In, First Out. 

<script>
  Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});
</script>

If one promise is cancelled due to an error, the others are also cancelled. 

### allSettled

This gives you a detailed array of objects which shows which promises were succesfull and which ones failed. 

<script>
  Promise.race([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});
</script>