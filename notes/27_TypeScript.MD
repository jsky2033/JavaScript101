# The Basics

Typescript is a superset to JS. It will not run natively in the browser and will need a compiler to translate it to plain JS for it to run properly.

Typescript essentially allows you to add static types!

# Compiling TypeScript

Note that TypeScript will not run on the browser on its own so it is necessary to transpile it into JS with node. First globally install typescript and run the command:

tsc test.ts

# Type Inference

Typescript will often infer the return types of variables. For example, the result of two number types will be inferred to be a number so there is no need to explicitly set it.

## Type Inference fails

Sometimes TypeScript can fail to understand that the values entered into a function follow the types that are defined. For example, if you were to get the input value from an HTML element as follows:

<script>
    // will generate an error
    const num1Input = document.getElementById('num1') as HTMLInputElement;

    function add(a: number, b: number) {
        return a + b;
    }

    buttonElement.addEventListener('click', ()=>{
        const num1 = num1Input.value;

        console.log(add(num1,num1));
    })
</script>

The above will throw errors because Typescript has no way of knowing what the type of num1 is.

The solution is to cast the variable as a type.

<script>
    // ensure conversion to number type before passing into the function
    const num1Value = parseFloat(num1Input.value);
    const num2Value = parseFloat(num2Input.value);
    // will not generate error
    const num1Input = document.querySelector("num1") as HTMLInputElement;
    const num2Input = <HTMLInputElement>document.querySelector("num2");
</script>

# Arrays and Objects

Since all data structures have to be defined in TypeScript, it is necessary to do the following when we create arrays or objects:

<script>

  // defining structure of object
  const resultContainer: { res: number } = {
  }

  // defining variable as type array w/ '[]' and defining data type inside it
const results: { res: number }[] = [];

// a more simple array:
const results2: number[] = [];
// note that this is imply syntactic sugar for this:
const results2: Array<number> = [];

</script>

Note that the following works even when we did not define the structure of the object!

<script>
        const results: { res: number }[] = [];

  // defining structure of array
  const resultContainer = {
    res: numResult,
    print: function print() {
      console.log(this.res);
    },
  };
    results.push(resultContainer);

</script>

This is because of inference. The previous function makes it clear numResult will be a number so TS will automatically assign that to 'res'.

You should also note that the 'results' object does not object to it because all that cares about the 'res' field. Though it will generate an error if you define the object directly as shown in the first definition.

# Functions

Of course, it is always best to be more defintive about the types so we can also go ahead and set up the method like this:

<script>
    const results: { res: number; print: () => void }[] = [];
</script>

Function definitions and expressions can also be done:

<script>
    function add(x: number, y: number): number {
  return x + y;
}
 
let myAdd = function (x: number, y: number): number {
  return x + y;
};
</script>

# Alias

This allows you to define your types under one variable so you can use it repeatedly for different data structures

<script>
    type CalculationResults = { res: number; print: () => void }[];

    const results: CalculationResults = [];
    const newResults: CalculationResults = [];

</script>

# Literal and Union Types

What if we wanted to restrict input to only specific values and set those as types?

<script>
    type PrintMode = 'console' | 'alert';

    function printResult(result, printMode: "console" | "alert")

    type numAndStr = string | number;
</script>

# ENUM

These refer to user-defined types that can be used to hold constant values. It is an alternative to using const.

<script>
    function printResult(result, printMode: OutputMode) {
  if (printMode === OutputMode.CONSOLE) {
  }}
</script>

# Classes

TypeScript forces you to define fields at the top whereas JS does not. Although you can use shorthand to declare it in the constructor params.

Check out the project for an example.

# Interfaces

Interfaces are very similar to Aliases and allow you to define types for one object that you would like to use repeatedly. It is a small-scale alternative to classes and can also be replaced by an alias as well.

The following two type defintions produce the exact same result:

<script>
interface CalculationResults {
  res: number;
  print(): void;
}

type CalculationResults = { res: number; print: () => void }[];

// use of type
const results: CalculationResults = [];

</script>

## Interfaces as Contracts for Classes

Interfaces can also be used as Contrascts for classes. That is to say that they can be used to ensure that any class you use HAS to have the fields and functions defined in the interface.

This is very useful for teamwork where you want other developers to use certain functions or fields in the classes that implement your interface.

Note that this feature is not present in JS at all. It will NOT show up when you look at the transpiled JS code.

<script>
    interface Greetable {
  name: string;
  printUser(): void;
}

class User implements Greetable {}
</script>

# Generic Types

Generic Types allow the caller of a function to define the type that is passed into a function and the type of its output.

The reason is that the caller may want a certain type to come out so that they can use functions related to that type (a result of that type being a certain class or interface or even a String or Number). If they try to use any functions with the output, they will have an error because TypeScript does not know the output is of that type.

This may not be useful in small applications when we always know what type the function caller passes in but as app complexity grows, this becomes necessary.

<script>
// we do not want the user to be restricted by any types
function logAndEcho(val: any): any {
  console.log(val);
  return val;
}
// we still want the user to define what type comes out
function logAndEcho<Type>(val: Type){
  console.log(val);
  return val;
}

// we want to execute this function with type 'String' and call one of its functions
logAndEcho<string>('hello there!').split(' ');
</script>

Generic Types are also used to more precisely denote the type of a data structure.

<script>
    type CalculationResults = { res: number; print: () => void }[];

    const results: Array<CalculationResults> = [];
</script>
