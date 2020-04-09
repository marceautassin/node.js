const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');
const {customerSchema} = require('./genre');


const Rental = mongoose.model('Rental', new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({ // because we don't want all customer properties here
      name: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
      },
      isGold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    })
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 250
      },
      genre: {
        type: genreSchema,
        required: true
      },
      numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 150
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 150
      }
    })
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturn: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
}));

const validateRental = (rental) => {
  const schema = {
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  };

  return Joi.validate(rental, schema);
};

exports.Rental = Rental;
exports.validate = validateRental;
