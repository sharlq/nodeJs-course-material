const http = require('http');


const server = http.createServer((req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  console.log('listening on port 3000');
  res.end();
});

server.listen(3000);
