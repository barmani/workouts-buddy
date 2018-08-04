var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

var User = require('../models/user');
var ExerciseSet = require('../models/exercise-set');
var Set = require('../models/set');

/**
 * Create a new user and send a verification email for them to active account.
 */
exports.newUser = function(req, res, next) {
  var user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    email: req.body.email
  });
  user.save(function saveUser(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    result.activationToken = jwt.sign({user: result}, process.env.JWT_KEY);
    result.save();
    const activationLink = 'http://localhost:4200/login-signup' + '?token='
      + result.activationToken + '&username=' + result.username;
    // configure and send email
    var smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
      }
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
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
}

/**
 * Log in a user given the correct credentials.
 */
exports.login = function(req, res, next) {
  User.findOne({
    username: req.body.username
  }, function onUserFound(err, user) {
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
        var token = jwt.sign({user: user}, process.env.JWT_KEY);
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
    var token = jwt.sign({user: user}, process.env.JWT_KEY);
     res.status(200).json({
         message: 'Successfully logged in',
         token: token,
         userId: user._id
     });
  });
}

/**
 * Send a new password to a user who forgot their password.
 */
exports.forgotPassword = function(req, res, next) {
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
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
      });
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
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
  });
}

/**
 * Get user information for the user page.
 */
exports.getUserData = function(req, res, next) {
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
}

/**
 * Get the sets previously made for a certain exercise if they exist.
 */
exports.getPreviousSets = function(req, res, next) {
  User.findById(req.params.id, function onUserFound(err, user) {
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
      findExerciseSet();
    }
    /**
     * Find the exercise sets for the requested exercise if they exist.
     */
    function findExerciseSet() {
      var exerciseSetToUse;
      user.exerciseSets.forEach((exerciseSetId, index) => {
        ExerciseSet.findById(exerciseSetId)
                   .populate('sets')
                   .exec(function (err, exerciseSet) {
          if (exerciseSet.exercise == req.params.exerciseId) {
            exerciseSetToUse = exerciseSet;
          }
          if (index === user.exerciseSets.length - 1) {
            if (exerciseSetToUse) {
              getUserSets(exerciseSetToUse);
            } else if (exerciseSet.exercise == req.params.exerciseId) {
              getUserSets(exerciseSet);
            } else {
              getUserSets(undefined);
            }
          }
        });
      });
    }

    /**
     * Retrieve the 5 newest sets recorded by the user for this exercise.
     */
    function getUserSets(exerciseSet) {
      var retExerciseSets = [];
      // No sets saved, return empty array
      if (!exerciseSet) {
        returnSets(retExerciseSets);
      // User has less than 5 sets saved so just return them
      } else if (exerciseSet.sets.length <= 5) {
        retExerciseSets = exerciseSet.sets;
        returnSets(retExerciseSets);
      } else {
          exerciseSet.sets.forEach((set, setIndex) => {
            // push the first five into the returning array
            if (retExerciseSets.length < 5) {
              retExerciseSets.push(set);
            } else {
              let minDate = set.updatedAt;
              let newIndex = -1;
              // replace oldest set each time
              retExerciseSets.forEach(function replaceOldestSet(retSet, retIndex) {
                if (retSet.updatedAt.getTime() < minDate.getTime()) {
                  minDate = retSet.updatedAt;
                  newIndex = retIndex;
                }
                if (retIndex === retExerciseSets.length - 1) {
                  // replace the oldest set in retExerciseSets if it is older than the current set
                  if (newIndex >= 0) {
                    retExerciseSets.splice(newIndex, 1, set);
                  }
                }
              });
            }
          });
          returnSets(retExerciseSets);
      }

      /**
       * Return the 5 most current sets.
       */
      function returnSets(sets) {
        return res.status(200).json({
          message: 'Sets retrieved successfully',
          obj: sets
        });
      }
    }
  });
}

/**
 * Update a recorded set for some exercise.
 */
exports.updateSet = function(req, res, next) {
  Set.findById(req.params.setId, function onSetFound(err, set) {
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
    set.save(function saveSet(err, savedSet) {
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
}

/**
 * Create a new set for some exercise.
 */
exports.addSet = function(req, res, next) {
  var newSet = new Set({
    weight: parseInt(req.body.weight),
    unitOfMeasure: req.body.unitOfMeasure,
    reps: req.body.reps
  });
  // create the set
  newSet.save(function saveNewSet(err, set) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred saving the set',
        error: err
      });
    } else {
      findUserAndAddExerciseSet(set);
    }
  });
  function findUserAndAddExerciseSet(set) {
    var exerciseSetFound = false;
    User.findById(req.params.userId, function onUserFound(err, user) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred finding the user',
          error: err
        });
      }
      if (user.exerciseSets && user.exerciseSets.length > 0) {
        findExerciseSet(user, set);
      } else {
        createNewExerciseSet(user, set);
      }
    });

    function findExerciseSet(user, set) {
      user.exerciseSets.forEach((exerciseSet, index) => {
        ExerciseSet.findById(exerciseSet, function checkExerciseSet(err, es) {
          if (es.exercise == req.params.exerciseId) {
            exerciseSetFound = true;
            foundExerciseSet(es);
          } else if (index === user.exerciseSets.length - 1 && !exerciseSetFound) {
            createNewExerciseSet(user, set);
          }
        });
      });
    }

    function createNewExerciseSet(user, set) {
      var newExerciseSet = new ExerciseSet({
        sets: [set._id],
        exercise: req.params.exerciseId
      });
      newExerciseSet.save(function saveNewExerciseSet(err, exerciseSet) {
        if (err) {
          return res.status(500).json({
            title: 'An error occurred saving the exercise set',
            error: err
          });
        }
        user.exerciseSets.push(newExerciseSet);
        user.save(function saveUser(err, savedUser) {
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

    function foundExerciseSet(exerciseSet) {
      found = true;
      exerciseSet.sets.push(set);
      exerciseSet.save(function updateExerciseSet(err, result) {
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
  }
}

/**
 * Update some information for the user. As of now it is password or email.
 */
exports.updateUserInfo = function(req, res, next) {
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
    if (req.body.email) {
      user.email = req.body.email;
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
      });
    });
  });
}

/**
 * Remove a user account.
 */
exports.removeAccount = function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function(err, result) {
    if (err) {
      return res.status(500).json({
        message: 'An error occurred deleting the user',
        error: err
      });
    }
    return res.status(201).json({
      message: 'User updated successfully',
      obj: result
    });
  });
}
