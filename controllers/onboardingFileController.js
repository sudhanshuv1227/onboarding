const path = require('path');
const fs = require('fs');
const xlsx = require('xlsx');

// Helper to get template file path
function getTemplatePath(type) {
  return path.join(__dirname, '../templates', `${type}-template.xlsx`);
}

exports.downloadTemplate = (type) => (req, res, next) => {
  try {
    const filePath = getTemplatePath(type);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.download(filePath, `${type}-template.xlsx`);
  } catch (err) {
    next(err);
  }
};

exports.uploadFile = (type) => (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Read and parse the Excel file
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: "" });

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    // Return extracted data
    res.json({ type, data });
  } catch (err) {
    next(err);
  }
};