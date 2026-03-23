const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  mobile: { type: String, unique: true },
  name: String,
  businessName: String,
  gstNumber: String,
  brand: {
    brandName: String,
    logo: String,
    cities: [String]
  },
  supplyChain: {
    channelPartnerCount: Number,
    structure: [
      {
        type: { type: String },
        label: String
      }
    ]
  }
});

module.exports = mongoose.model('User', userSchema);
