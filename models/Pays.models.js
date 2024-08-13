const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paysSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Pays = mongoose.model('Pays', paysSchema);
