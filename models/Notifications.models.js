const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = new Schema({
    canalNotifications: String,
    infoUser: Schema.Types.Mixed,
    InfoNotification: Schema.Types.Mixed
  });
  
  const Notifications = mongoose.model('Notifications', notificationsSchema);
  
  module.exports = Notifications;
  