var jwt = require('jsonwebtoken');
var config = require('../../config.json');

module.exports = (req, res, next) => {
  jwt.verify(req.query.token, config.AWT_KEY, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
};
