const User = require('../models/user');

exports.brand = async (req, res, next) => {
  try {
    const { brandName, cities } = req.body;
    const mobile = req.user.mobile;
    let user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.brand = {
      brandName,
      logo: req.file ? req.file.filename : null,
      cities: cities ? (Array.isArray(cities) ? cities : [cities]) : []
    };
    await user.save();
    res.json({ message: 'Brand setup complete', brand: user.brand });
  } catch (err) {
    next(err);
  }
};

exports.supplyChain = async (req, res, next) => {
  try {
    let { channelPartnerCount } = req.body;
    const mobile = req.user.mobile;
    let user = await User.findOne({ mobile });
    if (!user) return res.status(404).json({ error: 'User not found' });
    channelPartnerCount = Math.max(0, Math.min(3, parseInt(channelPartnerCount, 10) || 0));
    const supplyChain = [
      { type: 'Manufacturer', label: 'Manufacturer' }
    ];
    for (let i = 1; i <= channelPartnerCount; i++) {
      supplyChain.push({ type: 'CP', label: `CP${i}` });
    }
    supplyChain.push({ type: 'Retailer', label: 'Retailer' });
    user.supplyChain = {
      channelPartnerCount,
      structure: supplyChain
    };
    await user.save();
    res.json({
      message: 'Supply chain setup complete',
      supplyChain: user.supplyChain
    });
  } catch (err) {
    next(err);
  }
};
