const express = require('express');
const router = express.Router();
const watchController = require('../controllers/watchController');

// Watch an episode
router.post('/', watchController.watchEpisode);

module.exports = router;
