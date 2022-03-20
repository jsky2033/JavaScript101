# App Structure

The App structure is defined as follows:

- The app.js file handles the state and logic
- The vendor.js reflects changes to state to the user and gives the app.js file a means to access the html elements. 

Note that functions in the app.js file, when making changes to state, also call on functions in the vendor.js file to reflect this change. 

The one exception is the damage calculation is done in the vendor file itself. 

Usually in react this is all done in one file since the elements can just take state values. 