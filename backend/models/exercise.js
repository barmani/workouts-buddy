var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  muscle: {
    type: String,
    enum: ['BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'],
    default: ['FULL_BODY'],
    required: true
  },
  equipment: {
    type: String,
    enum: ['BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'],
    default: ['FREEWEIGHT'],
    required: true
  },
  video: String

});

module.exports = mongoose.model('Exercise', schema);
