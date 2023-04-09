jest.mock("./http");

import { checkAndGenerate, generateText } from "./util.js";
import { loadTitle } from "./util.js";

// TEST 1: generateText

test("should output name and age", () => {
  // test for expected input
  const text = generateText("Max", 29); // output of function
  expect(text).toBe("Max (29 years old)"); // compare to expected result
  // test for consistency
  const text2 = generateText("Anna", 30); // output of function
  expect(text2).toBe("Anna (30 years old)"); // compare to expected result
});
// test for invalid data input
test("should output data-less text", () => {
  const text = generateText("", null);
  expect(text).toBe(" (null years old)");
});

// TEST 2: checkAndGenerate

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Max", 29);
  expect(text).toBe("Max (29 years old)");
});

// TEST 3: async code

test("should print an uppercase text", () => {
  loadTitle().then((title) => {
    expect(title).toBe("DELECTUS AUT AUTEM");
  });
});
