const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const genres = require('./routes/genres'); // call router methods from courses file
const home = require('./routes/home');
const express = require('express');
const app = express();


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views'); //default

app.use(express.json()); //middleware function => req.body
app.use(express.urlencoded({
  extended: true
})); //middleware function => req.body
app.use(express.static('public')); // Define a folder for static web components
app.use(helmet()); // Define HTTP headers
app.use('/api/genres', genres); // for any routes beginning by /api/genres, use routes frome genres
app.use('/', home);

//configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
// console.log('Mail password: ' + config.get('mail.password'));

if (app.get('env') === "development") {
  app.use(morgan('tiny')); // Define logs
  // console.log("Morgan enabled..."); => old fashion debug
  startupDebugger("Morgan enabled..."); // console: DEBUG=app:db nodemon index.js
}

//Db work...
dbDebugger('Connected to the database...');

app.use(logger); // custom middleware function

app.use((req, res, next) => {
  console.log('Authenticating...');
  next();
});

// PORT

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

// test github on vscode
