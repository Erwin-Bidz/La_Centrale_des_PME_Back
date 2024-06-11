const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
  Matricule: String,
  Email: String,
  Profil: String,
  Password: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
