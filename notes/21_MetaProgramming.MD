# Symbols

These are primitive values that can be used as object property identifiers just like numbers, strings etc.

But what makes this unique is that each symbol is unique and cannot be overwritten!

Let us say we have a library and we would like to restrict what properties a user can change on the objects being used.

<script>
// Library land

const uid = Symbol("uid");

const person = {
  [uid]: "p1",
  name: "Max",
  age: 30,
  [Symbol.toStringTag]:'User'
};

// app land => Using the library

person.id = "p2"; // will not change uid

console.log(person); 

console.log(Symbol("uid") === Symbol("uid")); // will return false! Each symbol is unique

person[uid] = "p5";

console.log(person); // will change uid

</script>

Note that while the last line will change the uid, this will not matter as the original symbol reference is not exposed to the end user!

# Well Known Symbols

There are some built-in symbols that were not exposed to developers in ES5 and before. They contain some useful iterators but one particularly useful one is the toStringTag

<script>
    const person = {
  [uid]: "p1",
  name: "Max",
  age: 30,
  [Symbol.toStringTag]:'User'
};
</script>

When the .toString() method is now used on the person object, 'User' will appear in the console output.

# Iterator

An iterator is simply an object with a next() method in it. It allows us to have custom looping logic for any field in an object

<script>
const company = {
  curEmployee: 0,
  employees: ["Max", "Manu", "Anna"],
  next() {
    if (this.curEmployee >= this.employees.length) {
      return { value: this.curEmployee, done: true };
    }
    const returnValue = {
      value: this.employees[this.curEmployee], // actual value
      done: false, // loop status
    };
    this.curEmployee++; // loop index
    return returnValue;
  },
};

let employee = company.next();

while (!employee.done) {
  console.log(employee.value);
  employee = company.next();
}
</script>

You are essentially creating a looping logic (very similar to a for loop) for the field in the object. This can be useful if you want to apply differing logic to each field of arrays or other iterable objects.

This way you can loop every two items, loop through only specific items etc.

# Generator

A Generator is a special type of function that automatically generates iterators. The two key pieces of it are the 'yield' keyword and the return value.

The 'yield' keyword stops execution at a certain point in the loop and only allows for the iterator to move forward if and only if the next() function is called.

<script>
const company = {
  employees: ["Max", "Manu", "Anna"],

  getEmployee: function* employeeGenerator() {
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
    console.log("End of Loop");
  },
};

const it = company.getEmployee();

let startLoop = it.next();
while (!startLoop.done) {
  console.log(startLoop.value);
  startLoop = it.next();
}

// console.log(it.next()); // output: { value: 'Max', done: false }
// console.log(it.next()); // iterator proceeds from 'yield' lane

</script>

# Symbol + Generator = Easy Custom Iterator!

Now what we can do is utilize Symbols to set an objects DEFAULT iterator to be one we want it to be.

<script>
const company = {
  employees: ["Max", "Manu", "Anna"],
  [Symbol.iterator]: function* employeeGenerator() {
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  },
};

for (const employee of company) {
  console.log(employee);
}

console.log(...employees); // will output array contents
</script>

So now we have now given our object iterable logic that we have defined ourselves.

Note that the above could be done simply with a normal next() method but doing it this way requires much less code.

In fact this is what occurs under the hood for Arrays! Remember that they are objects too!

# Reflect API

This is an API that allows us to control objects. It has standardized and grouped methods that specialize with objects.

Note that you can also do a lot of the same with the Object API. However there are two advantages of Reflect.

- Reflect API has better error handling
- Reflect API bundles all the features you need to work with objects

<script>
  const course = {
  title: "JavaScript - The Complete Guide",
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  },
});
</script>

# Proxy API

A Proxy API operates on the principle that you are wrapping an object inside another object. It also introduces several methods that can now be used with your new object.

<script>
const course = {
  title: "JavaScript - The Complete Guide",
};

const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    return obj[propertyName] || "Not Detected";
  },
  set(obj, propertyName, newValue) {
    obj[propertyName] = newValue;
  },
};

const pCourse = new Proxy(course, courseHandler);

pCourse.rating = 5; // call set
console.log(pCourse.title); // call get

</script>

Coursehandler refers to the set of objects you want transferred to your proxy course object.

'get' and 'set' is one of the many functions that the Proxy API has and runs every time you try to access or set an object property from the proxy.

Note that it is different from normal getters and setters as they will generically fire for all attempts to access or set properties. 