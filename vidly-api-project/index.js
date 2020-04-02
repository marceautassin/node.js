const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json());

const genres = [
{id: 1, name: "action"},
{id: 2, name: "français"},
{id: 3, name: "nul"}
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
app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = genres.find(c => c.id === parseInt(req.params.id));
  if(!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});

// post
app.post('/api/genres', (req, res) => {
  const { error } = validateGenre(req.body);
  if(error) return res.status(400).send(error.details[0].message);

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

  const { error } = validateGenre(req.body);
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
