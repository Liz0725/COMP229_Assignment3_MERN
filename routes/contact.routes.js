import express from 'express';
import {
  create, list, read, update, remove, removeAll
} from '../controllers/contact.controller.js';

const router = express.Router();

// Matches: /api/contacts
router.route('/')
  .get(list)
  .post(create)
  .delete(removeAll);

// Matches: /api/contacts/:id
router.route('/:id')
  .get(read)
  .put(update)
  .delete(remove);

export default router;
