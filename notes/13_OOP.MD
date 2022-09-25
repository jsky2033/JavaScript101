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

# Instances of classes

Note that all instances of classes are object literals! This means that they have the same properties and functionality of object literals.

# Getters and Setters

In Javascript, setters and getters are called directly by the property name and not treated as functions themselves. Setters and Getters are hoisted functions so feel free to use them in any order. For example, we do:

<script>
class ShoppingCart {
  items = [];
  totalOutput;

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }
  
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2`; // call GETTER (look at the function name)
  }


  addProduct(product) {
    const updatedItems = [...this.items, product];
    this.cartItems = updatedItems; // CALL SETTER, equivalent to: cartItems(updatedItems)
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

# Object Descriptors
