# What is OOP?

This is a method of organizing code that involves using entities.

# Classes and Objects

Classes are blueprints for objects so that objects can be re-created using these classes. Objects are Instances of classes which define what properties and methods the object has.

So classes can be used to group together objects that have a similar structure but different data.

# Field vs Property

A property is a field that has been given a definition.

# Hoisting in Classes

Note that classes have limited hoisting. They can be used inside other classes before they are defined. HOWEVER, all classes have to be defined before they are used in the code itself!!

<script>
    class ProductList(){
       new Product(); // used before defined
    }
    class Product(){
    }

    const productList = new ProductList(); // this has to come last however!
</script>

# Event Listeners inside Class Methods

While event listeners can be assigned inside of Class Methods, there is one quirk:

<script>
    // class for Product rendering
class ProductElement {
  constructor(product) {
    this.product = product;
  }
  render() {
      // some code
    console.log(this.product); // this still works!
    addCartButton.addEventListener("click", function(){
      console.log("Adding product to cart...");
      console.log(this.product.title); // this does not work!
    });

    // solution #1: use arrow keys, this always refers to whatever is outside function
    addToCart() {
    console.log(`Adding ${this.product.title} to cart`);
    addCartButton.addEventListener("click", () => {
      this.addToCart();
        });
    }
    // solution #2: use bind to bind 'this' which is the object itself at the time of exec
    addToCart() {
    console.log(`Adding ${this.product.title} to cart`);
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    }
    

}
</script>

Note that 'this' inside of the function will properly refer to the object itself in a general case. However when it is used inside of an Event Listener, 'this' refers to the global context since it is called outside of the class itself.

There are two ways to solve this

# Static Methods and Properties

Static properties and methods are defined with the static keyword and is only accessible on a class itself! Typically this is used in helper classes (such as the Math class which offers a wide range of mathematical functions) or in global configurations (where there is one class that needs to manage overall app/page data and is used as a conduit for different classes or page components to communicate with each other.)

So we essentially want to use this as state, ie: data that will not change despite page reloads and the like.

<script>
class AgedPerson {
  printAge() {
    console.log(this.age);
  }
  static standardMsg(){
    console.log("Respect your elders!");
  }
}

</script>

# Instances of classes

Note that all instances of classes are object literals! This means that they have the same properties and functionality of object literals.

# Getters and Setters

In Javascript, setters and getters are called directly by the property name and not treated as functions themselves. Setters and Getters are hoisted functions so feel free to use them in any order. For example, we do:

<script>
class ShoppingCart {
  items = [];
  totalOutput;

  get getTotalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }
  
