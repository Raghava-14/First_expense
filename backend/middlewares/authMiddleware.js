const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(403).send({ message: 'A token is required for authentication' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    req.userId = decoded.userId;
  } catch (err) {
    return res.status(401).send({ message: 'Invalid Token' });
  }
  return next();
};

module.exports = verifyToken;
