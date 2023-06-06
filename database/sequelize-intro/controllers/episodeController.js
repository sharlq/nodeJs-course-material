const Episode = require('../models/episode');
const User = require('../models/user');
const Watch = require('../models/watch');
// Get all episodes
exports.getEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.findAll({ include: User, through: Watch });
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEpisodesPaginated = async (req, res) => {
  const { page = 1, pageSize = 3 } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    const { count, rows } = await Episode.findAndCountAll({
      offset,
      limit,
      // Add other conditions or sorting options if needed
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      currentPage: page,
      totalPages,
      totalCount: count,
      episodes: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single episode
exports.getEpisode = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    res.json(episode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create an episode
exports.createEpisode = async (req, res) => {
  const { name, description, link, tvSeriesId } = req.body;
  try {
    const episode = await Episode.create({
      name,
      description,
      link,
      tvSeriesId,
    });
    res.status(201).json(episode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an episode
exports.updateEpisode = async (req, res) => {
  const { id } = req.params;
  const { name, description, link, tvSeriesId } = req.body;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    episode.name = name;
    episode.description = description;
    episode.link = link;
    episode.tvSeriesId = tvSeriesId;
    await episode.save();
    res.json({ message: 'Episode updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an episode
exports.deleteEpisode = async (req, res) => {
  const { id } = req.params;
  try {
    const episode = await Episode.findByPk(id);
    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }
    await episode.destroy();
    res.json({ message: 'Episode deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
