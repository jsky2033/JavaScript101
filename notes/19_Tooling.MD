# The Problem

Remember how importing files always tended to create several network requests that clog up the bandwith when more complex apps are involved?

# Webpack - Bundling

The idea of bundling is to have all the code that is split up into multiple files bundled up into one single file. This way, the code can be retrieved when needed, but there is no need for so many requests!

With webpack, we have two things to consider: the entry point (where the JS files go in) and the exit point (where the bundled files go).

Convention is to put all the JS files in the src folder and then have the bundled results directed straight to the scripts folder in assets.

<script>
const path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'assets', 'scripts')
    publicPath: 'assets/scripts/'
  }
}

</script>

Note that when it comes to bundling, webpack appends .js to the end of file names automatically! So please ensure all your imports have .js removed from the end of the file names.

## 1.app

You get an extra file sometimes when conditional imports are used. This bundle is only loaded when we need it (the conditional import is used).

## Multiple entry points

If there are multiple HTML pages, it may be useful to create an entry point for each one with the outputs directing to each respective one.

## publicPath

Webpack looks for the 0.app.js file in the root folder by default so the purpose of the public path is to ensure it starts from the folder that has the exit point!

# ESLint - Optimization

This refers to shortening function names, removing whitespace etc. This is usually done with ESLint.

Note that installing ESLint locally vs globally means that you will have to run it differntly. Rather than using the Commands in VSCode, run this in the project folter isntead:

./node_modules/.bin/eslint --init

ESLINT is set up nicely in Project 11.

If you want to avoid an error from eslint, use:

<script>
    // eslint-disable-next-line
import { ProjectList } from "./App/ProjectList.js";
</script>

You can also specify which rule you want ignored.

# Code Compilation

This refers to transpiling our code so that older browsers are able to find it. This is done through Babel.

# Notes on NPM

To create an npm repository, use npm init and then to install packages for DEV USE ONLY, make sure to use --save-dev
