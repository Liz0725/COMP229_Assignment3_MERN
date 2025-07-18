import express from 'express'
import {
  create, list, read, update, remove, removeAll
} from '../controllers/qualification.controller.js'

const router = express.Router()

// Correct: root path only (NOT starting with /api)
router.route('/')
  .get(list)
  .post(create)
  .delete(removeAll)

router.route('/:id')
  .get(read)
  .put(update)
  .delete(remove)

export default router
