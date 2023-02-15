const express = require('express');
const morgan = require('morgan');
const { PORT } = require('./config');
const { errorHandlingMiddleware } = require('./middlewares');
var cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ 'extended': false }));

const apiRoutes = require('./routes/api');
const apiDocsRoutes = require('./routes/apiDocs');

app.use('/api', apiRoutes);
app.use('/api-docs', apiDocsRoutes);

app.get('/', (req, res) => {
  res.send('Agile Board API Endpoint { use /api-docs to read the documentation }');
});

app.use(errorHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`open server at http://127.0.0.1:${PORT}/`);
});