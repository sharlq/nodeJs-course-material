import { validationResult } from 'express-validator';
export function validate(req, res, next) {
  console.log(req.body, res.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  }
  next();
}
