# Notes on the structure of this NodeJS App

Notice how we create class-based JS 'components' for each section. This is supposed to be the functionality behind the physical element reprented by JS. 

This is essentially how React Components are created. However with React, the HTML and JS is merged into one compoenent so there is no need for DOM Access or setting event listeners. 

## Creating New Elements

Note that elements are created by cloning (the content inside) templates using importNode and modifying them before placing them back into the DOM. This is more efficient that having prepared elements to modify or creating brand new elements through JS. 

## Removing Elements

Taking out Elements from the DOM means that you should 'clean up' after them. That is to say, set these references to null. This prevents memory leaks. 