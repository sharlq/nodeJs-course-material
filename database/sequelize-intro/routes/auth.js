const { Router } = require('express');
const AuthController = require('../controllers/auth');
const { body } = require('express-validator');

const router = Router();

// POST /signup - signup a new user
router.post(
  '/signup',
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
  AuthController.signup
);

// POST /login - login a  user
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  AuthController.login
);

module.exports = router;
