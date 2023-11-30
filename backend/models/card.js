const mongoose = require('mongoose');
const User = require('./user');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" обязательно для заполнения'],
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле "link" обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Поле "owner" обязательно для заполнения'],
    ref: User,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: User,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
