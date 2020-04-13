const express = require('express');
const router = express.Router(); // same as app but for routes

router.post('/', (req, res) => {
  res.status(401).send('unauthorized');
});

module.exports = router;
