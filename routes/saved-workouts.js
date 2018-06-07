var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

/* verify token before user specific requests */
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'secret', function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
});

router.patch('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  console.log(decoded.user_id);
  User.findById(decoded.user_id, function(err, user) {
    console.log(user);
    console.log(req.body);
  })
})

module.exports = router;
