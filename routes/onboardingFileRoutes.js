const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const onboardingFileController = require('../controllers/onboardingFileController');

// Multer setup for uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + '_' + file.originalname);
  }
});
const upload = multer({ storage });

// Download template endpoints
router.get('/download/products-template', onboardingFileController.downloadTemplate('products'));
router.get('/download/salesperson-template', onboardingFileController.downloadTemplate('salesperson'));
router.get('/download/wholesaler-template', onboardingFileController.downloadTemplate('wholesaler'));
router.get('/download/distributor-template', onboardingFileController.downloadTemplate('distributor'));
router.get('/download/super-stockist-template', onboardingFileController.downloadTemplate('super-stockist'));

// Upload endpoints
router.post('/upload/products', upload.single('file'), onboardingFileController.uploadFile('products'));
router.post('/upload/salesperson', upload.single('file'), onboardingFileController.uploadFile('salesperson'));
router.post('/upload/wholesaler', upload.single('file'), onboardingFileController.uploadFile('wholesaler'));
router.post('/upload/distributor', upload.single('file'), onboardingFileController.uploadFile('distributor'));
router.post('/upload/super-stockist', upload.single('file'), onboardingFileController.uploadFile('super-stockist'));

module.exports = router;
