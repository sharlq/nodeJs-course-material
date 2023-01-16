const http = require('http');

const express = require('express');

const app = express();

//data modification middleware
app.use((req, res, next) => {
  console.log('In the middleware!');
  req.body = 'this is a message added by the middleware';
  next(); // Allows the request to continue to the next middleware in line
});

//authorization middleware
app.use((req, res, next) => {
  let password = req.query.password;
  if (password === 'secret') {
    next();
  } else {
    res.send('<h2>You are not authorized to view this page</h2>');
  }
});

app.use((req, res, next) => {
  console.log('In another middleware!');
  res.send(
    `<h2>You have the following message form the middleware: ${req.body} </h2>`
  );
});

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
