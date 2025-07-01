const express = require('express');
const bodyParser = require('body-parser');
const invoiceRoutes = require('./routes/invoiceRoutes');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use('/api/invoice', invoiceRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/generated', express.static('generated'));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
