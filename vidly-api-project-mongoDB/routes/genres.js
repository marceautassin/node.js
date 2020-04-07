const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router(); // same as app but for routes

const Genre = mongoose.model('Genre', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

// const genres = [{
//     id: 1,
//     name: "action"
//   },
//   {
//     id: 2,
//     name: "français"
//   },
//   {
//     id: 3,
//     name: "nul"
//   }
// ];

// validation
const validateGenre = (genre) => {
  const schema = {
    name: Joi.required()
  };

  return Joi.validate(genre, schema);
};

// get

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});

// post

router.post('/', async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  res.send(genre);

});

// put

router.put('/:id', async (req, res) => {
  const {
    error
  } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, {
    new: true
  });

  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});



// delete

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send('This genre does not exists.');

  res.send(genre);
});


module.exports = router;
