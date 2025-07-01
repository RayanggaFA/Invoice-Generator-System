const fs = require('fs');
const path = require('path');
const express = require('express');
const invoiceController = require('../controllers/invoiceController');
const router = express.Router(); 

router.post('/generate', invoiceController.generateInvoice);
module.exports = router;

exports.generateInvoice = (req, res) => {
  const { clientName, date, items } = req.body;
  if (!clientName || !date || !items || !items.length) {
    return res.status(400).json({ error: 'Invalid invoice data' });
  }

  const doc = new PDFDocument();
  const fileName = `invoice-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, '../generated', fileName);
}