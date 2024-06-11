const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metiersSchema = new Schema({
  id: Number,
  Matricule: String,
  Occurence: Number
});

const Metiers = mongoose.model('Metiers', metiersSchema);

module.exports = Metiers;
