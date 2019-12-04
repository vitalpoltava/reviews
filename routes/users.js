const express = require('express');
const router = express.Router();
const Helpers = require('./helpers');

// Get Data
const users = require('./data/users');
const reviews = require('./data/reviews');

/* API responses */
router.get('/lists/:userId', function(req, res, next) {
  const uid = req.params.userId;
  res.send(Helpers.selectUserReviews(uid, reviews));
});

module.exports = router;
