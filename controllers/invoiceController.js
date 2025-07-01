const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

exports.generateInvoice = async (req, res) => {
  const invoiceData = req.body;

  try {
    const html = await ejs.renderFile(
      path.join(__dirname, '../templates/invoice.ejs'),
      { invoice: invoiceData }
    );

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const generatedDir = path.join(__dirname, '../generated');
    if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir);

    const filePath = path.join(generatedDir, `invoice-${Date.now()}.pdf`);
    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();

    res.status(200).json({
      message: 'Invoice created successfully',
      file: `/generated/${path.basename(filePath)}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to generate invoice');
  }
};
