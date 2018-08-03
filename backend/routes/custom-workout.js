var express = require('express');
var router = express.Router();
var CustomWorkoutController = require('../controllers/custom-workout');

/* GET request to get exercise names for autocomplete */
router.get('/', CustomWorkoutController.getExerciseNames);

/* POST request to search for exercise given some parameters */
router.post('/', CustomWorkoutController.searchForExercises);

module.exports = router;
