const { Router } = require('express');
const UserController = require('../controllers/user');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth');

const router = Router();

// GET /users - Retrieve all users
router.get('', authMiddleware.isUser, UserController.getAllUsers);

// POST /users - Create a new user
router.post(
  '',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      })
      .withMessage('password should be more than 6 characters'),
    body('password_confirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match');
      }
      return true;
    }),
  ],
  UserController.create
);

// GET /users/watchHistory - Retrieve your watch list as a user
router.get('/watchHistory', authMiddleware.validateAndGetUser, (req, res) => {
  res.send({
    youAre: req.user,
    watchList: [
      'Tackle',
      'Quick Attack',
      'Thunderbolt',
      'Flamethrower',
      'Water Gun',
      'Leaf Blade',
      'Rock Slide',
      'Ice Beam',
      'Earthquake',
      'Psychic',
    ],
  });
});

// GET /users/:id - Retrieve a specific user by ID
router.get('/:id', UserController.getUserById);

// PUT /users/:id - Update a specific user by ID
router.put(
  '/:id',
  [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Invalid email'),
  ],
  UserController.update
);

// DELETE /users/:id - Delete a specific user by ID
router.delete('/:id', UserController.delete);

// PATCH /users/:id - Update specific fields of a user
router.patch(
  '/:id',
  [body('active').isBoolean().withMessage('Active should be boolean')],
  authMiddleware.isAdmin,
  UserController.userActivation
);

module.exports = router;
