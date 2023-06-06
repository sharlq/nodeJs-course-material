require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const UserRoute = require('./routes/user');
const AuthRouter = require('./routes/auth');
const tvSeriesRouter = require('./routes/tvSeriesRouter');
const episodeRouter = require('./routes/episodeRouter');
const watchRouter = require('./routes/watchRouter');

const app = express();

const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use('/users', UserRoute);
app.use(AuthRouter);
app.use('/tv-series', tvSeriesRouter);
app.use('/episodes', episodeRouter);
app.use('/watch', watchRouter);

app.listen(PORT || 3000, () => console.log(`listening on ${PORT || 3000}`));
