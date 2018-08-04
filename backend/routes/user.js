var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');

var UserController = require('../controllers/user');


/* POST create a new user */
router.post('', UserController.newUser);

/* POST Log in a user if credentials are correct */
router.post('/login', UserController.login);

/* PATCH password reset */
router.patch('/login', UserController.forgotPassword);

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

/* GET get user data */
router.get('/:id', UserController.getUserData);

/* GET get previous sets for some exercise */
router.get('/:id/:exerciseId/', UserController.getPreviousSets);

/* PATCH update an existing set for some exercise */
router.patch('/:userId/:exerciseId/:setId', UserController.updateSet);

/* POST add a new set for some exercise */
router.post('/:userId/:exerciseId', UserController.addSet);

/* PATCH update some user information */
router.patch('/:userId', UserController.updateUserInfo);

/* DELETE delete a user account */
router.delete('/:id', UserController.removeAccount);

module.exports = router;
