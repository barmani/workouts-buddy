var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');


/* PATCH request to replace an exercise in the current workout */
router.patch('/current-workout', function(req, res, next) {
  // remove exercise from workout exercises array
  var currentExerciseNames = [];
  var exerciseOptions = [];
  var removeExerciseIndex;
  req.body.workout.exercises.forEach((exercise) => {
    if (exercise.muscle === req.body.exercise.muscle) {
      currentExerciseNames.push(exercise.name);
    }
    if (exercise.name === req.body.exercise.name) {
      removeExerciseIndex = req.body.workout.exercises.indexOf(exercise); // replace so that new exercise is in the same spot
    }
  });
  Exercise.find({
    muscle: req.body.exercise.muscle,
    name: { $nin: currentExerciseNames }
  }).count((err, count) => {
    Exercise.find({
      muscle: req.body.exercise.muscle,
      name: { $nin: currentExerciseNames }
    }).exec((err, exercises) => {
      exercises.forEach((exercise) => {
        exerciseOptions.push(exercise);
        if (exerciseOptions.length === count) {
          getExercise();
        }
      });
    });
  });

  function getExercise() {
    var randomIndex = Math.floor(Math.random() * exerciseOptions.length);
    var replacementExercise = exerciseOptions[randomIndex];
    req.body.workout.exercises.splice(removeExerciseIndex, 1, replacementExercise);
    res.status(200).json({
      newExercise: replacementExercise
    });
  }
});

/* POST to new workout page. Create a workout from input to load to custom workout */
router.post('/new-workout', function(req, res, next) {
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
  var workoutExercises = [];
  var abWorkoutExercises = [];
  // get large muscle exercises
  Exercise.find({
    muscle: exerciseRequest.largeMuscleGroup.toUpperCase(),
    equipment: { $in: equipmentOptions }
  }).count((err, count) => {
    // have to do this to get the number of records returned
    Exercise.find({
      muscle: exerciseRequest.largeMuscleGroup.toUpperCase(),
      equipment: { $in: equipmentOptions }
    }).exec((err, exercises) => {
      exercises.forEach((exercise) => {
        largeMuscleOptions.push(exercise);
        if (largeMuscleOptions.length === count) {
          getSmallMuscles();
        }
      });
    });
  });

  // get small muscle exercises. Declare in function to run synchronously
  function getSmallMuscles() {
    Exercise.find({
      muscle: exerciseRequest.smallMuscleGroup.toUpperCase(),
      equipment: { $in: equipmentOptions }
    }).count((err, count) => {
      Exercise.find({
        muscle: exerciseRequest.smallMuscleGroup.toUpperCase(),
        equipment: { $in: equipmentOptions }
      }).exec((err, exercises) => {
        exercises.forEach((exercise) => {
          smallMuscleOptions.push(exercise);
          if (smallMuscleOptions.length === count) {
            buildWorkoutExerciseArray();
          }
        });
      });
    });
  }

  // get exercises for the workout
  function buildWorkoutExerciseArray() {
    for (var i = 0; i < numberOfLargeExercises; i++) {
      var randomIndex = Math.floor(Math.random() * largeMuscleOptions.length);
      var exercise = largeMuscleOptions.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
      if (workoutExercises.length === numberOfLargeExercises) {
        // add small muscles after large muscles are complete
        addSmallMuscleToWorkoutArray();
      }
    }
  }

  function addSmallMuscleToWorkoutArray() {
    for (var j = 0; j < numberOfSmallExercises; j++) {
      var randomIndex = Math.floor(Math.random() * smallMuscleOptions.length);
      var exercise = smallMuscleOptions.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
      if (workoutExercises.length === numberOfLargeExercises + numberOfSmallExercises) {
        // synchronous call to create the workout after workoutExercises array is filled
        createWorkout();
      }
    }
  }

  // create workout after all arrays are filled
  function createWorkout() {
    const workout = new Workout({
      name: 'Auto-generated workout',
      difficulty: difficulty,
      exercises: workoutExercises
    });
    res.status(201).json({
      message: 'Created workout successfully',
      obj: workout
    });
  }

  // get ab exercises
  // TODO: Implement this
  // if (exerciseRequest.abs) {
  //   Exercise.find({
  //     muscle: 'ABS',
  //   }).exec((err, exercises) => {
  //     exercises.forEach((exercise) => {
  //       abExercises.push(exercise);
  //     });
  //   });
  // }

});

module.exports = router;
