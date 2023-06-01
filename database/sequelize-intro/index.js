require('dotenv').config();
const express = require('express');
const sequelize = require('./utils/database');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('you have enter the API');
  next();
});
app.use(UserRoute);

app.listen(PORT || 3000, () => console.log(`listening on ${PORT || 3000}`));
/*
sequelize
  .sync()
  .then((result) => {
    
  })
  .catch((err) => console.log(err));
*/
