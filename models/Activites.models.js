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
  