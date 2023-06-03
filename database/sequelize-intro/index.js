require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user');
const AuthRouter = require('./routes/auth');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/users', UserRoute);
app.use(AuthRouter);

app.listen(PORT || 3000, () => console.log(`listening on ${PORT || 3000}`));
