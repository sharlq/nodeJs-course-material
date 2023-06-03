const User = require('../models/user');
const { validationResult } = require('express-validator');
const auth = require('../utils/auth');

// GET /users - Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /users - Create a new user
exports.create = async (req, res) => {
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
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /users/:id - Retrieve a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /users/:id - Update a specific user by ID
exports.update = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const [updatedRowsCount] = await User.update(
      { firstName, lastName, email },
      { where: { id } }
    );
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /users/:id - Delete a specific user by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRowCount = await User.destroy({ where: { id } });
    if (deletedRowCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PATCH /users/:id - Update specific fields of a user
exports.userActivation = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { active } = req.body;
    const [updatedRowsCount] = await User.update({ active }, { where: { id } });
    const hmm = await User.findByPk(id);
    console.log(hmm);
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
