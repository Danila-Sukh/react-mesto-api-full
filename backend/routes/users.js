const router = require('express').Router();

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUserAvatar,
  updateUser,
} = require('../controllers/users');

const { avatarValidation, userDataValidation, userIdValidation } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:_id', userIdValidation, getUser);
router.patch('/me/avatar', avatarValidation, updateUserAvatar);
router.patch('/me', userDataValidation, updateUser);

module.exports = router;
