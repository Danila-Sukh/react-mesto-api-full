const Card = require('../models/card');

const BadRequest = require('../errors/badRequest');
const NotFoundError = require('../errors/pageNotFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new Error('NotFound'); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Нет карточки по указанным id'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Oops не можем поставить лайк - ошибка 400'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndRemove(id)
    .orFail(() => { throw new NotFoundError('Нет карточки по указанным id'); })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Нельзя удалить чужую карточку'));
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'NotFound') {
        next(new NotFoundError('Нет карточки по указанным id'));
      } else if (err.name === 'CastError') {
        next(new BadRequest('Oops не можем удалить лайк - ошибка 400'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  likeCard,
  deleteCard,
  dislikeCard,
};
