require('dotenv').config();
const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const usersRout = require('./routes/users');
const cardsRout = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const centralError = require('./middlewares/centralError');
const { validateUrl } = require('./method/validateUrl');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
 app.use(cors);

app.use(cookieParser());
app.use(express.json());
app.use(requestLogger); 
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.use(auth);
app.use('/users', usersRout);
app.use('/cards', cardsRout);
app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(errorLogger);
app.use(errors());
app.use(centralError);
app.listen(PORT, () => {
  console.log(`Актуальная ссылка на сервер: http://localhost:${PORT}`);
});
