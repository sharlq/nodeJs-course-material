import { body } from 'express-validator';
const titleValidation = body('title')
  .exists()
  .withMessage('title must be defined here')
  .bail()
  .isString()
  .withMessage('title must be string');

const descriptionValidation = body('description')
  .exists()
  .withMessage('description must be defined here')
  .bail()
  .isString()
  .withMessage('description must be string');

const isCompletedValidation = body('isCompleted')
  .exists()
  .withMessage('isCompleted must be defined here')
  .bail()
  .isBoolean()
  .withMessage('description must be boolean');

const postValidatorArray = [
  titleValidation,
  descriptionValidation,
  isCompletedValidation,
];

const patchValidatorArray = [isCompletedValidation];

export default { postValidatorArray, patchValidatorArray };
