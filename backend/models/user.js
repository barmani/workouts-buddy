var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  active: {type: Boolean, required: true, default: false},
  activationToken: String,
  workouts: [ { type: Schema.Types.ObjectId, ref: 'Workout' } ],
  exerciseSets: [ { type: Schema.Types.ObjectId, ref: 'ExerciseSet' } ]
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);
