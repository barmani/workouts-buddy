var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

const largeMuscles = ['CHEST', 'BACK', 'LEGS'];

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
  let exerciseOptions = [];
  let workoutExercises = [];
  let abWorkoutExercises = [];
  let index = 0;

  // make sure large muscles appear first
  if (!largeMuscles.includes(exerciseRequest.muscleGroups[index])) {
    const temp = exerciseRequest.muscleGroups[index];
    exerciseRequest.muscleGroups[index] = exerciseRequest.muscleGroups[index + 1];
    exerciseRequest.muscleGroups[index + 1] = temp;
  }
  addMuscleGroup(exerciseRequest.muscleGroups[index]);

  // come back to this function to add each muscle group's exercises to workout
  function addMuscleGroup(muscleGroup) {
    let isLargeMuscle = largeMuscles.includes(muscleGroup);
    // make sure ab exercises are returned in query
    if (muscleGroup === 'ABS') {
      equipmentOptions.push('BODYWEIGHT');
    }
    Exercise.find({
      muscle: muscleGroup,
      equipment: { $in: equipmentOptions }
    }).count((err, count) => {
      // have to do this to get the number of records returned
      Exercise.find({
        muscle: muscleGroup,
        equipment: { $in: equipmentOptions }
      }).exec((err, exercises) => {
        exercises.forEach((exercise) => {
          exerciseOptions.push(exercise);
          if (exerciseOptions.length === count) {
            if (muscleGroup === 'ABS') {
              buildWorkoutExerciseArray(4);
            } else if (isLargeMuscle) {
              buildWorkoutExerciseArray(numberOfLargeExercises);
            } else {
              buildWorkoutExerciseArray(numberOfSmallExercises);
            }
          }
        });
      });
    });
  }

  // add random exercises of muscle type to workout
  function buildWorkoutExerciseArray(numberOfExercises) {
    for (let j = 0; j < numberOfExercises; j++) {
      let randomIndex = Math.floor(Math.random() * exerciseOptions.length);
      let exercise = exerciseOptions.splice(randomIndex, 1);
      workoutExercises.push(exercise[0]);
    }
    if (index + 1 === exerciseRequest.muscleGroups.length) {
      createWorkout();
    } else {
      addMuscleGroup(exerciseRequest.muscleGroups[++index]);
    }
    exerciseOptions = [];

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
