const mongoose = require('mongoose');
const { Schema } = mongoose;

const socialSchema = new Schema({
  CultureEntreprise: { type: Schema.Types.Mixed, default: {} },
  ComInterne: { type: Schema.Types.Mixed, default: {} },
  RSE: { type: Schema.Types.Mixed, default: {} },
  pme: { type: Schema.Types.ObjectId, ref: 'PME' } // Référence à PME
});

const Social = mongoose.model('Social', socialSchema);

module.exports = Social;
