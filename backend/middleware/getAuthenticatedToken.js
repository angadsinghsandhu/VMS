const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json("Access Denied");
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY);
    req.tokenObject = verified;
    next();
  } catch (error) {
    res.status(400).json("Invalid Token");
  }
}
