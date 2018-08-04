var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var config = require('../../config.json');

var checkAuth = require('../middleware/check-auth');
var UserController = require('../controllers/user');


/* POST create a new user */
router.post('', UserController.newUser);

/* POST Log in a user if credentials are correct */
router.post('/login', UserController.login);

/* PATCH password reset */
router.patch('/login', UserController.forgotPassword);

/* GET get user data */
router.get('/:id', checkAuth, UserController.getUserData);

/* GET get previous sets for some exercise */
router.get('/:id/:exerciseId/', checkAuth, UserController.getPreviousSets);

/* PATCH update an existing set for some exercise */
router.patch('/:userId/:exerciseId/:setId', checkAuth, UserController.updateSet);

/* POST add a new set for some exercise */
router.post('/:userId/:exerciseId', checkAuth, UserController.addSet);

/* PATCH update some user information */
router.patch('/:userId', checkAuth, UserController.updateUserInfo);

/* DELETE delete a user account */
router.delete('/:id', checkAuth, UserController.removeAccount);

module.exports = router;
