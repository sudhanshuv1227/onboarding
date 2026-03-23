const mongoose = require('mongoose');

const designationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // Optionally add user/business reference here
});

module.exports = mongoose.model('Designation', designationSchema);