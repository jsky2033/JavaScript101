interface Greetable {
  name: string;
  printUser(): void;
}

class User implements Greetable {
  constructor(public name: string, private age: number) {}

  printUser(): void {
    console.log(this.name + this.age);
  }
}

class Admin extends User {
  constructor(name: string, age: number, private permissions: []) {
    super(name, age);
  }
}

// casting
const num1Input = document.getElementById("num1") as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById("num2");

const buttonElement = document.querySelector("button");

// functions
function add(a: number, b: number) {
  return a + b;
}

enum OutputMode {
  CONSOLE,
  ALERT,
}

function printResult(result, printMode: OutputMode) {
  if (printMode === OutputMode.CONSOLE) {
    console.log(result);
  } else if (printMode === OutputMode.ALERT) {
    alert(result);
  }
}

type CalculationResults = { res: number; print: () => void }[];

// defining variable as type array w/ '[]' and defining data type inside it
const results: CalculationResults = [];

buttonElement?.addEventListener("click", () => {
  const num1Value = parseFloat(num1Input.value);
  const num2Value = parseFloat(num2Input.value);

  const numResult = add(num1Value, num2Value);

  // defining structure of array
  const resultContainer = {
    res: numResult,
    print: function print() {
      console.log("The number is: " + this.res);
    },
  };

  results.push(resultContainer);
  printResult(resultContainer, OutputMode.CONSOLE);
  printResult(resultContainer, OutputMode.ALERT);
});
