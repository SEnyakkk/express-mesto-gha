const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const { PORT = 3000, MONGO_DB = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64cea12cea57c5a3ebdd60b0',
  };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найден' });
});

app.listen(PORT);
