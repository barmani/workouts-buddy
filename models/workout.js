var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'CUSTOM'],
    default: ['BEGINNER'],
    required: true
  },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }]
});

module.exports = mongoose.model('Workout', schema);
