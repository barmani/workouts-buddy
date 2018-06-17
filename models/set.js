var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  weight: Number,
  unitOfMeasure: {
    type: String,
    enum: ['LBS', 'KG', 'ADVANCED', 'CUSTOM'],
    default: ['LBS']
  },
  reps: Number
});

module.exports = mongoose.model('Set', schema);
