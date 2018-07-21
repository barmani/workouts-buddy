var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  weight: Number,
  unitOfMeasure: {
    type: String,
    enum: ['LBS', 'KG'],
    default: ['LBS']
  },
  reps: Number
},
{
  timestamps: true
});

module.exports = mongoose.model('Set', schema);
