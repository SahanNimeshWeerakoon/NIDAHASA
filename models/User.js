const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name: {
       type: String,
       require: true
   },
   contact: {
       type: String,
       require: true
   },
   username: {
       type: String,
       unique: true,
       require: true
   },
   password: {
       type: String,
       require: true
   },
   status: {
       type: Boolean,
       default: true
   },
});

module.exports = mongoose.model('User', UserSchema);