var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');

var SavedWorkoutsController = require('../controllers/saved-workout');

/* verify token before user specific requests */
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, config.AWT_KEY, function handleDecode(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
});

/* GET retrieve user's saved workouts from the db */
router.get('/', SavedWorkoutsController.getSavedWorkouts);

/* PATCH add a workout to saved workouts */
router.patch('/', SavedWorkoutsController.addToSavedWorkouts);

/* DELETE remove a saved workout */
router.delete('/:id', SavedWorkoutsController.removeWorkout);

module.exports = router;
