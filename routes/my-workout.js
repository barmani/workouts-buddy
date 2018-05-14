var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

/* POST to current workout page. Create a workout from input to load to custom workout */
router.post('/current-workout', function(req, res, next) {
  var exerciseRequest = req.body;
  // equipment in workout is based on difficulty selected
  var equipmentOptions = [];
  var difficulty = '';
  // amount of different exercises to do depending on difficulty
  var numberOfLargeExercises = 0;
  var numberOfSmallExercises = 0;
  if (exerciseRequest.difficulty === 'advanced') {
    equipmentOptions = ['CABLE', 'DUMBBELL', 'BARBELL', 'DUMBBELL', 'BODYWEIGHT'];
    difficulty = 'ADVANCED';
    numberOfLargeExercises = 4;
    numberOfSmallExercises = 3;
  } else if (exerciseRequest.difficulty === 'intermediate') {
    equipmentOptions = ['MACHINE', 'CABLE', 'DUMBBELL', 'BARBELL', 'DUMBBELL'];
    difficulty = 'INTERMEDIATE';
    numberOfLargeExercises = 3;
    numberOfSmallExercises = 3;
  } else { // beginner case
    equipmentOptions = ['MACHINE', 'CABLE', 'DUMBBELL'];
    difficulty = 'BEGINNER';
    numberOfLargeExercises = 3;
    numberOfSmallExercises = 2;
  }

  // get exercise options based on form results
  var largeMuscleOptions = [];
  var smallMuscleOptions = [];
  var abExercises = [];
  // get large muscle exercises
  Exercise.find({
    muscle: exerciseRequest.largeMuscleGroup.toUpperCase(),
    equipment: { $in: equipmentOptions }
  }).exec((err, exercises) => {
    exercises.forEach((exercise) => {
      console.log(exercise);
      largeMuscleOptions.push(exercise);
    });
    console.log(largeMuscleOptions);
  });
  // get small muscle exercises
  Exercise.find({
    muscle: exerciseRequest.smallMuscleGroup.toUpperCase(),
    equipment: { $in: equipmentOptions }
  }).exec((err, exercises) => {
    exercises.forEach((exercise) => {
      smallMuscleOptions.push(exercise);
    });
  });

  // get ab exercises
  if (exerciseRequest.abs) {
    Exercise.find({
      muscle: 'ABS',
    }).exec((err, exercises) => {
      exercises.forEach((exercise) => {
        abExercises.push(exercise);
      });
    });
  }

  // get exercises for the workout
  // TODO: put in callback so it runs after arrays are filled
  var workoutExercises = [];
  var abWorkoutExercises = [];

  for (var i = 0; i < numberOfLargeExercises; i++) {
    var randomIndex = Math.floor(Math.random() * largeMuscleOptions.length);
    var exercise = largeMuscleOptions.splice(1, randomIndex);
    workoutExercises.push(exercise[0]);
  }

  for (var i = 0; i < numberOfSmallExercises; i++) {
    var randomIndex = Math.floor(Math.random() * smallMuscleOptions.length);
    var exercise = smallMuscleOptions.splice(1, randomIndex);
    workoutExercises.push(exercise[0]);
  }

  if (exerciseRequest.abs) {
    // TODO: implement ab workout logic
  }

  var workout = new Workout({
    name: 'Auto-generated workout',
    difficulty: difficulty,
    exercises: workoutExercises
  });

});

module.exports = router;