  set setCartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.getTotalAmount}</h2`; // call GETTER (look at the function name)
  }


  addProduct(product) {
    const updatedItems = [...this.items, product];
    this.setCartItems = updatedItems; // CALL SETTER, equivalent to: cartItems(updatedItems)
  }
</script>

Note that the getter is called instead of the variable directly. Also note that the setter is called by setting it equal to whatever you want to pass in as the parameter for it.

TLDR: think of the functions as the attribute itself and pretend that you are accessing the attribute directly but using different names when you do so.

# Inheritance

What if we wanted classes to share properties and methods without copying them over every time?

<script>
class Post {
  // properties
  title = "DEFAULT";
  imageUrl;
  creatorId;
}

class ImagePost extends Post{
  imageUrl;
  imageDescription;
}

class VideoPost extends Post{
  videoUrl;
  rating;
}
</script>

Here both child classes inherit the properties of the main class but add properties of their own as well!

# Calling Constructors in Subclasses

Let us say there is a constructor in the main class. How will the subclass handle that constructor? Especially when it has its own constructors? We use the super() which is essentially calling the constructor of the parent function and setting those properties.

# Overriding Methods

This occurs when there is a method in the subclass that has the same name as an inherited method. In this case, the method in the subclass will override the inherited method. Note that whenevr this.method gets called in either the constructor or a method, it will always refer to the overriding method!!

## A note on overloading

Unlike its parent, Javascript does not support overloading. Instead the code will look for the last definition of the function and use that.

<script>
  class Component{
  constructor(renderHookId) {
    this.hookId = renderHookId;
    this.render(); // will always refer to render() in the subclass
  }
  render(){};
  }
  class ProductList extends Component {
  products = [
    new Product(
      "A Pillow",
      "./assets/pictures/pillow.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "./assets/pictures/carpet.jpg",
      "An expensive carpet which you may like!",
      59.99
    ),
  ];
  constructor(renderHook) {
    super(renderHook); // ERROR GENERATED
  }
  render(){
    this.products; // ERROR CAUSE
  }
  }
</script>

What does this mean?

- Each inherited class can define 'render' on its own and when this.render() occurs, 'this' will ALWAYS refer to the object calling it. So each render() will be native to the subclass.

- The parent class constructor (super) will ALWAYS be the FIRST section of code to execute when the object is instantiated. So 'this.products' will lead to an error because the 'products' property has not been created or given its value yet in the context of the object!!

BE CAREFUL WHEN CALLING SUB-CLASS METHODS IN THE CONSTRUCTOR OF THE PARENT CLASS as they may contain references to properties inside the class which will not been initialized yet!

LOOK OUT FOR SUB-CLASS METHODS WITH 'this.[LOCAL PROPERTY HERE]' IN THEM

CHECK TO SEE IF PARENT CLASS CALLS THEM IN CONSTRUCTOR (BOTH SETTING AND GETTING)

## Solution: Change the Parent Class constructor and call excluded Sub Class methods in the Sub-class constructor after super()

<script>
  class Component{

  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if(shouldRender){this.render();} // will always refer to render() in the subclass
  }
  render(){};
  }

  class ProductList extends Component {
  products = [ 
    new Product(
      "A Pillow",
      "./assets/pictures/pillow.webp",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "./assets/pictures/carpet.jpg",
      "An expensive carpet which you may like!",
      59.99
    ),
  ];

  constructor(renderHook) {
    super(renderHook, false); // now render, which has 'this' wil not fire here
    this.render();
  }
  }

  render(){
    this.products;
  }
  }
</script>

# Private Fields, Properties and Methods

## Public

Public means that these are accessible outside the class/object. So for example the class Product provides a buy() method and product.buy() is called in another class.

In the project, App.addproduct() was called in the ProductElement class and Cart.addproduct() was called inside the App class . This was done to transmit the product from the Product component to the Cart component.

## Private

This is accessible inside the class/object only and are usually hard coded values or class specific logic. A good example is the product list itself:

<script>
class ProductList extends Component {
  #products = [
    // some products
  ];
  render() {
    for (const prod of this.#products) {
    }
  }
}
</script>

## instanceOf

There is a way for us to track which kind of class an object is created from. This also applies for parent classes as well as shown below.

<script>
var newPost = new ImagePost("Longing for Pineapples");

console.log(newPost instanceof Post);
</script>

# Constructor Functions

A Constructor function acts just like a class. In fact, behind the scenes, a constructor function is used whenever a class is used. The class is just syntactical sugar for the constructor function.

The first and last lines of the constructor function are what happens behind the scenes.

<script>
  function Person() {

  console.log("Person constructor function called...");

    // this = {};
  this.age = 30;
  this.name = "Max";

  this.greet = function () {
    console.log(`Hello I am ${this.name} and I am ${this.age} years old`);
  };

// static functions
  Person.describe = function(){
    console.log('Creating persons...');
  }
  // return this;
}

const person = new Person(); // this 'new' keyword is what creates the instantation
person.greet();

console.log(person.toString()); // will return object
console.log(person.toStr()); // will throw error

Person(); // doesn't have to be called with "new"

</script>

Note that Person() is called without the keyword new. When it is called this way, it will
execute the code inside of it directly. When it is called in instantiation, the same will happen but an object is then created. 

# Prototypes

Prototypes are essentially fall-back objects that every instance of a class or its subclasses can access in order to get methods or attributes that those methods lack.

Javascript uses Prototypical Inheritance. Constructor Functions and Prototypes power Javascript Objects.

Every constructor function you build has a prototype property there by default. The prototype is an object itself and every object has one. It is a fallback object meaning it is what Javascript looks at if there is some property or method it cannot find in the original object.

Of course the prototype itself has a prototype. If JS cannot find the method in the prototype, it then goes into it's prototype and then goes through the entire prototype chain until it finds what it is looking for. It it does not then and only then will it return undefined or throw an error.

Think of the prototype as a base class. Look at line 287: the code has found a function called toString() in the PROTOTYPE of the person class!

The very last prototype is the prototype of the base Object class!

## Prototypes inn other parts of Javascript

Note that in the MDN docs, there are a bunch of prototypes that are commonplace. Specifically in the Array and String classes.

## Prototype of Instantiation vs Prototype of Class/Constructor Function

person.proto : this refers to the prototype of the Instantiation itself (the object itself essentially)

Person.prototype: this refers to the blueprint of the prototype that will be assigned to any object you build out of this specific Constructor function or class. This is how you can change the prototypes of objects!

<script>
Person.prototype = {
  printAge() {
    console.log(this.age);
  },
};
person.printAge(); // will print out age despite it not being defined in the Person class/

// a quicker way:

Person.prototype.printAge = function(){
  console.log(this.age);
}

// this way also ensures you do not replace the prototype object for Person. 

// the equivalent:

class Induvidual{
  printAge() {
    console.log(this.age);
  },
}

class Person extends Induvidual{
 // person object does not have printAge but it's prototype object does!!
}
</script>

This is essentially what happens behind the scenes when you do Subclass extends Class. JavaScript essentially changes the prototype for the subclass so that all of its objects now have parent class attributes and methods in their prototypes.

So when you extend you are changing the SUBCLASS prototype object.

# The Object Class

This is the ultimate fallback class that all other classes are based out of. All other classes inherit this one's method and its prototype is the fallback object of all other objects created.

Note that the class itself is not the base prototype!! The prototype object is.

# Using methods in event listeners

<script>
class Person extends AgedPerson{
  name = "Max";

  constructor() {
    super();
    this.age = 30;
  }

  greet() {
    console.log(`Hello I am ${this.name} and I am ${this.age} years old`);
  }

  greetWorking = () => {
    console.log(`Hello I am ${this.name} and I am ${this.age} years old`);
  }
}

const person = new Person();
const btnRef = document.querySelector('#btnSubmit');

btnRef.addEventListener("click", person.greet); // ERROR, 'this' has global context
btnRef.addEventListener("click",person.greet.bind(person));  // SUCCESS, new function where 'this' is person 
btnRef.addEventListener("click", person.greetWorking); // SUCCESS, 'this' has local context
</script>

#
