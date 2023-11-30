const Card = require('../models/card');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbidden');
const { CREATED_201 } = require('../utils/httpStatusConstants');

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
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndDelete(cardId)
    .orFail(() => new NotFoundError('Данная карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(_id)) {
        throw new ForbiddenError('Нельзя удалять карточку другого пользователя');
      }

      return res.send({ message: 'Карточка успешно удалена' });
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
