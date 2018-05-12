var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  muscle: {
    type: String,
    enum: ['BICEPS', 'BACK', 'TRICEPS', 'CHEST', 'LEGS', 'SHOULDERS', 'ABS', 'FULL_BODY'],
    default: ['FULL_BODY']
  },
  equipment: {
    type: String,
    enum: ['BARBELL', 'DUMBBELL', 'FREEWEIGHT', 'BODYWEIGHT', 'CABLE', 'MACHINE'],
    default: ['FREEWEIGHT']
  }

});

module.exports = mongoose.model('Exercise', schema);
