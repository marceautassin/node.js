const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
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

//configuration
console.log('Application name: ' + config.get('name'));
console.log('Mail server: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

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

const genres = [{
    id: 1,
    name: "action"
  },
  {
    id: 2,
    name: "français"
  },
  {
    id: 3,
    name: "nul"
  }
];

// PORT

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

// validation
const validateGenre = (genre) => {
  const schema = {
    name: Joi.required()
  };

  return Joi.validate(genre, schema);
};

// get

app.get('/', (req, res) => {
  res.render('index', {title: "my first app", message: "Hello"})
});

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});

// post
app.post('/api/genres', (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name
  };

  genres.push(genre);
  res.send(genre);

});

// put
app.put('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('This genre does not exists.');

  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});



// delete
app.delete('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send('This genre does not exists.');

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});
