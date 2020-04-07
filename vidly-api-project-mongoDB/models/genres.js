const mongoose = require('mongoose');
const Joi = require('joi');

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


exports.Genre = Genre;
exports.validate = validateGenre;
