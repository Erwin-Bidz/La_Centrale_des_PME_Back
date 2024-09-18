const express = require('express');
const router = express.Router();
const { getRecommendations, identifyRelationships } = require('../recommender/recommendation');

router.get('/recommend/:pmeId', async (req, res) => {
  try {
    const pmeId = req.params.pmeId;
    const recommendations = await getRecommendations(pmeId);
    const pme = await PME.findById(pmeId);
    const relationships = identifyRelationships(pme, recommendations);

    res.json({
      topRecommendations: recommendations.slice(0, 5),
      competitors: relationships.competitors.slice(0, 3),
      collaborators: relationships.collaborators.slice(0, 3),
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
