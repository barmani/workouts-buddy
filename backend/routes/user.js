var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');
const nodemailer = require('nodemailer');

var User = require('../models/user');
var ExerciseSet = require('../models/exercise-set');
var Set = require('../models/set');


/* Create a new user */
router.post('', function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    result.activationToken = jwt.sign({user: result}, config.AWT_KEY);
    result.save();
    const activationLink = 'http://localhost:4200/login-signup' + '?token=' + result.activationToken + '&username=' + result.username;
    // configure and send email
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: config.EMAIL_USERNAME,
          pass: config.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: config.EMAIL_USERNAME,
      to: result.email,
      subject: 'WorkoutsBuddy Verification',
      html: '<h3>Hello ' + result.username + ', </h3><br><p>Thank you for joining WorkoutsBuddy!'
        + ' Click <a href=\"' + activationLink + '\">this link</a> to get started. Happy exercising!'
    };
    smtpTransport.sendMail(mailOptions, function (err, info) {
       if(err)
         console.log(err);
       else
         console.log(info);
    });
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

router.post('/login', function(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'User not found',
        error: {message: 'User not found'}
      });
    }
    // make sure account is verified
    if (!user.active) {
      // this is the route a user goes to in order to verify their account
      if (req.query.token === user.activationToken) {
        user.active = true;
        user.save();
        var token = jwt.sign({user: user}, config.AWT_KEY);
        return res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
      } else {
        return res.status(401).json({
          message: 'User not activated',
          error: {message: 'User not actived'}
        });
      }
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).json({
        title: 'Incorrect password',
        error: {message: 'Incorrect password'}
      });
    }
    var token = jwt.sign({user: user}, config.AWT_KEY);
     res.status(200).json({
         message: 'Successfully logged in',
         token: token,
         userId: user._id
     });
  });
});

router.patch('/login', function(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    } else if (!user) {
      return res.status(401).json({
        title: 'User not found',
        error: {message: 'User not found'}
      });
    } else if (!user.active) {
      return res.status(401).json({
        title: 'User not activated',
        error: {message: 'Activate account first'}
      });
    }
    const randomPassword = Math.random().toString(36).slice((Math.random() + 1) * -6);
    user.password = bcrypt.hashSync(randomPassword, 10);
    user.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred saving the user',
          error: err
        });
      }
      var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.EMAIL_USERNAME,
            pass: config.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: config.EMAIL_USERNAME,
        to: result.email,
        subject: 'WorkoutsBuddy Password Change',
        html: '<h3>Hello ' + result.username + ', </h3><br><p>Your new password is:</p><br><p>' + randomPassword
          + '</p><br> <p>Log in <a href="http://localhost:4200/login-signup">here</a> and change your password in'
          + ' your settings if you would like. Happy exercising!</p>'
      };
      smtpTransport.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err);
         else
           console.log(info);
      });
      return res.status(201).json({
        message: 'Password successfully changed',
        obj: result
      });
    });
  })
});

/* verify token before user specific requests */
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, config.AWT_KEY, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      if (!user) {
        return res.status(401).json({
          message: 'User not found',
          error: {message: 'User not found'}
        });
      }
      return res.status(200).json({
        message: 'User data retrieved',
        obj: user
      });
    });
});

router.get('/:id/:exerciseId/', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'User not found',
        error: {message: 'User not found'}
      });
    }
    if (user.exerciseSets.length === 0) {
      return res.status(200).json({
        message: 'No sets saved yet',
        obj: []
      });
    } else {
      var retExerciseSet = {};
      user.exerciseSets.forEach((exerciseSetId, index) => {
        ExerciseSet.findById(exerciseSetId)
                   .populate('sets')
                   .exec(function(err, exerciseSet) {
          if (exerciseSet.exercise == req.params.exerciseId) {
            retExerciseSet = exerciseSet
          }
          if (index === user.exerciseSets.length - 1) {
            return res.status(200).json({
              message: 'Sets Retrieved',
              obj: retExerciseSet
            });
          }
        });
      });
    }
  });
});

// edit an existing exercise set
router.patch('/:userId/:exerciseId/:setId', function(req, res, next) {
  Set.findById(req.params.setId, function(err, set) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred saving the set',
        error: err
      });
    }
    if (!set) {
      return res.status(500).json({
        title: 'set not found',
        error: err
      });
    }
    if (req.body.weight) {
      set.weight = req.body.weight;
    }
    if (req.body.unitOfMeasure) {
      set.unitOfMeasure = req.body.unitOfMeasure;
    }
    if (req.body.reps) {
      set.reps = req.body.reps;
    }
    set.save(function(err, savedSet) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred saving the set',
          error: err
        });
      }
      return res.status(201).json({
        message: 'Set updated successfully',
        obj: savedSet
      });
    })
  });
});

// add a new exercise set
router.post('/:userId/:exerciseId', function(req, res, next) {
  var newSet = new Set({
    weight: parseInt(req.body.weight),
    unitOfMeasure: req.body.unitOfMeasure,
    reps: req.body.reps
  });
  // create the set
  newSet.save(function(err, set) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred saving the set',
        error: err
      });
    }
    User.findById(req.params.userId, function(err, user) {
      var found = false;
      user.exerciseSets.forEach((exerciseSet) => {
        if (exerciseSet.exercise === req.params.exerciseId) {
          found = true;
          // TODO: Here is where to potentially delete old sets
          exerciseSet.sets.push(set);
          exerciseSet.save(function(err, result) {
            if (err) {
              return res.status(500).json({
                title: 'An error occurred saving the exercise set',
                error: err
              });
            }
            return res.status(201).json({
              message: 'Exercise Set updated successfully',
              obj: set
            });
          });
        }
      });
      if (!found) {
        var newExerciseSet = new ExerciseSet({
          sets: [set._id],
          exercise: req.params.exerciseId
        });
        newExerciseSet.save(function(err, exerciseSet) {
          if (err) {
            return res.status(500).json({
              title: 'An error occurred saving the exercise set',
              error: err
            });
          }
          user.exerciseSets.push(newExerciseSet);
          user.save(function(err, savedUser) {
            if (err) {
              return res.status(500).json({
                title: 'An error occurred saving the exercise set to the user\'s sets',
                error: err
              });
            }
            return res.status(201).json({
              message: 'Exercise set added to user\'s exercise sets successfully',
              obj: set
            });
          });
        });
      }
    });
  });
});

router.patch('/:userId', function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred finding the user',
        error: err
      });
    }
    if (req.body.newPassword) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        user.password = bcrypt.hashSync(req.body.newPassword, 10);
      } else {
        return res.status(401).json({
          title: 'Incorrect password',
          error: {message: 'Incorrect password'}
        });
      }
    }
    user.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          message: 'An error occurred saving the user',
          error: err
        });
      }
      return res.status(201).json({
        message: 'User updated successfully',
        obj: result
      })
    });
  });
});

module.exports = router;
