const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const {
  ERROR_NOT_FOUND,
} = require('./utils/constans');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '640b507aae9529acfe919a22',
  };

  next();
});
app.use(routes);

app.use('*', (req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

app.listen(PORT);
