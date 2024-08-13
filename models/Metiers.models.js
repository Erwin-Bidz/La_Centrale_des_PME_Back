const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const metiersSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  item: {
    type: String,
    required: true
  }
});

const Metiers = mongoose.model('Metiers', metiersSchema);

module.exports = Metiers;
