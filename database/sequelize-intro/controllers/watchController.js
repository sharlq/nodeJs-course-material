const Watch = require('../models/watch');
const Episode = require('../models/episode');

// Watch an episode
exports.watchEpisode = async (req, res) => {
  const { userId, episodeId } = req.body;
  try {
    const episode = await Episode.findByPk(episodeId);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    const watch = await Watch.create({ userId, episodeId });
    res.status(201).json(watch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
