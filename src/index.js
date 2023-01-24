const express = require('express');
const { PORT } = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded({'extended': false}));

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`open server at http://127.0.0.1:${PORT}/`);
});