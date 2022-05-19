const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequest = require('../errors/badRequest');
const UnauthorizedError = require('../errors/unauthorizedError');
const NotFoundError = require('../errors/pageNotFoundError');
const ConflictError = require('../errors/conflictError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

const getUser = (req, res, next) => {
  const { _id } = req.params;
  return User
    .findById(_id)
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError(`Данный id: ${_id} не найден`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
  } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const data = JSON.parse(JSON.stringify(user));
      delete data.password;
      res.status(200).send({ data });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(`Произошла ошибка: ${err} Переданы некорректные данные при создании пользователя`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User
    .findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Введены некорректные данные!'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Нет пользователя с таким _id'));
      } else {
        next(err);
      }
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  return User
    .findByIdAndUpdate(_id, { avatar }, { new: true })
    .orFail(() => { throw new Error('NotFound'); })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequest('Некорректные данные при обновлении аватара.'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Нет пользователя с таким _id'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('передан неверный логин или пароль.'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnauthorizedError('передан неверный логин или пароль.'));
          }

          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
            { expiresIn: '7d' },
          );
          return res.send({ token });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Некорректные данные в email или password.'));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    throw new NotFoundError('Пользователь не найден');
  })
  .then((user) => res.status(200).send({ user }))
  .catch((err) => {
    if (err.name === 'CastError') {
      throw new BadRequest('Переданы некорректные данные');
    } else if (err.name === 'NotFoundError') {
      throw new NotFoundError('Пользователь не найден');
    } else {
      next(err);
    }
  });
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  getCurrentUser,
};
