var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var customWorkoutRoutes = require('./routes/custom-workout');
var dashRoutes = require('./routes/dash');
var newWorkoutRoutes = require('./routes/new-workout');

var Exercise = require('./models/exercise');


var app = express();
mongoose.connect('mongodb://localhost:27017/workouts-buddy');
// for now 'reset and seed' the database
Exercise.remove({}, function(err) {
  if (err) {
    console.log(err);
  }
});
var exercise = new Exercise({
  name: 'Bicep Curls',
  description: 'Grab dumbells and curl away!',
  muscle: 'BICEPS',
  equipment: 'DUMBBELL'
});
exercise.save();
var exercise = new Exercise({
  name: 'Pull up',
  description: 'Grab bar, pull chin up over the bar',
  muscle: 'BACK',
  equipment: 'BODYWEIGHT'
});
exercise.save();
var exercise = new Exercise({
  name: 'Bench Press',
  description: 'Press weighted bar off your chest.',
  muscle: 'CHEST',
  equipment: 'BARBELL'
});
exercise.save();
var exercise = new Exercise({
  name: 'Squat',
  description: 'Put bar over shoulders, squat down, press up.',
  muscle: 'LEGS',
  equipment: 'BARBELL'
});
exercise.save();
var exercise = new Exercise({
  name: 'Cable Pushdown',
  description: 'Place something on cable, press down.',
  muscle: 'TRICEPS',
  equipment: 'CABLE'
});
exercise.save();
var exercise = new Exercise({
  name: 'Shoulder Press',
  description: 'Put dumbells over head, press up, go down.',
  muscle: 'SHOULDERS',
  equipment: 'DUMBBELL'
});
exercise.save();
var exercise = new Exercise({
  name: 'Crunch',
  description: 'Lie on back, lift chin toward stomach',
  muscle: 'ABS',
  equipment: 'BODYWEIGHT'
});
exercise.save();
var exercise = new Exercise({
  name: 'Incline Bench Press',
  description: 'Bench on an incline',
  muscle: 'CHEST',
  equipment: 'BARBELL'
});
exercise.save();
var exercise = new Exercise({
  name: 'Cable Row',
  description: 'Back straight, pull cable toward you',
  muscle: 'BACK',
  equipment: 'CABLE'
});
exercise.save();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/custom-workout', appRoutes);
app.use('/dash', appRoutes);
app.use('/new-workout', appRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
