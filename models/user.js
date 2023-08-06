const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Напишите ваше имя'],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Напишите о себе'],
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимальная длина имени - 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Загрузите аватар'],
    validate: {
      validator(url) {
        return /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i.test(url);
      },
      message: 'Неверный URL',
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
