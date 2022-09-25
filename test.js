const person = {
  name: "Max",
  greet() {
    console.log(this.name);
  },
};

person.greet();

console.log(Object.getOwnPropertyDescriptors(person));