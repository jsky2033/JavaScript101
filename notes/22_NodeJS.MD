Here we will go over some usefule NodeJS modules.

# File Access

<script>
const fs = require("fs");

fs.writeFile("testFile.txt", 'username="Max', (err) => {
  if (!!err) {
    console.log(err);
  } else {
    console.log("Wrote to file!");
  }
});

fs.readFile("testFile.txt", (err, data) => {
  if (!!err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});

</script>

# Http-Server

This is what ExpressJS uses under the hood. However express adds a lot more APIs and other middleware that allows for tasks such as CORS, XSRF, POST parsing etc.

# Manual Parsing

Although it is rare, you can use Node to send back HTML to the front-end and have it interact with the JS that is on the server.

The response is the same each time (regardless of GET or POST) but the data there changes when new information is added.

<script>
  const http = require("http");

const server = http.createServer((request, response) => {
  // Handle Request
  let body = [];
  /*
  Note that these are asynchronous LISTENERS. They will only fire when the event happens.
  */
  request.on("data", (chunk) => {
    body.push(chunk);
  });
  request.on("end", () => {
    body = Buffer.concat(body).toString();
    const userName = body.split("=")[1];

    // Handle Response
    response.setHeader("Content-Type", "text/html");
    response.write(
      `<h1>Hello ${userName}</<h1><form method="POST" action="/"><input name="username" type="text"><button type="submit">Send</button></form>`
    );
    response.end();
  });
});

server.listen(3000);

</script>

# ExpressJS

This is one of the most popular libraries/frameworks for server side JS.

Note that the order of the middleware does matter. The middleware that comes first will execute first.

In Project 13 we not only want to have a server that responds to input but we also want to serve up some dynamic content/element as well. 

## Passing Variables to EJS from Express

<script>
    res.render("index", {
    user: userName,
  });
</script>

## Using Vaiables in EJS

<html>
    <h1>Hello <%= user%></h1>
</html>
