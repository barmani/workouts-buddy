var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

router.get('/', function(req, res, next) {
  Exercise.find().sort('name').exec((err, exercises) => {
    return res.status(200).json({
      message: 'Found exercise names',
      exercises: exercises
    });
  });
});

router.post('/', function(req, res, next) {
  Exercise.find({
    muscle: { $regex: req.body.muscle, $options: "i" },
    equipment: { $regex: req.body.equipment, $options: "i" },
    name: { $regex: req.body.name, $options: "i", $nin: req.body.usedExerciseNames },
  }).exec((err, exercises) => {
    return res.status(201).json({
        message: 'Success',
        exercises: exercises
    });
  });
});

module.exports = router;
