const authHelpers = require('../utils/auth');

exports.isUser = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }

  const isUser = authHelpers.isValidateToken(token);

  if (!isUser) {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }
  next();
};

exports.validateAndGetUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }

  const user = await authHelpers.getTokenUser(token);
  if (!user) {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }

  req.user = user;
  next();
};

exports.isAdmin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }

  const user = await authHelpers.getTokenUser(token);
  console.log(user.role);
  if (user.role !== 'ADMIN') {
    return res.status(401).send({ message: 'you are not authorized' }); // Unauthorized
  }
  next();
};
