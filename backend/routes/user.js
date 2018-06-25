var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');


/* Create a new user */
router.post('', function(req, res, next) {
  console.log('creating user');
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email,
  });
  user.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'User not found',
        error: {message: 'User not found'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Incorrect password',
        error: {message: 'Incorrect password'}
      });
    }
    var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
     res.status(200).json({
         message: 'Successfully logged in',
         token: token,
         userId: user._id
     });
  });
});

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

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      if (!user) {
        return res.status(401).json({
          message: 'User not found',
          error: {message: 'User not found'}
        });
      }
      return res.status(200).json({
        message: 'User data retrieved',
        obj: user
      });
    });
});

router.get('/:id/:exerciseId/', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        error: {message: 'User not found'}
      });
    }
    if (user.exerciseSets.length === 0) {
      return res.status(200).json({
        message: 'No sets saved for this exercise',
        obj: []
      });
    }
    user.exerciseSets.forEach((exerciseSet, index) => {
      if (exerciseSet.exercise === req.params.exerciseId) {
        return res.status(200).json({
          message: 'Exercise set found',
          obj: exerciseSet
        });
      } else if (index === user.exerciseSets.length - 1) {
        return res.status(200).json({
          message: 'No sets saved for this exercise',
          obj: []
        });
      }
    });
  });
});

module.exports = router;
