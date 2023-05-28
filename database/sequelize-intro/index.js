const express = require('express');
const sequelize = require('./utils/database');
const User = require('./models/user');

const app = express();

app.use((req, res, next) => {
  console.log('In the middleware!');
  next();
});

app.use((req, res, next) => {});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000, () => console.log('listening on 3000'));
  })
  .catch((err) => console.log(err));
