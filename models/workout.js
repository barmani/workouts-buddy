var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {
    type: String,
    required: true
  },
  exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
  length: Number
});

module.exports = mongoose.model('Workout', schema);
