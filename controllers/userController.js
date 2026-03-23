const User = require('../models/user');

// OTP storage (in-memory, for demo only)
const otps = {};

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.auth = async (req, res, next) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile number required' });
    let user = await User.findOne({ mobile });
    let isNewUser = false;
    if (!user) {
      user = new User({ mobile });
      await user.save();
      isNewUser = true;
    }
    const otp = generateOTP();
    otps[mobile] = otp;
    // In production, send OTP via SMS provider
    console.log(`OTP for ${mobile}: ${otp}`);
    res.json({ message: 'OTP sent to mobile', isNewUser });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtp = async (req, res, next) => {
  try {
    const { mobile, otp } = req.body;
    if (!mobile || !otp) return res.status(400).json({ error: 'Mobile and OTP required' });
    if (otps[mobile] !== otp) return res.status(401).json({ error: 'Invalid OTP' });
    let user = await User.findOne({ mobile });
    if (!user) user = await new User({ mobile }).save();
    delete otps[mobile];
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
    const token = jwt.sign({ mobile }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ message: 'Authentication successful', user, token });
  } catch (err) {
    next(err);
  }
};

exports.onboard = async (req, res, next) => {
  try {
    const { name, businessName, gstNumber } = req.body;
    const mobile = req.user.mobile;
    let user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = name;
    user.businessName = businessName;
    user.gstNumber = gstNumber;
    await user.save();
    res.json({ message: 'Onboarding complete', user });
  } catch (err) {
    next(err);
  }
};
