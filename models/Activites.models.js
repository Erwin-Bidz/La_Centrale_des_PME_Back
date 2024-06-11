const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitesSchema = new Schema({
    id: Number,
    Code: String,
    Description: String
  });
  
  const Activites = mongoose.model('Activites', activitesSchema);
  
  module.exports = Activites;
  