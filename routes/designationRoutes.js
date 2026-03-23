const express = require('express');
const router = express.Router();
const designationController = require('../controllers/designationController');

// GET /designations - list all designations
router.get('/designations', designationController.getDesignations);

// POST /designations - add a new designation
router.post('/designations', designationController.addDesignation);

module.exports = router;
