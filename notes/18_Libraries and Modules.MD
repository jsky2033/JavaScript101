# Basics

Third party libraries are packages of code that have pre-written code for you to use in your projects. Basically utility functions.

## Lodash

This provides a variety of useful helper functions. Import can take place through download or using CDNs. min.js means the extra spaces have been taken out so that the code is optimized for size.

## jQuery

This is a very popular API for interaction with HTML.

## Axios

The functions of Axios, just like fetch(), are already promises so there is no need to promisify them. But unlike fetch, it is more practical to use Axios functions seperately. Therefore you can use them directly in the event handling functions!

Another advantage of Axios is the error handling. It throws an error even if the error is server-side in addition to browser-side errors such as network connectivity. So it makes this code with fetch redundant:

<script>
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong - server-side");
        });
      }
</script>

Post data is analyzed to set the right headers for both JS and FormData. Note that JS is automatically parsed into JSON before it is sent!

## Wow this sounds great, why not use libraries all the time?

Libraries often contain a lot of code you never use. As such you increase the size of the file import and may possibly slow down your application. As such many libraries allow you to choose stripped down/specific versions of themselves to reduce size.

In addition, you want to use libraries that are secure and easy to maintain!

# Modules

Sometimes we would like to split up our code across multiple files in order to organize the code better. A good rule of thumb is to create one file per class.

You could try to avoid depenendency error to make sure the script files are imported in the right order. However a better method is to use modules!

First we need to tell the browser that the script file needs to be treated as a module.

<script src="assets/scripts/app.js" defer type="module"></script>

## The local CORS error

Cross Origin Requests are usually not allowed. This means that you are only allowed to download scripts from the same domain your page is running on! 

This means that using file protocol for your scripts and opening your HTML file directly could cause this error. Since all the script files have different domains technically. 

To solve this you need to run a local server to host your site. This can easily be done with either an add on or through using npm. npm serve is reccomended. 

## Export/Import Work

<script>
// at export
export class Component{}
export function moveElement(param1){}
export default class {}


// at import
import {Component, moveElement} from './Component.js' // some people put .mjs which is module 
// get all items in file
import * as Component from './Component.js' // some people put .mjs which is module
// refer by nickname
import moveElement as displaceElement from './Component.js'
// import default
import Component from './Component' // since there is no {}, this is assumed to be default


// use this catch all object
*.moveElement(param1)
// use nickname
displaceElement(param1)

</script>


For a good example of how export/import interplay works, check out Project_11 Modules. As shown above you can export functions/objects in addition to classes.

## Network Latency

Note that the more imports there are, the more network requests will have to be made. This could be solved by bundling and other tooling devices. 

We could solve this by dynamically importing JS! This is done when we want to use imports conditionally (i.e: we do not know that a feature will be used)

Note that imports are all promises!

<script>
  const newElement = document.getElementById('new');
  if(!!newElement && !!newElement.innerText){
    import('./Tooltip.js').then(module=>{
      // module should be treated as *
      const toolTip = new module.Tooltip();
    })
  }
</script>

Consider using async/await for this one. 

## Which code fires from imported modules?

Note that the act of importing the module (regardless of what exactly is being imported) will cause the code in the module to fire. Therefore any self-invoking functions or plain code will fire. 

If your imported module has a line of code that says console.log('hello') that will fire on import. 

What if you import it multiple times (maybe another module imports the same thing)? It only fires on the first import!