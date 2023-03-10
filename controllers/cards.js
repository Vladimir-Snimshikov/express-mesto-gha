const Card = require('../models/card');
const {
  SUCCESS,
  ERROR_CODE,
  ERROR_NOT_FOUND,
  defaultError,
} = require('../utils/constans');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => defaultError(res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      res.status(SUCCESS).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные при создании' });
      } else {
        defaultError(res);
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(SUCCESS).send({ data: card });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточки с данным _id не сущeствует' });
      }
    })
    .catch(() => defaultError(res));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(ERROR_NOT_FOUND).send({ message: 'Карточки с данным _id не сущeствует' });
    } return res.status(SUCCESS).send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
    } else {
      defaultError(res);
    }
  });
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(SUCCESS).send({ data: card });
      } else {
        res.status(ERROR_NOT_FOUND).send({ message: 'Карточка с данным _id не существует' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE).send({ message: 'Переданы некорректные данные для удаления лайка' });
      } else {
        defaultError(res);
      }
    });
};
