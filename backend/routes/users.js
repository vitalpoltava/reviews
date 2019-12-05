const express = require('express');
const router = express.Router();
const Helpers = require('./helpers');

/* API responses */
router.get('/lists/:userId', function(req, res, next) {
  const uid = req.params.userId;
  res.send(Helpers.selectUserReviews(uid));
});

router.delete('/lists/:userId/:reviewId', function(req, res, next) {
  const uid = req.params.userId;
  const reviewId = req.params.reviewId;
  const result = Helpers.deleteReview(uid, reviewId);
  result ? res.status(202).send({id: reviewId}) : res.status(403).send({message: 'Cannot delete review'});
});

module.exports = router;
