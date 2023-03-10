const router = require('express').Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me/avatar', updateUserAvatar);
router.patch('/me', updateUserProfile);

router.post('/', createUser);

module.exports = router;
