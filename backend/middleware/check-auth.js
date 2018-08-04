var jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  jwt.verify(req.query.token, process.env.JWT_KEY, function(err, decoded) {
    if (err) {
      return res.status(401).json({
        title: 'User not authenticated',
        error: err
      });
    }
    next();
  });
};
