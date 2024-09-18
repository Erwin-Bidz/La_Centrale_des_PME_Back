// recommendationController.js
const recommendationService = require('../services/recommendationService');

exports.getRecommendations = async (req, res) => {
  try {
    const pmeId = req.params.pmeId;
    const recommendations = await recommendationService.getRecommendations(pmeId);
    res.status(200).json(recommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
