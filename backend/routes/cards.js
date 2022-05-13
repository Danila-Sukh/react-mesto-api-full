const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike,
} = require('../controllers/cards');
const { cardValidation, validateIdParameter } = require('../middlewares/validationJoi');

router.get('/', auth, getCards);
router.post('/', auth, cardValidation, createCard);
router.delete('/:cardId', auth, validateIdParameter('cardId'), deleteCardById);
router.put('/:cardId/likes', auth, validateIdParameter('cardId'), addLike);
router.delete('/:cardId/likes', auth, validateIdParameter('cardId'), removeLike);

module.exports = router;
