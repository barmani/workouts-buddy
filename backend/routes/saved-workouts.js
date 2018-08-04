var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var checkAuth = require('../middleware/check-auth');
var SavedWorkoutsController = require('../controllers/saved-workout');

/* GET retrieve user's saved workouts from the db */
router.get('/', checkAuth, SavedWorkoutsController.getSavedWorkouts);

/* PATCH add a workout to saved workouts */
router.patch('/', checkAuth, SavedWorkoutsController.addToSavedWorkouts);

/* DELETE remove a saved workout */
router.delete('/:id', checkAuth, SavedWorkoutsController.removeWorkout);

module.exports = router;
