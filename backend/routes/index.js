const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const NotFoundError = require('../errors/notFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена'));
});

module.exports = router;
