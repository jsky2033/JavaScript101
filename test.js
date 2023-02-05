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

/*

*/

button.addEventListener("click", trackUserHandler);

Promise.allSettled([getPosition(), setTimer(1000)]).then((data) => {
  console.log(data);
});

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += 1;
// }

// console.log("result");
