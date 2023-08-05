const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGO_DB = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log('app.listen 3000 port');
});
