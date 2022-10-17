function Person() {
  console.log("hello");
  // this = {};
  this.age = 30;
  this.name = "Max";

  this.greet = function () {
    console.log(`Hello I am ${this.name} and I am ${this.age} years old`);
  };

  // static functions, ca
  Person.describe = function () {
    console.log("Creating persons...");
  };
  // return this;
}

Person(); // doesn't have to be called with "new"

const person = new Person(); // this 'new' keyword is what creates the instantation
person.greet();

