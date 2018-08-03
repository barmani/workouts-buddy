var express = require('express');
var router = express.Router();
var MyWorkoutController = require('../controllers/my-workout');

/* PATCH request to replace an exercise in the current workout */
router.patch('/current-workout', MyWorkoutController.swapExercise);

/* POST to new workout page. Create a workout from input to load to custom workout */
router.post('/new-workout', MyWorkoutController.createWorkoutFromForm);

module.exports = router;
