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
var myWorkoutRoutes = require('./routes/my-workout');

var Exercise = require('./models/exercise');


var app = express();
mongoose.connect('mongodb://localhost:27017/workouts-buddy');
// for now 'reset and seed' the database
Exercise.remove({}, function(err) {
  if (err) {
    console.log(err);
  }
});

// bicep exercises
var exercise = new Exercise({
  name: 'Bicep Curls',
  description: 'Grab dumbells, stand with legs shoulder width apart and arms resting by side,'
                  + 'and curl moving only the elbow upwards then back down.',
  muscle: 'BICEPS',
  equipment: 'DUMBBELL',
  video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
});
exercise.save();
var exercise = new Exercise({
  name: 'Cable Curls',
  description: 'Move cable to bottom, attach bar, and curl.',
  muscle: 'BICEPS',
  equipment: 'CABLE',
  video: 'https://www.youtube.com/embed/AsAVbj7puKo'
});
exercise.save();
var exercise = new Exercise({
  name: 'Barbell Curls',
  description: 'Put weights on side of barbell and curl.',
  muscle: 'BICEPS',
  equipment: 'BARBELL',
  video: 'https://www.youtube.com/embed/LY1V6UbRHFM'
});
exercise.save();
var exercise = new Exercise({
  name: 'Concentration Curls',
  description: 'Sit on a bench with a dumbell between your feet. With your legs'
                + 'shoulder width apart, reach down for the dumbell with your dominant'
                + 'arm, resting your elbow on your knee with your arm straight.'
                + 'Using your knee as leverage, curl the dumbbell toward you using'
                + 'nothing but your bicep. Do both arms.',
  muscle: 'BICEPS',
  equipment: 'DUMBBELL',
  video: 'https://www.youtube.com/embed/Jvj2wV0vOYU'
});
exercise.save();
var exercise = new Exercise({
  name: 'Hammer Curls',
  description: 'Hold a pair of dumbbells at your side so that they are pointing'
                + 'forward. Curl at the same time toward your shoulders.',
  muscle: 'BICEPS',
  equipment: 'DUMBBELL',
  video: 'https://www.youtube.com/embed/zC3nLlEvin4'
});
exercise.save();

//back exercises
var exercise = new Exercise({
  name: 'Chin up',
  description: 'Grab bar, pull chin up over the bar',
  muscle: 'BACK',
  equipment: 'BODYWEIGHT',
  video: 'https://www.youtube.com/embed/_71FpEaq-fQ'
});
exercise.save();
var exercise = new Exercise({
  name: 'Cable Row',
  description: 'Back straight, pull cable toward you',
  muscle: 'BACK',
  equipment: 'CABLE',
  video: 'https://www.youtube.com/embed/GZbfZ033f74'
});
exercise.save();
var exercise = new Exercise({
  name: 'Lat Pulldown',
  description: 'Adjust chair properly, grab either side of the bar, and pull bar'
                  + 'toward chest.',
  muscle: 'BACK',
  equipment: 'CABLE',
  video: 'https://www.youtube.com/embed/JEb-dwU3VF4'
});
exercise.save();
var exercise = new Exercise({
  name: 'Dumbbell Row',
  description: 'Put hand and knee on flat bench with a straight back and let dumbbell hang. Pull'
                + 'dumbell staight up to just below your armpit.',
  muscle: 'BACK',
  equipment: 'DUMBBELL',
  video: 'https://www.youtube.com/embed/-koP10y1qZI'
});
exercise.save();
var exercise = new Exercise({
  name: 'Barbell Row',
  description: 'Put weight on either side of barbell, bend knees, and lean forward'
                  + 'so your body is close to parallel to the ground. Grab barbell at'
                  + 'shoulder width, look up, and lift toward your upper stomach area.',
  muscle: 'BACK',
  equipment: 'BARBELL',
  video: 'https://www.youtube.com/embed/9efgcAjQe7E'
});
exercise.save();
var exercise = new Exercise({
  name: 'T-Bar Row',
  description: 'Put barbell in corner with weight on the top end. Squat over the bar'
                + 'so your back becomes close to parallel with the ground, look up,'
                + 'grab the bar a few inches down from the weights with both hands'
                + 'and lift toward your chest.',
  muscle: 'BACK',
  equipment: 'BARBELL',
  video: 'https://www.youtube.com/embed/j3Igk5nyZE4'
});
exercise.save();

// chest exercises
var exercise = new Exercise({
  name: 'Bench Press',
  description: 'Press weighted bar off your chest.',
  muscle: 'CHEST',
  equipment: 'BARBELL'
});
var exercise = new Exercise({
  name: 'Incline Bench Press',
  description: 'Bench on an incline',
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
app.use('/my-workout', myWorkoutRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('index');
});

module.exports = app;
