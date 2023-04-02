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
