const express = require('express');
const router = express.Router();
const { validateEpisode } = require('../middlewares/validation');
const episodeController = require('../controllers/episodeController');

// Get all episodes
router.get('/', episodeController.getEpisodes);

// Get episodes paginated
router.get('/paginated', episodeController.getEpisodesPaginated);

// Get a single episode
router.get('/:id', episodeController.getEpisode);

// Create an episode
router.post('/', validateEpisode, episodeController.createEpisode);

// Update an episode
router.put('/:id', validateEpisode, episodeController.updateEpisode);

// Delete an episode
router.delete('/:id', episodeController.deleteEpisode);

module.exports = router;
