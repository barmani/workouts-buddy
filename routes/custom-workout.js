var express = require('express');
var router = express.Router();

var Exercise = require('../models/exercise');
var Workout = require('../models/workout');

/* GET custom workout page. */
router.get('/', function(req, res, next) {
  console.log('heereeee');
  const muscle = [];
  const equip = [];
  const retVal = { muscleFields: muscle, equipmentFields: equip };
  return res.status(200).json({
    message: 'Successful',
    obj: retVal
  });
});

module.exports = router;
