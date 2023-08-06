const router = require('express').Router();
const {
  getUsers, getUserById, addUser, editUserData, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', addUser);
router.get('/:userId', getUserById);
router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
