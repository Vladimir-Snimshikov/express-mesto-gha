const User = require('../models/user');

const {
  SUCCESS,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  defaultError,
} = require('../utils/constans');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(SUCCESS).send({ data: users }))
    .catch(() => defaultError(res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) res.status(SUCCESS).send({ data: user });
      else res.status(ERROR_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
    })
    .catch(() => defaultError(res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(SUCCESS).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else defaultError(res);
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((userData) => res.send({ data: userData }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении пользователя' });
      } else defaultError(res);
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((userAvatar) => res.send({ data: userAvatar }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при обновлении пользователя' });
      } else defaultError(res);
    });
};
