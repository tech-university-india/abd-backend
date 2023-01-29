const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({'extended': false}));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const apiDocsRoutes = require('./routes/api-docs');
app.use('/api-docs', apiDocsRoutes);

app.listen(PORT, () => {
  console.log(`open server at http://127.0.0.1:${PORT}/`);
});
