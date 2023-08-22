const mongoose = require('mongoose');
const { REG_URL } = require('../utils/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Напишите название'],
    minlength: [2, 'Минимальная длина названия - 2 символа'],
    maxlength: [30, 'Максимальная длина названия - 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Загрузите изображение'],
    validate: {
      validator(url) {
        return REG_URL.test(url);
      },
      message: 'Неверный URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
