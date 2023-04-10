# Procedural

This involves writing code step by step. 


# OOP

Let us think about how the code should be organized. This should be based on what exactly we want to consider seperate entities and what we would like to re-use later

- The form itself could be its own object
- The validation could be its own object (the logic may be something we want to use in the future)
- The user itself coul be its own object (we may want to have the user entity be used elsewhere plus have )

Note how items stored in constants are now stored as properties in the class.

# Functional Code

This is the idea of seperating out code by functions. Code is thought of as different logical blocks instead of objects. 

Functional code involves writing as much pure functions as possible. That is to say, functions that do not change anything outside the function itself and also produce the same output for the same input every time. 

Rather than creating induvidual objects or utilizing values that will only be used once/performing actions that only execute once, create functions with parameters who can create those objects for you or do those things. 