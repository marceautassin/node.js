const {Rental} = require('../models/rental');
const express = require('express');
const router = express.Router(); // same as app but for routes

router.post('/', async (req, res) => {
  if(!req.body.customerId) return res.status(400).send('CustomerId not provided');
  if (!req.body.movieId) return res.status(400).send('CustomerId not provided');
  const rental = await Rental.findOne({
    'customerId._id': req.body.customerId, // use '' property to access key in subdocument
    'movieId._id': req.body.movieId});
  if(!rental) return res.status(404).send('This rental does not exist');

  res.status(401).send('unauthorized');

});

module.exports = router;
