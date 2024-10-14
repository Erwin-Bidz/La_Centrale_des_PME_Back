let express = require('express');
let router = express.Router();
let pmesControllers = require('../controllers/pmesControllers');

/******** []Routes pour les PMEs ********/

//  Register des PMEs
router.post('/register', pmesControllers.register);

//  Login des PMEs
router.post('/login', pmesControllers.login);

//  Consulter la liste des PMEs recommandées
router.post('/recommandation', pmesControllers.getRecommandations);

//  Consultation des PMEs
router.get('/list', pmesControllers.list);

//  Consultation avec tris
router.get('/list/sorted', pmesControllers.listSorted);

//  Consultation avec filtres
router.get('/list/filtered', pmesControllers.listFiltered);

// Route pour l'autocomplétion des PMEs
router.get('/autocomplete', pmesControllers.autocomplete);

// Route pour obtenir les détails d'une PME par ID
router.get('/:id', pmesControllers.getPmeById);
module.exports = router;
