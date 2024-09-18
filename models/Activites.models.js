const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActiviteSchema = new Schema({
  NAF: String,
  ACTIVITE: String
});

const DivisionSchema = new Schema({
  NUM: String,
  DESCRIPTION: String,
  ACTIVITES: [ActiviteSchema]
});  
  const Activites = mongoose.model('Activites', ActiviteSchema);

  const Division = mongoose.model('Division', DivisionSchema);

  
  module.exports = Activites;
  /*
_id: objectId('66751e96cad767c1b9bde05c')
DIVISION:Object
  NUM: "2"
  DESCRIPTION: "Agriculture en zone urbaine"
  ACTIVITES: Array()
  0: Object
    NAF:"0210Z"
    ACTIVITE:"Culture du riz"
  1: Object
    NAF:"0220Z"
    ACTIVITE:"Culture du poivre"
  */


    /*
    _id:6697deae4b8318c27ffba151
Pilier: "GOUVERNANCE, DECENTRALISATION ET GESTION STRATEGIQUE DE L'ETAT"
SousPilier: Object
  Décentralisation et développement local: Object
  Renforcement de l'état de droit et sécurité des personnes et des biens: Object
    1: "Renforcement de l'état de droit et protection des droits humains"
    2: "Consolidation du pouvoir judiciaire et accès de tous à une justice équ…"
    3:"Intensification de la lutte contre l'insécurité, la criminalité et le …"
    4:"Prévention et gestion des crises"
    5:"Amélioration de la communication"
  Amélioration du service public de l'état: Object
    1: "Modernisation de l'administration "
    2: "Optimisation de l'administration publique"
    3: "Amélioration de la gestion l'état"
Voici un extrait d'un document avec une structure arborescente.
1- Donne son model pour que je puisse sauvegarder suivant sa structure en base de données.
2- Décris moi comment je pourrais organiser sa sauvegarde en base de données sachant que je veux les sauvegarder suivant 
le design pattern composite afin qu'il soit maintenable malgré sa structure hiérachique.
3- Décris moi également comment je peux modéliser ce composite dans mon diagramme de classe pour qu'il soit cohérent avec
l'organisatin de mes données.
    */