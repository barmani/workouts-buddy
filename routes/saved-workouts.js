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
        let workouts = [];
        user.workouts.forEach((workoutId, index) => {
          Workout.findById(workoutId)
                 .populate('exercises')
                 .exec(function(err, workout) {
                   if (!err && workout) {
                     workouts.push(workout);
                   }
                   if (index === user.workouts.length - 1) {
                     console.log(workouts);
                     return res.status(200).json({
                       message: 'retrieved workouts',
                       obj: workouts
                     })
                   }
                 });
        });
      });
    } else {
      return res.status(500).json({
        title: 'Invalid token',
      });
    }
});

// add a workout to a user's saved workouts
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
        Exercise.find({
          name: exercise.name,
          description: exercise.description,
          muscle: exercise.muscle,
          equipment: exercise.equipment,
          video: exercise.video
        }, function(err, exercise) {
          workoutExercises.push(exercise[0]);
          if (workoutExercises.length === req.body.exercises.length) {
            const newWorkout = new Workout({
              name: req.body.name,
              difficulty: req.body.difficulty,
              exercises: workoutExercises
            });
            newWorkout.save(function(err, result) {
              if (err) {
                return res.status(500).json({
                  title: 'An error occurred while saving the workout',
                  error: err
                });
              }
            });
            user.workouts.push(newWorkout);
            user.save(function(err, result) {
              if (err) {
                return res.status(500).json({
                  title: 'An error occurred',
                  error: err
                });
              }
              return res.status(200).json({
                message: 'Workout saved',
                obj: result
              });
            });
          }
        });
      });
    });
  } else {
    return res.status(500).json({
      title: 'Invalid token',
    });
  }
})

module.exports = router;
