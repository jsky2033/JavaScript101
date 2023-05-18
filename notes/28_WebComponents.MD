# Basics

Webcomponents are simply user-defined components. They are custom HTML elements that contain their own logic which you can define.

## Shadow DOM

This involves having a seperate node tree for your HTML Elements

## Templates and Slots

These refer to HTML templates that can be added to HTML Elements.

## HTML Imports

This is a discontinued approach which involved importing HTML files into other HTML Elements.

# Why Web Components

## Encapsulated Logic + UI

This means that all the logic is contained within the component and it is self-contained.

## Re-usable across Page

They can be used just like a normal HTML element. That is to say they have overlapping logic and you only have to write logic + UI for them once.

## Re-usable between Apps/Projects

They can act just like normal HTML elements and can be used across frameworks.

# Creating a Web Component

## Naming Conventions

Note that the naming convention for these are usually like this, orgName-componentName eg: johanco-header

## constructor

This should fire when the element is created and should contain some basic inits such as initializing attributes

## connectedCallback()

This should have DOM inits: eg, creating new elements

It should also contain all DOM interactions as this executes right AFTER the HTML element has been attached to the DOM.

## disconnectedCallback()

This should fire when the element is detached from the DOM. This is good for cleanup work such as removing event listeners. 

Note that the code for this in the project is redundant since the browser already performs this behavior for us. It is also ineffective as the event listeners added are bound versions of the functions and not the functions themselves. 

## attributeChangedCallback

This is needed to update the DOM when data changes.

This is paired with the getter function, observedAttributes which contains a list of what you want tracked. An example of this use is in the project itself. 

Note that there is not necessarily any page-relaoding here in this example. The mouse enter/leave handlers simply updates the text with the new value of the tooltip text.

Note that this also fires once upon the first initialization of the page. Which removes the need for text to be manually set from the attribute in the code itself. 

### CSS Changes

Note that if you would like to change Component CSS purely because of attribute changes then it is best to do this directly through CSS. On the other hand if you wanted to execute any sort of JS then this is the way to go. 

example:

<style>
:host([opened]) #backdrop, :host([opened]) #modal{
            opacity: 1;
            pointer-events: all;
}
</style>

# Shadow DOM

The Shadow DOM is not exclusive to Web Components itself. What it is useful for however is allowing Hidden DOM trees to be attached to elements under the regular DOM tree.

As you can imagine, this is extremely useful for encapsulation of our Web Components since we ideally do not want them to interact or be interacted with the rest of the DOM.

When this occurs, any styles applied to the DOM in general will NOT apply to the elements in the Shadow DOM.

# Templates

Templates will hold some content that is, by default, hidden when the page loads. JavaScript is used to display it. As shown in the project, when we want to create an HTML structure:

- we first access and clone the template content
- we append it to our Shadow DOM tree
- access and manipulate it through functions

# Slots

Slots allow you to decide where exactly the text entered between the tags of the Web Component should go in the template structure.

<template id="tooltip-template"><slot>Here we go!</slot><span>(?)</span></template>

<uc-tooltip text="Web Components is a set of standards">Web Components</uc-tooltip>

Now whatever text is passed in between the tags will go into the slot. If nothing is passed into the template then the text put in there initially will go into the slot instead.

You can also use slots when you totally encapsulate your Web Component:

<script>
    // add template
    this.shadowRoot.innerHTML = 
    `<slot>Some Default</slot>  
    <span> (?)</span>`;
</script>

What this says is that the text entered in between the Web Component tag will go inside the <slot> tags shown in the HTML structure above. 

## Named Slots

Sometimes we would like to specify exactly which slotted content is placed in the component. This is done by using attributes on both ends:

In the DOM:

<uc-modal
      ><h1 slot="title">Confirm your Choice</h1>
      <p>I have completed the assignment</p>
</uc-modal>

In the Component:

<slot name="title">Please confirm payment</slot>


## Shadow DOM vs Light DOM

It is important to note that the text or elements in the Slot does NOT become part of the Shadow DOM. If you look at the elements tab you will see that the text there is retrieved from elsewhere. 

This means that the Slot can now be styled through the Light DOM!

<style>
      .highlight {
        background-color: yellow;
      }
</style>

<uc-tooltip text="Web Components is a set of standards">
  <span class="highlight">Web Components</span>
</uc-tooltip>

If you try to introduce styles through the Web Component Class itself, this will NOT work! This is because the slotted content is NOT part of the Shadow DOM

But what if this is the behavior you want?

<script>
 ::slotted(span){
        background-color: red;
}
</script>

Just include this in the Web Component itself. Just be aware of two things:

- you can only select the top most element for styling
- the CSS applied in the Light DOM will always take precendence 

If you want to style the whole webcomponent, style it from the Light DOM normally or use ::host in the class itself. 

# Total Encapsulation

It certainly is possible to use templates created in the HTML and use deep clone of those. However if you would like to have all your code (HTML, JS and CSS) inside of the container then it is best to have the HTML written in the constructor itself using template literals as shown in the project. Note that slots still works the same way.

# Extending Built in Components

You can also extend a built in element to create a Web Component. In this case, you do not even need to use the Web Component seperately:

<a is="uc-confirm-link" href="https://www.google.com">Google</a>

# Rendering

This is a method that is needed to update the DOM. This helps greatly since all of the DOM update logic can be placed in one location and all of our other methods can simply change attribute values (after which render can be called to update the DOM with these values)

# Custom Events

Since events propagate into parent functions, wouldn't it be nice if we could listen for events that occurred in the Web Component from the main document?

We can 

1. Get access to the element being acted upon (like the button being clicked) from event.target and use it to dispatch an event up the DOM tree. 

Note that the Web Component itself is an HTML Element by extension so you can also just do:

this.dispatchEvent 

2. Then configure the propagation behavior of this event to ensure that this event bubbled up even past the Shadow DOM barrier. 

<script>
  _cancel(event) {
    this.hide();
    const cancelEvent = new Event("cancel", { bubbles: true, composed: true });
    event.target.dispatchEvent(cancelEvent);
  }
</script>

Now you can add listeners in the parent DOM:

<script>
const modal = document.querySelector("uc-modal");

      modal.addEventListener("cancel", () => {
        console.log("Cancelled...");
      });
</script>

