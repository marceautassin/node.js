const express = require('express');
const _ = require('lodash');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');

// get

router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(400).send('This user does not exist.');

  res.send(user);
});

// post

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email: req.body.email});
  if(user) return res.status(400).send('User already registered');

  user = new User(
    _.pick(req.body, ['name', 'email', 'password'])
  );

  await user.save();

  res.send(_.pick(user, ['_id','name', 'email']));

});

module.exports = router;

// use joi-password-complexity pour contraindre les mdp
