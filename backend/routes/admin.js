const express = require('express');
const router = express.Router();
const Helpers = require('./helpers');

/* API responses */
router.get('/admin/users', function(req, res, next) {
  res.send(Helpers.selectAllUsers());
});

router.post('/admin/users', function(req, res, next) {
  const userId = Helpers.addUser(req.body);
  userId ? res.status(202).send({id: userId}) : res.status(403).send({message: 'Cannot create user'});
});

router.delete('/admin/users/:id', function(req, res, next) {
  const userId = Helpers.deleteUser(req.params.id);
  userId ? res.status(202).send({id: userId}) : res.status(403).send({message: 'Cannot delete user'});
});


module.exports = router;
