const Designation = require('../models/designation');

exports.getDesignations = async (req, res, next) => {
  try {
    // Optionally filter by user/business if needed
    const designations = await Designation.find({});
    res.json({ designations });
  } catch (err) {
    next(err);
  }
};

exports.addDesignation = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const designation = new Designation({ title });
    await designation.save();
    res.status(201).json({ message: 'Designation added', designation });
  } catch (err) {
    next(err);
  }
};
