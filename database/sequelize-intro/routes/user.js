const { Router } = require('express');
const UserController = require('../controllers/user');

const router = Router();
// GET /users - Retrieve all users
router.get('/users', UserController.getAllUsers);

// POST /users - Create a new user
router.post('/users', UserController.create);

// GET /users/:id - Retrieve a specific user by ID
router.get('/users/:id', UserController.getUserById);

// PUT /users/:id - Update a specific user by ID
router.put('/users/:id', UserController.update);

// DELETE /users/:id - Delete a specific user by ID
router.delete('/users/:id', UserController.delete);

// PATCH /users/:id - Update specific fields of a user
router.patch('/users/:id', UserController.userActivation);

module.exports = router;

/* 
// GET /users - Retrieve all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /users - Create a new user
app.post('/users', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const user = await User.create({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /users/:id - Retrieve a specific user by ID
app.get('/users/:id', async (req, res) => {
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
});

// PUT /users/:id - Update a specific user by ID
app.put('/users/:id', async (req, res) => {
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
});

// DELETE /users/:id - Delete a specific user by ID
app.delete('/users/:id', async (req, res) => {
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
});

// PATCH /users/:id - Update specific fields of a user
app.patch('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    const [updatedRowsCount] = await User.update({ active }, { where: { id } });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json({ message: 'User updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = Router;
*/
