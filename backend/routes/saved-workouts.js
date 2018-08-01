var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');

var User = require('../models/user');
var Workout = require('../models/workout');
var Exercise = require('../models/exercise');

/* verify token before user specific requests */
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, config.AWT_KEY, function handleDecode(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
});

/**
 * Get the user's saved workouts
 */
router.get('/', function getSavedWorkouts(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  // exit if token is invalid
  if (!decoded) {
    return res.status(500).json({
      title: 'Invalid token',
    });
  }
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
       if (workouts.length === user.workouts.length) {
         workouts.sort(function(workout1, workout2) {
           return workout2.createdAt.getTime() - workout1.createdAt.getTime()
         });
         return res.status(200).json({
           message: 'retrieved workouts',
           obj: workouts
         })
       }
     });
  });
  });
});

/**
 * add a workout to a user's saved workouts
 */
router.patch('/', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  // exit if token is invalid
  if (!decoded) {
    return res.status(500).json({
      title: 'Invalid token',
    });
  }
  let workoutExercises = [];
  let currentUser;
  User.findById(decoded.user._id, function findUser(err, user) {
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
    currentUser = user;
    req.body.exercises.forEach((exercise) => {
      findExercise(exercise);
    });
  });

  function findExercise(exercise) {
    Exercise.find({
      name: exercise.name,
      description: exercise.description,
      muscle: exercise.muscle,
      equipment: exercise.equipment,
      video: exercise.video
    }, function addExercise(err, foundExercise) {
        if (err || !foundExercise) {
          return res.status(500).json({
            title: 'Exercise not found',
            error: err
          });
        }
        workoutExercises.push(foundExercise[0]);
        if (workoutExercises.length === req.body.exercises.length) {
          onAllExercisesFound();
        }
      });
  }

  function onAllExercisesFound() {
    const newWorkout = new Workout({
      name: req.body.name,
      difficulty: req.body.difficulty,
      exercises: workoutExercises
    });
    // add the workout to the database
    newWorkout.save(function saveWorkout(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred while saving the workout',
          error: err
        });
      }
    });
    // add the workout to the user's workouts and save the user
    currentUser.workouts.push(newWorkout);
    currentUser.save(function saveUser(err, result) {
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

router.delete('/:id', function(req, res, next) {
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
      user.workouts.splice(user.workouts.indexOf(req.params.id), 1);
      user.save(function(err, result) {
        if (err) {
          return res.status(500).json({
            title: "Error saving user",
            error: err
          });
        }
        return res.status(202).json({
          title: "Workout successfully removed",
          obj: result
        });
      })
    });
  }
});

module.exports = router;
