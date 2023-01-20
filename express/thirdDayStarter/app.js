import express from 'express';
import { validate } from './validationMiddleWare.js';
import validations from './validations.js';

const app = express();

app.post('/tasks', validations.postValidatorArray, validate, (req, res) => {
  res.send({
    id: '1',
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
  });
});

app.get('/tasks', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'text',
      description: 'text',
      isCompleted: 'boolean',
    },
    {
      id: 2,
      title: 'text',
      description: 'text',
      isCompleted: 'boolean',
    },
  ]);
});

app.get('/tasks/:id', (req, res) => {
  res.send({
    id: parseInt(req.params.id),
    title: 'text',
    description: 'text',
    isCompleted: 'boolean',
  });
});

app.put('/tasks/:id', validations.postValidatorArray, validate, (req, res) => {
  res.send({
    id: parseInt(req.params.id),
    title: req.body.title,
    description: req.body.description,
    isCompleted: req.body.isCompleted,
  });
});

app.delete('/tasks/:id', (req, res) => {
  res.send({
    Message: 'The task with id:' + req.params.id + ' deleted successfully',
  });
});

app.patch(
  '/tasks/:id',
  validations.patchValidatorArray,
  validate,
  (req, res) => {
    res.send({
      id: parseInt(req.params.id),
      title: 'text',
      description: 'text',
      isCompleted: req.body.isCompleted,
    });
  }
);

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`)
);
