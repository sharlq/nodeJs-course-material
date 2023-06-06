const express = require('express');
const router = express.Router();
const { validateTVSeries } = require('../middlewares/validation');
const tvSeriesController = require('../controllers/tvSeriesController');

// Get all TV series
router.get('/', tvSeriesController.getTVSeries);

// Get a single TV series
router.get('/:id', tvSeriesController.getTVSeriesById);

// Create a TV series
router.post('/', validateTVSeries, tvSeriesController.createTVSeries);

// Update a TV series
router.put('/:id', validateTVSeries, tvSeriesController.updateTVSeries);

// Delete a TV series
router.delete('/:id', tvSeriesController.deleteTVSeries);

module.exports = router;
