const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

exports.generateInvoice = (req, res) => {
  const { clientName, date, items } = req.body;
  if (!clientName || !date || !items || !items.length) {
    return res.status(400).json({ error: 'Invalid invoice data' });
  }

  const doc = new PDFDocument();
  const fileName = `invoice-${Date.now()}.pdf`;
  const filePath = path.join(__dirname, '../generated', fileName);

  // Buat folder 'generated' jika belum ada
  const generatedDir = path.join(__dirname, '../generated');
  if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir);

  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc.fontSize(20).text('Invoice', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Client: ${clientName}`);
  doc.text(`Date: ${date}`);
  doc.moveDown();

  let total = 0;
  items.forEach((item) => {
    doc.text(`${item.name} - Qty: ${item.qty} x $${item.price}`);
    total += item.qty * item.price;
  });

  doc.moveDown();
  doc.fontSize(16).text(`Total: $${total}`, { align: 'right' });

  doc.end();
  stream.on('finish', () => {
    res.json({ filePath: `/generated/${fileName}` });
  });
};
