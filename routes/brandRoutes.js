const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup for logo upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user.mobile + '_logo' + ext);
  }
});
const upload = multer({ storage });

router.post('/brand', authenticateToken, upload.single('logo'), brandController.brand);
router.post('/supply-chain', authenticateToken, brandController.supplyChain);

module.exports = router;
