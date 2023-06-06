const TVSeries = require('../models/tvSeries');
const Episode = require('../models/episode');

// Get all TV series
exports.getTVSeries = async (req, res) => {
  try {
    const tvSeries = await TVSeries.findAll({
      include: [Episode],
    });
    res.json(tvSeries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single TV series
exports.getTVSeriesById = async (req, res) => {
  const { id } = req.params;
  try {
    const tvSeries = await TVSeries.findByPk(id);
    if (!tvSeries) {
      return res.status(404).json({ message: 'TV series not found' });
    }
    res.json(tvSeries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a TV series
exports.createTVSeries = async (req, res) => {
  const { name, description, image } = req.body;
  try {
    const tvSeries = await TVSeries.create({ name, description, image });
    res.status(201).json(tvSeries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a TV series
exports.updateTVSeries = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;
  try {
    const tvSeries = await TVSeries.findByPk(id);
    if (!tvSeries) {
      return res.status(404).json({ message: 'TV series not found' });
    }
    tvSeries.name = name;
    tvSeries.description = description;
    tvSeries.image = image;
    await tvSeries.save();
    res.json({ message: 'TV series updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a TV series
exports.deleteTVSeries = async (req, res) => {
  const { id } = req.params;
  try {
    const tvSeries = await TVSeries.findByPk(id);
    if (!tvSeries) {
      return res.status(404).json({ message: 'TV series not found' });
    }
    await tvSeries.destroy();
    res.json({ message: 'TV series deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
