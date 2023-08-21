const router = require('express').Router();
const { addUser, login } = require('../controllers/users');

router.use('/signin', login);
router.use('/signup', addUser);
router.use('/users', require('./users'));
router.use('/cards', require('./cards'));

module.exports = router;
