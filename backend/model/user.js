const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const bcrypt = require('bcryptjs');
const WrongLoginError = require('../errors/WrongLoginError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, "Минимальная длина поля 'name' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'name' - 30 символов."],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, "Минимальная длина поля 'about' - 2 символа."],
    maxlength: [30, "Максимальная длина поля 'about' - 30 символов."],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => isURL(v, { required_protocol: true }),
      message: "Поле 'avatar' не соответствует требуемому формату URL",
    },
  },
  email: {
    type: String,
    unique: [true, "Пользователь с таким 'email' уже существует."],
    required: [true, "Поле 'email' должно быть заполнено."],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты.',
    },
  },
  password: {
    type: String,
    required: [true, "Поле 'password' должно быть заполнено."],
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new WrongLoginError('Указан некорректный Email или пароль.');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new WrongLoginError('Указан некорректный Email или пароль.');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
