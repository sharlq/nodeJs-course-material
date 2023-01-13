const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
  // process.exit(); //this will exit the event loop
});

server.listen(3000);
