const express = require('express')

const app = express()
const port = 8080

const mongoose = require('mongoose');
const Activites = require('./models/Activites.models');
const Admin = require('./models/Activites.models');
const AgentsGouv = require('./models/AgentsGouv.models');
const Banques = require('./models/Banques.models');
const Categories = require('./models/Categories.models');
const Certifications = require('./models/Certifications.models');
const Experts = require('./models/Experts.models');
const Fournisseurs = require('./models/Fournisseurs.models');
const Investisseurs = require('./models/Investisseurs.models');
const Metiers = require('./models/Metiers.models');
const Notifications = require('./models/Notifications.models');
const ONG = require('./models/ONG.models');
const Outils = require('./models/Outils.models');
const Paiement = require('./models/Paiement.models');
const PME = require('./models/PME.models');
const Processus = require('./models/Processus.models');
const Produits = require('./models/Produits.models');
const Services = require('./models/Services.models');
const Social = require('./models/Social.models');
const SousCategories = require('./models/SousCategories.models');
const Visibite = require('./models/Visibilite.models');

// Router
exports.router = (function() {
    var apiRouter = express.Router();

    
    ///////////////Administrators routes/////////////////////
    apiRouter.route('/admins/register/').post(adminsCtrl.register);
    apiRouter.route('/admins/login/').post(adminsCtrl.login);
    apiRouter.route('/admins/logout/').post(adminsCtrl.logout);
    apiRouter.route('/admins/login/me/').get(adminsCtrl.getAdminProfile);
    apiRouter.route('/admins/login/me/changePwd/').put(adminsCtrl.changePassword);
    //apiRouter.route('/admins/typeIncident/new/').post(adminsCtrl.createTypeIncident);
    //apiRouter.route('/admins/typeIncident/').get(adminsCtrl.listTypeIncident);
    
    
    ///////////////Users routes/////////////////////
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/logout/').post(usersCtrl.logout);
    apiRouter.route('/users/login/me/').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/login/me/changePwd/').put(usersCtrl.changePassword);
    apiRouter.route('/users/login/user/').get(usersCtrl.getUser);
    apiRouter.route('/users/login/blockUser/').put(usersCtrl.blockUser);
    apiRouter.route('/users/login/users/').get(usersCtrl.getAllUsers);
    apiRouter.route('/users/login/users/delete/').delete(usersCtrl.deleteUser);
    apiRouter.route('/typeIncidents/new/').post(typeIncidentsCtrl.createTypeIncident);


    /////////////Incidents routes/////////////////// 
    apiRouter.route('/incidents/new/').post(incidentsCtrl.createIncident);
    //apiRouter.route('/test').post(incidentsCtrl.createIncident);
    apiRouter.route('/incidents/').get(incidentsCtrl.listIncident);
    apiRouter.route('/incidents/byUser/').get(incidentsCtrl.listIncidentByUser);
    apiRouter.route('/incidents/byEnterprise/').get(incidentsCtrl.listIncidentByEntreprise);
    apiRouter.route('/incidents/search/').get(incidentsCtrl.searchIncident);
    apiRouter.route('/incidents/detail/').get(incidentsCtrl.getIncident);
    //apiRouter.route('/incidents/addUsers/').put(incidentsCtrl.addAllowedUser);
    apiRouter.route('/incidents/update/').put(incidentsCtrl.updateIncident);
    //apiRouter.route('/incidents/updateState/').put(incidentsCtrl.updateIncidentEtat);
    apiRouter.route('/incidents/delete/').delete(incidentsCtrl.deleteIncident);
    

    /////////////typeIncidents routes/////////////
    apiRouter.route('/typeIncidents/').get(typeIncidentsCtrl.listTypeIncident);
    apiRouter.route('/typeIncidents/new/').post(typeIncidentsCtrl.createTypeIncident);
    apiRouter.route('/typeIncidents/delete/').delete(typeIncidentsCtrl.deleteTypeIncident);
    apiRouter.route('/typeIncidents/detail/').get(typeIncidentsCtrl.getTypeIncident);
    apiRouter.route('/typeIncidents/search/').get(typeIncidentsCtrl.searchTypeIncident);
    

    /////////////entreprises routes///////////////
    apiRouter.route('/entreprises/login/').post(entreprisesCtrl.login);
    apiRouter.route('/entreprises/logout/').post(entreprisesCtrl.logout);
    apiRouter.route('/entreprises/register/').post(entreprisesCtrl.createEntreprise);
    apiRouter.route('/entreprises/list/').get(entreprisesCtrl.listEntreprise);
    apiRouter.route('/entreprises/detail/').get(entreprisesCtrl.getEntreprise);
    apiRouter.route('/entreprises/search/').get(entreprisesCtrl.searchEntreprise);

    return apiRouter;
})();