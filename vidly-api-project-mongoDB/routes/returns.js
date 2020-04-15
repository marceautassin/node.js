const {Rental} = require('../models/rental');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router(); // same as app but for routes

router.post('/',auth, async (req, res) => {
  if(!req.body.customerId) return res.status(400).send('CustomerId not provided');
  if (!req.body.movieId) return res.status(400).send('CustomerId not provided');

  const rental = await Rental.findOne({
    'customer._id': req.body.customerId, // use '' property to access key in subdocument
    'movie._id': req.body.movieId});
  if(!rental) return res.status(404).send('This rental does not exist');

  if(rental.dateReturned) return res.status(400).send('Return already processed');

  rental.dateReturned = new Date();
  await rental.save();

  return res.status(200).send();

  // res.status(401).send('unauthorized');

});

module.exports = router;
