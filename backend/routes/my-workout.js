var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

const largeMuscles = ['CHEST', 'BACK', 'LEGS'];

/* PATCH request to replace an exercise in the current workout */
router.patch('/current-workout', function swapExercise(req, res, next) {
  // remove exercise from workout exercises array
  let currentExerciseNames = [];
  let exerciseOptions = [];
  let removeExerciseIndex;
  // make sure the new exercise is not already in the workout
  req.body.workout.exercises.forEach((exercise) => {
    if (exercise.muscle === req.body.exercise.muscle) {
      currentExerciseNames.push(exercise.name);
    }
    if (exercise.name === req.body.exercise.name) {
      removeExerciseIndex = req.body.workout.exercises.indexOf(exercise); // replace so that new exercise is in the same spot
    }
  });

  // get exercises of the same muscle but not in the current workout
  Exercise.find({
    muscle: req.body.exercise.muscle,
    name: { $nin: currentExerciseNames }
  }).exec(function getExerciseOptions(err, exercises) {
    if (err) {
      return res.status(500).json({
        title: 'Error finding exercises',
        error: err
      });
    }
    exercises.forEach((exercise) => {
      exerciseOptions.push(exercise);
      if (exerciseOptions.length === exercises.length) {
        getExercise();
      }
    });
  });
  /**
   * Of the possible exercises, pick one at random.
   */
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
  // equipment in workout is based on difficulty selected, amount of different exercises to do depending on difficulty
  workoutData = {equipmentOptions: [], difficulty: '', numLargeExercises: 0, numSmallExercises: 0};
  // get the workout data depending on difficulty
  populateWorkoutData(exerciseRequest, workoutData);

  // get exercise options based on form results
  let workoutExercises = [];
  let abWorkoutExercises = [];
  let index = 0;

  // make sure large muscles appear first
  placeLargeMusclesFirst(index, exerciseRequest);

  addMuscleGroup(exerciseRequest.muscleGroups[index]);

  // come back to this function to add each muscle group's exercises to workout
  function addMuscleGroup(muscleGroup) {
    let isLargeMuscle = largeMuscles.includes(muscleGroup);
    // make sure ab exercises are returned in query
    if (muscleGroup === 'ABS') {
      workoutData.equipmentOptions.push('BODYWEIGHT');
    }
    Exercise.find({
      muscle: muscleGroup,
      equipment: { $in: workoutData.equipmentOptions }
    }).exec(function populateExerciseOptions(err, exercises) {
        if (err) {
          return res.status(500).json({
            title: 'Error populating exercise array',
            error: err
          });
        }
        if (muscleGroup === 'ABS') {
          //  ab workouts are 4 exercises
          buildWorkoutExerciseArray(4, exercises);
        } else if (isLargeMuscle) {
          buildWorkoutExerciseArray(workoutData.numberOfLargeExercises, exercises);
        } else {
          buildWorkoutExerciseArray(workoutData.numberOfSmallExercises, exercises);
        }
    });
  }

  // add random exercises of muscle type to workout
  function buildWorkoutExerciseArray(numberOfExercises, exerciseOptions) {
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
      difficulty: workoutData.difficulty,
      exercises: workoutExercises
    });
    res.status(201).json({
      message: 'Created workout successfully',
      obj: workout
    });
  }
});

function populateWorkoutData(exerciseRequest, workoutData) {
  if (exerciseRequest.difficulty === 'Level III') {
    workoutData.equipmentOptions = ['CABLE', 'DUMBBELL', 'BARBELL', 'DUMBBELL', 'BODYWEIGHT'];
    workoutData.difficulty = 'ADVANCED';
    workoutData.numberOfLargeExercises = 4;
    workoutData.numberOfSmallExercises = 3;
  } else if (exerciseRequest.difficulty === 'Level II') {
    workoutData.equipmentOptions = ['MACHINE', 'CABLE', 'DUMBBELL', 'BARBELL', 'DUMBBELL'];
    workoutData.difficulty = 'INTERMEDIATE';
    workoutData.numberOfLargeExercises = 3;
    workoutData.numberOfSmallExercises = 3;
  } else { // beginner case
    workoutData.equipmentOptions = ['MACHINE', 'CABLE', 'DUMBBELL'];
    workoutData.difficulty = 'BEGINNER';
    workoutData.numberOfLargeExercises = 3;
    workoutData.numberOfSmallExercises = 2;
  }
}

// make sure large muscles appear first
function placeLargeMusclesFirst(index, exerciseRequest) {
  if (!largeMuscles.includes(exerciseRequest.muscleGroups[index])) {
    const temp = exerciseRequest.muscleGroups[index];
    // since there are only two muscle groups per workout besides abs, just have to check next
    exerciseRequest.muscleGroups[index] = exerciseRequest.muscleGroups[index + 1];
    exerciseRequest.muscleGroups[index + 1] = temp;
  }
}

module.exports = router;
