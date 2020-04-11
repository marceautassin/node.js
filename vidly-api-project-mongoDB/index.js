const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi); // usefull to validate id before submitting request
const express = require('express');
const app = express();
require('./startup/routes')(app);

//manual version
// process.on('uncaughtException', (ex) => {
//   winston.error(ex.message, ex);
//   process.exit(1);
// });

// winston method (to be checked for unhandlerejection)
winston.handleExceptions(
  new winston.transports.File( { filename: 'uncaughtException.log'})
);

process.on('unhandledRejection', (ex) => {
  // console.log('We got an unhandle rejection!!!!');
  // winston.error(ex.message, ex);
  // process.exit(1);
  throw ex;
});

winston.add(winston.transports.File, {filename: 'logfile.log'}); // write in logfile.log
winston.add(winston.transports.MongoDB, {
  db: 'mongodb://localhost/vidly-api-project', // should be on a dedicated database
  level: 'error'
});

// throw new Error('Somehting failed during startup...') // => uncaught exception test
// const p = Promise.reject(new Error('It fails again...'));
// p.then(() => console.log('done')); // unhandle rejection test

//configuration
if (!config.get('jwtPrivateKey')) { //export vidly_jwtPrivateKey=secretkeyaconfigurer dans le terminal
  console.log('FATAL ERROR jwtPrivatKey not defined.');
  process.exit(1); // global module that end the process if value is =/= from 0
}

mongoose.connect('mongodb://localhost/vidly-api-project')
  .then(() => console.log('Connected to mongoDB...'))
  .catch((error) => console.error('Error', error));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views'); //default

if (app.get('env') === "development") {
  app.use(morgan('tiny')); // Define logs
  // console.log("Morgan enabled..."); => old fashion debug
  startupDebugger("Morgan enabled..."); // console: DEBUG=app:db nodemon index.js
}

//Db work...
dbDebugger('Connected to the database...');

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
