const Card = require('../models/card');
const BadRequest = require('../errors/BadRequest');
const NONotFoundErrorT_FOUND = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.send({ data: cards });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;
    const owner = req.user._id;

    const card = await Card.create({ name, link, owner });
    res.send({ data: card });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(err.message));
    } else {
      next(err);
    }
  }
};

const deleteCard = (req, res, next) => {
  const userId = req.user._id;
  const { _id } = req.params;

  Card.findById(_id)
    .orFail(() => new NotFoundError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ForbiddenError('Нет прав для удаления карточки');
      } else {
        return Card.findByIdAndRemove(_id)
          .then((cardData) => res.send(cardData));
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка с таким id не найдена');
    })
    .then((likes) => res.send({ data: likes }))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
