# Purpose of Automated Testing

The idea behind this is to automate and simplify the testing portion of development.

- We want to get an error if we break code
- Saves time
- We think about possible errors and bugs

# Components

## Test Runner

This executes our tests and summarizes the results. eg: Mocha

## Assertion Library

This defines testing logic and conditions, eg: Chai

Jest allows us to do both the above tasks.

## Headless Browser

This simulates browser interaction, eg: pupetteer

# Different Test Types

## Unit Tests

This tests induvidual code units in isolation from the rest of the system.

## Integration Tests

This is a method of testing how different units of code work together.

Sometimes unit tests are not enough. Consider combining functions and then running tests on the combined function to ensure that the different units can work together.

## e2e Tests

End to End testing simulates what a real user scenario would look like from start to finish.

# Jest

Note that Jest does not usually support imports done through 'require'. Create a babelrc file like in Project15 and install npm install --save-dev @babel/plugin-transform-modules-commonjs

- Flags

--watch

This keeps the test running and produces live results

## testing and APIs

We typically do not want to make API calls during the testing process. This is for two main reasons.

1. We do not want to test third party libraries like axios
2. We also do not want to test the API itself as this should be done during API development.

Therefore we use mocks to substitute this behavior
