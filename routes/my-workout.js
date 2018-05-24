var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');


/* PATCH request to replace an exercise in the current workout */
router.patch('/current-workout', function(req, res, next) {
  // remove exercise from workout exercises array
  let currentExerciseNames = [];
  let exerciseOptions = [];
  let removeExerciseIndex;
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
    let randomIndex = Math.floor(Math.random() * exerciseOptions.length);
    let replacementExercise = exerciseOptions[randomIndex];
    req.body.workout.exercises.splice(removeExerciseIndex, 1, replacementExercise);
    res.status(200).json({
      newExercise: replacementExercise
    });
  }
});

/* POST to new workout page. Create a workout from input to load to custom workout */
router.post('/new-workout', function(req, res, next) {
  let exerciseRequest = req.body;
  // equipment in workout is based on difficulty selected
  let equipmentOptions = [];
  let difficulty = '';
  // amount of different exercises to do depending on difficulty
  let numberOfLargeExercises = 0;
  let numberOfSmallExercises = 0;
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
  let largeMuscleOptions = [];
  let smallMuscleOptions = [];
  let workoutExercises = [];
  let abWorkoutExercises = [];
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
    for (let i = 0; i < numberOfLargeExercises; i++) {
      let randomIndex = Math.floor(Math.random() * largeMuscleOptions.length);
      let exercise = largeMuscleOptions.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
      if (workoutExercises.length === numberOfLargeExercises) {
        // add small muscles after large muscles are complete
        addSmallMuscleToWorkoutArray();
      }
    }
  }

  function addSmallMuscleToWorkoutArray() {
    for (let j = 0; j < numberOfSmallExercises; j++) {
      let randomIndex = Math.floor(Math.random() * smallMuscleOptions.length);
      let exercise = smallMuscleOptions.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
      if (workoutExercises.length === numberOfLargeExercises + numberOfSmallExercises) {
        // synchronous call to create the workout after workoutExercises array is filled
        if (exerciseRequest.abs) {
          buildAbWorkout();
        } else {
          createWorkout();
        }
      }
    }
  }

  // get array of ab exercises
  function buildAbWorkout() {
    Exercise.find({
      muscle: 'ABS',
    }).count((err, count) => {
      Exercise.find({
        muscle: 'ABS'
      }).exec((err, exercises) => {
        exercises.forEach((exercise) => {
          abWorkoutExercises.push(exercise);
          if (abWorkoutExercises.length === count) {
            addAbsToWorkoutArray();
          }
        });
      });
    });
  }

  // add 4 ab exercises to the workout. Detect them on the frontend
  function addAbsToWorkoutArray() {
    for (let i = 0; i < 4; i++) {
      let randomIndex = Math.floor(Math.random() * abWorkoutExercises.length);
      let exercise = abWorkoutExercises.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
      if (workoutExercises.length === numberOfLargeExercises + numberOfSmallExercises + 4) {
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

});

module.exports = router;
