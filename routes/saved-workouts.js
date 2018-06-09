var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Workout = require('../models/workout');
var Exercise = require('../models/exercise');

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

router.get('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    if (decoded) {
      User.findById(decoded.user._id, function(err, user) {
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
        const workouts = user.workouts;
        res.status(200).json({
            message: 'received workouts',
            obj: workouts
        });
      })
    } else {
      return res.status(500).json({
        title: 'Invalid token',
      });
    }
});

router.patch('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  if (decoded) {
    User.findById(decoded.user._id, function(err, user) {
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
      let workoutExercises = [];
      req.body.exercises.forEach((exercise) => {
        const newExercise = new Exercise({
          name: exercise.name,
          description: exercise.description,
          muscle: exercise.muscle,
          equipment: exercise.equipment,
          video: exercise.video
        });
        workoutExercises.push(newExercise);
      });
      const newWorkout = new Workout({
        name: req.body.name,
        difficulty: req.body.difficulty,
        exercises: workoutExercises
      });
      user.workouts.push(newWorkout);
      user.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: 'An error occurred',
            error: err
          });
        }
        res.status(200).json({
          message: 'Workout saved',
          obj: result
        });
      });

    })
  } else {
    return res.status(500).json({
      title: 'Invalid token',
    });
  }
})

module.exports = router;
