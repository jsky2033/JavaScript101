# Errors

Some errors cannot be avoided and are beyond your control as a developer. Such as user input, network errors etc.

So the solution is to throw and catch errors to fail gracefully or recover if possible. 

## Custom Errors

Here is a basic example on what to do when the user enters a non numerical value:

<script>
let userInput = "";

try {
  const parsedValue = parseInt(userInput);
  if (isNaN(parsedValue)) {
    throw { message: "Invalid Input!!" };
  }
} catch (err) {
  console.log(err);
} finally {
    // this code will always execute
}
</script>

Why use finally? Some errors are uncaught and need to be handled or sometimes errors are re-thrown or errors are thrown inside the catch block itself. 
