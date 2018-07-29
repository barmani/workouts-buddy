var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var customWorkoutRoutes = require('./routes/custom-workout');
var aboutRoutes = require('./routes/about');
var myWorkoutRoutes = require('./routes/my-workout');
var savedWorkoutRoutes = require('./routes/saved-workouts');
var userRoutes = require('./routes/user');

var Exercise = require('./models/exercise');


var app = express();
mongoose.connect('mongodb://localhost:27017/workouts-buddy');
//for now 'reset and seed' the database
// Exercise.remove({}, function(err) {
//   if (err) {
//     console.log(err);
//   }
// });
//
// // bicep exercises
// var exercise = new Exercise({
//   name: 'Bicep Curls',,
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/ykJmrZ5v0Oo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Curls',
//   muscle: 'BICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/AsAVbj7puKo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Curls',
//   muscle: 'BICEPS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/LY1V6UbRHFM'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Concentration Curls',
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/Jvj2wV0vOYU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Hammer Curls',
//   muscle: 'BICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/zC3nLlEvin4'
// });
// exercise.save();
//
// //back exercises
// var exercise = new Exercise({
//   name: 'Chin up',
//   muscle: 'BACK',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/_71FpEaq-fQ'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Row',
//   muscle: 'BACK',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/GZbfZ033f74'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Lat Pulldown',
//   muscle: 'BACK',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/JEb-dwU3VF4'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Row',
//   muscle: 'BACK',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/-koP10y1qZI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Row',
//   muscle: 'BACK',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/9efgcAjQe7E'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'T-Bar Row',
//   muscle: 'BACK',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/j3Igk5nyZE4'
// });
// exercise.save();
//
// // chest exercises
// var exercise = new Exercise({
//   name: 'Bench Press',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/rT7DgCr-3pg'
// });
// var exercise = new Exercise({
//   name: 'Incline Bench Press',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/DbFgADa2PL8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Decline Bench Press',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/LfyQBUKR8SE'
// });
// var exercise = new Exercise({
//   name: 'Wide Grip Bench Press',
//   muscle: 'CHEST',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/jHoTF0kpkhQ'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Press',
//   muscle: 'CHEST',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/SHsUIZiNdeY'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Incline Dumbbell Press',
//   muscle: 'CHEST',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/8iPEnn-ltC8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Decline Dumbbell Press',
//   muscle: 'CHEST',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/0xRvl4Qv3ZY'
// });
// var exercise = new Exercise({
//   name: 'Dumbbell Fly',
//   muscle: 'CHEST',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/eozdVDA78K0'
// });
// var exercise = new Exercise({
//   name: 'Incline Dumbbell Fly',
//   muscle: 'CHEST',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/bDaIL_zKbGs'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Flys',
//   muscle: 'CHEST',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/Iwe6AmxVf7o'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Low Cable Flys',
//   muscle: 'CHEST',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/M1N804yWA-8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Chest Press',
//   muscle: 'CHEST',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/xUm0BiZCWlQ'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Chest Fly',
//   muscle: 'CHEST',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/Z57CtFmRMxA'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Pushup',
//   muscle: 'CHEST',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/Eh00_rniF8E'
// });
// exercise.save();
//
//leg exercises
// var exercise = new Exercise({
//   name: 'Squat',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/SW_C1A-rejs'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Lunge',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/0_9sJd9P8M0'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Lunge',
//   muscle: 'LEGS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/D7KaRcUTQeE'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Goblet Squat',
//   muscle: 'LEGS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/MeIiIdhvXT4'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Leg Press',
//   muscle: 'LEGS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/IZxyjW7MPJQ'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Leg Extension',
//   muscle: 'LEGS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/YyvSfVjQeL0'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Hamstring Extension',
//   muscle: 'LEGS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/F488k67BTNo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Deadlift',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/UyRiw2b8yI4'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Straight Leg Deadlift',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/1uDiW5--rAE'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Front Squat',
//   muscle: 'LEGS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/VfBOBhwXbro'
// });
// exercise.save();
//
// tricep exercises
// var exercise = new Exercise({
//   name: 'Cable Pushdown',
//   muscle: 'TRICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/2-LAMcpzODU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Rope Pushdown',
//   muscle: 'TRICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/vB5OHsJ3EME'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Reverse Grip Pushdown',
//   muscle: 'TRICEPS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/jJ5Q9fL-xdk'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Overhead Extension',
//   muscle: 'TRICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/YbX7Wd8jQ-Q'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Tricep Kickback',
//   muscle: 'TRICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/6SS6K3lAwZ8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dips',
//   muscle: 'TRICEPS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/wjUmnZH528Y'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Bench Dips',
//   muscle: 'TRICEPS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/0326dy_-CzM'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Skull Crushers',
//   muscle: 'TRICEPS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/d_KZxkY_0cM'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Skull Crushers',
//   muscle: 'TRICEPS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/ir5PsbniVSc'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Diamond Pushups',
//   muscle: 'TRICEPS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/J0DnG1_S92I'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Tricep Extension Machine',
//   muscle: 'TRICEPS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/qCF_hG27jVU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Tricep Press Machine',
//   muscle: 'TRICEPS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/4W31U8tTVAg'
// });
// exercise.save();
//
// var exercise = new Exercise({
//   name: 'Shoulder Press',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/qEwKCR5JCog'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Barbell Shoulder Press',
//   muscle: 'SHOULDERS',
//   equipment: 'BARBELL',
//   video: 'https://www.youtube.com/embed/2yjwXTZQDDI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Rear Delt Flyes',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/EA7u4Q_8HQ0'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Front Raise',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/-t7fuZ0KhDA'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Dumbbell Side Raise',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/3VcKaXpzqRo'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Arnold Press',
//   muscle: 'SHOULDERS',
//   equipment: 'DUMBBELL',
//   video: 'https://www.youtube.com/embed/6Z15_WdXmVw'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Front Delt Raise',
//   muscle: 'SHOULDERS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/PmXz2Ik-On4'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Rear Delt Cable Fly',
//   muscle: 'SHOULDERS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/DAC4qmKv5o0'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Cable Lateral Raise',
//   muscle: 'SHOULDERS',
//   equipment: 'CABLE',
//   video: 'https://www.youtube.com/embed/PPrzBWZDOhA'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Machine Overhead Press',
//   muscle: 'SHOULDERS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/Wqq43dKW1TU'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Rear Delt Machine',
//   muscle: 'SHOULDERS',
//   equipment: 'MACHINE',
//   video: 'https://www.youtube.com/embed/K-ilBw_D1a4'
// });
// exercise.save();
//
// ab exercises
// var exercise = new Exercise({
//   name: 'Crunch',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/MKmrqcoCZ-M'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Leg Raise',,
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/JB2oyawG9KI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Russian Twist',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/wkD8rjkodUI'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Sit-up',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/jDwoBqPH0jk'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Double Crunch',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/otOKB-iZ548'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Bicycle',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/9FGilxCbdz8'
// });
// exercise.save();
// var exercise = new Exercise({
//   name: 'Plank',
//   muscle: 'ABS',
//   equipment: 'BODYWEIGHT',
//   video: 'https://www.youtube.com/embed/pSHjTRCQxIw'
// });
// exercise.save();
//
// mongoose
//   .connect(
//     "mongodb+srv://max:QuBqs0T45GDKPlIG@cluster0-ntrwp.mongodb.net/workouts-buddy?retryWrites=true"
//   )
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!!!!");
//   });

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
  //intercepts OPTIONS method from CORS
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.sendStatus(200);
  }
  else {
  //move on
    next();
  }
});


app.use('/custom-workout', customWorkoutRoutes);
app.use('/about', appRoutes);
app.use('/my-workout', myWorkoutRoutes);
app.use('/user', userRoutes);
app.use('/saved-workouts', savedWorkoutRoutes);
app.use('/', appRoutes);

module.exports = app;
