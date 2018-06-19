var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  sets: [ { type: Schema.Types.ObjectId, ref: 'Set' } ],
  exercise: { type: Schema.Types.ObjectId, ref: 'Exercise' }
});

module.exports = mongoose.model('ExerciseSet', schema);
