const { HTTP_STATUS_CREATED } = require('http2').constants;
const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../utils/errors/BadRequest');
const NotFoundError = require('../utils/errors/NotFound');
const ForbiddenError = require('../utils/errors/Forbidden');

module.exports.addCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError(`Карточка с id-${req.params.cardId} не найдена`))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) return next(new ForbiddenError());
      return Card.deleteOne(card).then(() => res.send({ message: `Карточка ${card._id} удалена` }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError(`Карточка с id-${req.params.cardId} не найдена`))
  .populate(['owner', 'likes'])
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Проверьте Id карточки'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError(`Карточка с id-${req.params.cardId} не найдена`))
  .populate(['owner', 'likes'])
  .then((card) => {
    res.send(card);
  })
  .catch((err) => {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Проверьте Id карточки'));
    } else {
      next(err);
    }
  });
