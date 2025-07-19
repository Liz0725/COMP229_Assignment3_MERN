import express from 'express';
import {
  create,
  list,
  read,
  update,
  remove,
  removeAll,
  signup,
  signin
} from '../controllers/user.controller.js';

import requireAuth from '../middleware/requireAuth.js';

const router = express.Router(); // ✅ move to top

router.post('/signup', signup);
router.post('/signin', signin);

// Protected and public user routes
router.route('/api/users')
  .get(requireAuth, list)
  .post(create)
  .delete(requireAuth, removeAll);

router.route('/api/users/:id')
  .get(read)
  .put(update)
  .delete(remove);

export default router;
