const Card = require('../models/card');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbidden');
const { CREATED_201, OK_200 } = require('../utils/httpStatusConstants');
const BadRequestError = require('../utils/errors/badRequest');

const getCards = (req, res, next) => {
  Card
    .find({})
    .sort({ createdAt: -1 })
    .then((card) => res.send(card))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card
    .create({
      name, link, owner, createdAt: Date.now(),
    })
    .then((card) => res.status(CREATED_201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некоректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');
      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять карточку другого пользователя');
      }

      Card.deleteOne()
        .then(() => res.status(OK_200).send({ message: 'Картчока успешно удалена' }));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => new NotFoundError('Данная карточка не найдена'))
    .then((like) => res.send(like))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .orFail(() => new NotFoundError('Данная карточка не найдена'))
    .then((deleteLike) => res.send(deleteLike))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
