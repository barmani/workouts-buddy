var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

/**
 * Get the names of exercises for autocomplete in name search field.
 **/
router.get('/', function(req, res, next) {
  Exercise.find().sort('name').exec((err, exercises) => {
    if (err) {
      return res.status(500).json({
        title: 'Error getting exercise names',
        error: err
      });
    }
    return res.status(200).json({
      message: 'Found exercise names',
      exercises: exercises
    });
  });
});

/**
 * Search for exercises in the database.
 **/
router.post('/', function(req, res, next) {
  Exercise.find({
    muscle: { $regex: req.body.muscle, $options: "i" },
    equipment: { $regex: req.body.equipment, $options: "i" },
    name: { $regex: req.body.name, $options: "i", $nin: req.body.usedExerciseNames },
  }).exec((err, exercises) => {
    if (err) {
      return res.status(500).json({
        title: 'Error finding exercises',
        error: err
      });
    }
    return res.status(201).json({
        message: 'Success',
        exercises: exercises
    });
  });
});

module.exports = router;
