# Basics

Events consist of network requests, user interactions, scheduled events, etc. etc. Events usually transport data.

# Browser Events

There is one core event but there are specialized events that branch off from that through the use of prototypes. They all have specialized data and targets as well.

# Setting Event Handler

## Set through attribute

<script>
const button = document.querySelector("button");

// method #1
button.onclick = function () {};

// method #2
const buttonClickHandler = () => {
  alert("Button was clicked!");
};
button.onclick = buttonClickHandler;
button.onclick = () = > {alert("This button was clicked")} // this will replace the first one
</script>

The disadvantage of this message is that you cannot keep adding handlers. So how do we add event listeners in a cleaner way?

## Set through function

<script>
const button = document.querySelector("button");

const buttonHandler = () => {
  alert("Hello There");
};

button.addEventListener("click", buttonHandler);

setTimeout(() => {
  button.removeEventListener("click", buttonHandler);
}, 3000);
</script>

There are some pitfalls for this method. The add and remove functions have to be the EXACT same in terms of name. If you create new functions for each one, even if they are the EXACT same, they will not be referring to the same thing. So always use the same address.

Note that using bind() does the same thing! A new function is created when you use bind, remember!

# Event Object

<script>
const buttonHandler = (event) => {
  alert("Hello There");
  console.log(event);
  console.log(event.target.innerText); // will display innerText of button
  }
</script>

The event object provides you with a lot of attributes about the event. The position of the click, whether the control key or alt key was pressed, etc.

## The Target Property

The Target property is extremely useful because it gives us direct access to whatever was clicked. When it comes to HTML elements, this is the HTML element itself.

# Scrolling

Event listeners based on scrolling are added directly to the window. See InfiniteScroll.js for a good look at an application!

# Forms

The form submission event is crucial for form submissions. 

<script>
    const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevents default behavior such as reloads
});
</script>

# Bubbling and Capturing

There are two processes when events occur. The Bubbling and Capturing phases

1. Capturing
This happens first and goes from outside to inside. So it checks if there is any outer HTML elements that have event listeners on them with the same trigger. 

2. Bubbling:
This happens next and goes from inside to outside. This then checks if there are event listeners on the outer HTML elements after the inner one is completed. This is when the code execution actually happens. 


For example, if there is a DIV containing a BUTTON:

<script>
const button = document.querySelector("button");
const div = document.querySelector("div");

button.addEventListener("click", (event) => {
  console.log("CLICKED BUTTON");
}); 
div.addEventListener("click", (event) => {
  console.log("CLICKED DIV");
},);

/* Reverse Order of Execution */

div.addEventListener("click", (event) => {
  console.log("CLICKED DIV");
}, true);

/*Stop Propagation of Event*/

button.addEventListener("click", (event) => {
  event.stopPropagation(); // stops event from propagating outwards
  event.stopImmediatePropagation(); // stop only after propagation to first ancestor
  console.log("CLICKED BUTTON");
}); 

</script>

Button's event listener executes first. However the parameter, 'true' moves the code execution to the capturing phase. In that case, the DIV event listener executes first!

## Propagation

This process of having the same event being listened to through multiple ancestors is known as Propagation. Either through Bubbling or Capturing.

So if there is a click event listener in the parent element, it will also activate when the inner element is clicked. 

This can be prevented if you would like though

Not all events propagate though! Click events are propagated but things like mouse hover or mouse move don't really propagate as it does not make much sense to do so. 

How to check if an event propagates for sure? Check the .bubbles property on the event object itself. 

# Event Delegation

Let us say we are dealing with a list of items and we wish to assign event listeners to each one. It would be inefficient to do each one induvidually. Much better to take advatage of the facts that:

1. The event will bubble up to whatever is containing the list to which the listener can be added. 
2. event.target will ALWAYS refer to the innermost HTML element being interacted with. It will always refer to the list item itself.

This means that you don't necessarily have to add event listeners directly on the element you want to listen to! You can always add it to the parent and use event.target to ensure that the code fires when the specific event is clicked. 

This also means that if you see the code firing multiple times, you should check to see if the parent element has had the event listener added to it as well!

## Accessing specific inner Elements

event.target.closest looks UP the ancestor tree to the closest element that matches the CSS selector you supply it with. It is useful when you want the event target to listen to the item container instead of a specific item element. 

## Programmatic triggers

It is entirely possible to trigger events through the code itself. 

<script>

// list items
const listItems = document.querySelectorAll("li");
const list = document.querySelector("ul");

/*The inefficient method*/

listItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    event.target.classList.toggle("highlight");
  });
});

/* Using Event Delegation */

list.addEventListener("click", (event) => {
  /* Will work but only highlight the innermost element of the list */

  //   event.target.classList.toggle("highlight");

  /* Refers to the element where the listener is present */

  //   console.log(event.currentTarget);

  /* Selects the list item itself */

  event.target.closest("li").classList.toggle("highlight");

  /*Programmatic Triggering*/
  form.click();
  form.submit();
});
</script>

# Drag and Drop HTML Elements

## Dragged Item

There are seperate parts to dragging and dropping HTML Elements. The first step is to configure exactly what is being dragged and what kind of data is being dragged along with it. 

<script>
      document.getElementById(this.id).addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", this.id);
      event.dataTransfer.effectAllowed = "move";
    });
</script>

SetData refers to the data that will be transferred by this drag operation. While effectAllowed refers to the type of drag operation beting undertaken. In this case we mention it is move. Whereas if it would be copy, we would be making a copy of it in the drag location. 

## Item in Transit

Let us say that the list is where we ultimately want to drag the item to. We now have to add an event listener for this element to listen to when things are dragged over it and then into it.

<script>
    const list = document.querySelector(`#${this.type}-projects ul`);

    // event that occurs upon drop
    list.addEventListener("dragenter", (event) => {
      // we can only get types of the dragged item with this trigger
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
      list.parentElement.classList.add("droppable");
    });
    // prevent default which is to ignore
    list.addEventListener("dragover", (event) => {
      if (event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
      }
    });
    /*
    The reason for the if statement is that we want to ensure, that droppable
    is not removed when the dragged item is over other elements that happen
    to be inside the list. 
    */
    list.addEventListener("dragleave", (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) != list) {
        list.parentElement.classList.remove("droppable");
      }
    });
</script>

## Drop Item

<script>
      /* Drop Event! */
    list.addEventListener("drop", (event) => {
      const prjId = event.dataTransfer.getData("text/plain");
      /* Only continue if item is not already in list */
      if (this.projects.find((p) => p.id === prjId)) {
        return;
      }
      /* programatically click button to switch project lists in HTML Element */
      document
        .getElementById(prjId)
        .querySelector("button:last-of-type")
        .click();

      list.parentElement.classList.remove("droppable");
      event.preventDefault();
    });
</script>

Note that programatically clicking that button saves us a lot of trouble. If we did not do that then we would have to come up with a function that communicates to the list that the item was dragged from that it was dropped and needed to be removed.



