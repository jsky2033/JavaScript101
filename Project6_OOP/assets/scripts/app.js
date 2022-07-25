// class for internal Product representation
class Product {
  // properties
  title = "DEFAULT";
  imageUrl;
  description;
  price;

  //constructor methods
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// This class instance takes in another element ID when it is created.
// This is so that the HTML element that gets created can be attached to it.
// It should be noted that this class instance does not 'hold' the component itself,
// but rather provides component functions as it is a parent class.

class Component {
  hookId;

  /*
What is a renderhook? Essentially it is the element on the DOM we are appending 
the components to. In this case it is the <div> element with the id of 'app'
*/
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      this.render();
    } // will always refer to render() in the subclass
  }

  render() {}
  /*
  The idea behind this function is to create an HTML element, set its classes
  and append it to the html hook whose ID is included in the object instantiation itself
  before returning the DOM Element. 

  This element can then be given its inner HTML through the code. 

  Note that with this, it is not necessary to return the child component that extends it
  in the render() method. That is because it has already been created and appended to its
  appropriate hook element. You just need to return the reference to its place in the DOM. 

  */
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  totalOutput;

  constructor(renderHook) {
    super(renderHook, false);
    this.render();
  }

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount}</h2`; // call getter like this
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  // this function is to be 'given' to the Product Element component
  addProduct(product) {
    const updatedItems = [...this.items, product];
    this.cartItems = updatedItems; // CALL SETTER like this
  }

  // this function is to be called by this Component
  orderProducts = () => {
    console.log("Ordering...");
    console.log(this.items);
  };

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total: \$${0}</h2>
    <button>Order Now!</button>
    `;
    const orderButton = cartEl.querySelector("button");
    orderButton.addEventListener("click", this.orderProducts);
    this.totalOutput = cartEl.querySelector("h2"); // tying property to HTML display
  }
}

// class for Product rendering as HTML
class ProductElement extends Component {
  constructor(product, renderHook) {
    super(renderHook, false);
    this.product = product;
    this.render();
  }
  /*
  Remember that the product component is what needs the 'add to cart' functionality. 
  It needs to be able to update the contents of the cart component. 

  It does this by using a static method in the main global App class to give the product
  data entity over to the cart component (which is static to the App class) that adds it
  to its items list (which is by extension also static now.)
  */
  addToCart() {
    App.addProductToCart(this.product);
    console.log(`Adding ${this.product.title} to cart`);
  }

  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
          <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}">
          <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>          <button>Add to Cart</button>
          </div>
          </div>
          `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  #products = [
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
    super(renderHook, false);
    this.render();
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    // not the use of 'this' to refer to a global context.
    // if local context needed, inner arrow function required!
    for (const prod of this.#products) {
      // note that this just creates an object. To get back
      // the HTML you need to run the render() method
      new ProductElement(prod, "prod-list");
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    /*
    The shopping cart object is now native to any object created by 'Shop'.
    Notice that since we have created an instance of shopping cart, it is
    now dynamic and can be changed. 

    Also note that we create it and mention what it should be appended to. 
    */
    this.cart = new ShoppingCart("app"); // cart of Shop component
    new ProductList("app");
    /*
    Why is productList not included in the static context? Because it has a set amount
    of data that never changes.
    */
  }
}

// global class
class App {
  /*
  By making cart static here, we make the instance of cart (derived from the instance of shop)
  a static part of this App class!
  */
  static cart;

  static init() {
    const shop = new Shop();
    this.cart = shop.cart; // cart of Shop component passed over by reference
  }

  /*
  Now this function can be called by any of the functions inside the sub-classes
  and the 'this' inside it will refer to the static class itself and the properties
  inside of it. 
  */
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
