const User = require('../models/user');
const { validationResult } = require('express-validator');
const auth = require('../utils/auth');

// POST /signup - signup a new user
exports.signup = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, password } = req.body;

    const credentials = await auth.genPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: credentials.hash,
      salt: credentials.salt,
    });

    const token = auth.issueJWT(user);

    res.json({
      user: {
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare the provided password with the hashed password
    const isMatch = await auth.checkPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = auth.issueJWT(user);

    // Send the token and the user data as a response
    res.json({
      user: {
        name: user.firstName + ' ' + user.lastName,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
