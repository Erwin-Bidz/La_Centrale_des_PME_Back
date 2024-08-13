const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const langueSchema = new Schema({
  name: { type: String, required: true, unique: true }
});

const Langue = mongoose.model('Langue', langueSchema);
