const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
exports.genPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return {
    salt: salt,
    hash: hash,
  };
};

exports.issueJWT = (user) => {
  const expiresIn = '1y';
  const payload = {
    id: user.id,
    email: user.email,
    // Add any additional user data to the payload as needed
  };

  const secretKey = process.env.JWT_SECRET; // Replace with your actual secret key

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

exports.checkPassword = async (enteredPassword, storedHash) => {
  const isMatch = await bcrypt.compare(enteredPassword, storedHash);
  return isMatch;
};

exports.isValidateToken = (token) => {
  const secretKey = process.env.JWT_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey);
    if (!decoded) return false;
    return true;
  } catch (error) {
    // Token is invalid or expired
    console.log(error);
    return false;
  }
};

exports.getTokenUser = async (token) => {
  const secretKey = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return false;
    }

    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};
