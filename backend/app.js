var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var customWorkoutRoutes = require('./routes/custom-workout');
var dashRoutes = require('./routes/dash');
var myWorkoutRoutes = require('./routes/my-workout');
var savedWorkoutRoutes = require('./routes/saved-workouts');
var userRoutes = require('./routes/user');

var Exercise = require('./models/exercise');


var app = express();
mongoose.connect('mongodb://localhost:27017/workouts-buddy');
// for now 'reset and seed' the database
// Exercise.remove({}, function(err) {
//   if (err) {
//     console.log(err);
//   }
// });
//
// // bicep exercises
// var exercise = new Exercise({
//   name: 'Bicep Curls',
//   description: 'Grab dumbells, stand with legs shoulder width apart and arms resting by side,'
//                   + 'and curl moving only the elbow upwards then back down.',
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Curls',
//   description: 'Move cable to bottom, attach bar, and curl.',
//   muscle: 'BICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/AsAVbj7puKo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Curls',
//   description: 'Put weights on side of barbell and curl.',
//   muscle: 'BICEPS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/LY1V6UbRHFM'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Concentration Curls',
//   description: 'Sit on a bench with a dumbell between your feet. With your legs'
//                 + 'shoulder width apart, reach down for the dumbell with your dominant'
//                 + 'arm, resting your elbow on your knee with your arm straight.'
//                 + 'Using your knee as leverage, curl the dumbbell toward you using'
//                 + 'nothing but your bicep. Do both arms.',
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/Jvj2wV0vOYU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Hammer Curls',
//   description: 'Hold a pair of dumbbells at your side so that they are pointing'
//                 + 'forward. Curl at the same time toward your shoulders.',
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/zC3nLlEvin4'
// });
// exercise.save();
//
// //back exercises
// var exercise = new Exercise({
//   name: 'Chin up',
//   description: 'Grab bar, pull chin up over the bar',
//   muscle: 'BACK',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/_71FpEaq-fQ'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Row',
//   description: 'Back straight, pull cable toward you',
//   muscle: 'BACK',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/GZbfZ033f74'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Lat Pulldown',
//   description: 'Adjust chair properly, grab either side of the bar, and pull bar'
//                   + 'toward chest.',
//   muscle: 'BACK',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/JEb-dwU3VF4'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Row',
//   description: 'Put hand and knee on flat bench with a straight back and let dumbbell hang. Pull'
//                 + 'dumbell staight up to just below your armpit.',
//   muscle: 'BACK',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/-koP10y1qZI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Row',
//   description: 'Put weight on either side of barbell, bend knees, and lean forward'
//                   + 'so your body is close to parallel to the ground. Grab barbell at'
//                   + 'shoulder width, look up, and lift toward your upper stomach area.',
//   muscle: 'BACK',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/9efgcAjQe7E'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'T-Bar Row',
//   description: 'Put barbell in corner with weight on the top end. Squat over the bar'
//                 + 'so your back becomes close to parallel with the ground, look up,'
//                 + 'grab the bar a few inches down from the weights with both hands'
//                 + 'and lift toward your chest.',
//   muscle: 'BACK',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/j3Igk5nyZE4'
// });
// exercise.save();
//
// // chest exercises
// var exercise = new Exercise({
//   name: 'Bench Press',
//   description: 'Press weighted bar off your chest.',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/rT7DgCr-3pg'
// });
// var exercise = new Exercise({
//   name: 'Incline Bench Press',
//   description: 'Bench on an incline',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/DbFgADa2PL8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Squat',
//   description: 'Put bar over shoulders, squat down, press up.',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/SW_C1A-rejs'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Pushdown',
//   description: 'Place something on cable, press down.',
//   muscle: 'TRICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/2-LAMcpzODU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Shoulder Press',
//   description: 'Put dumbells over head, press up, go down.',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/qEwKCR5JCog'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Crunch',
//   description: 'Lie on back, lift chin toward stomach',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/MKmrqcoCZ-M'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Leg Raise',
//   description: 'Lie on back with your legs straight out. Put your hands under your'
//             +  'butt and lift your legs up to a 90 degree angle, keeping them straight.',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/JB2oyawG9KI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Russian Twist',
//   description: 'Sit so that your back and legs are at a 45 degree angle from the'
//             +  ' ground with your knees bent. Put your hands together and twist to'
//             +  ' each side.',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/wkD8rjkodUI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Sit-up',
//   description: 'Lie on your back with your knees bent, feet flat on the floor.'
//             +  ' Using your abs, bring your body up so you are sitting straight up.',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/jDwoBqPH0jk'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Double Crunch',
//   description: 'Lie on your back with your legs out straight and slightly raised.'
//               + ' Perform a crunch, pulling your legs in at the same time.',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/otOKB-iZ548'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Bicycle',
//   description: 'Lie on your back with your hands behind your head, legs raised with '
//              + 'your knees at a 90 degree angle. Move each elbow toward your knee by twisting your body, '
//              + 'one after the other, simultaneously bringing the corresponding knee toward your elbow.',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/9FGilxCbdz8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Plank',
//   description: 'Get in push up position. Bring your elbows down so that they are '
//             +  'flat on the ground. Hold for as long as you can (or want).',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/pSHjTRCQxIw'
// });
// exercise.save();

mongoose
  .connect(
    "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else {
  //move on
    next();
  }
});
app.use('/custom-workout', customWorkoutRoutes);
app.use('/dash', appRoutes);
app.use('/my-workout', myWorkoutRoutes);
app.use('/user', userRoutes);
app.use('/saved-workouts', savedWorkoutRoutes);
app.use('/', appRoutes);

module.exports = app;
