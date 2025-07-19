import express from 'express'
import {
  create,
  list,
  read,
  update,
  remove,
  removeAll
} from '../controllers/project.controller.js'

import { requireSignin, isAdmin } from '../middleware/auth.middleware.js'

const router = express.Router()

// 🧪 Test route
router.get('/test', (req, res) => {
  res.json({ message: "🎉 Project route is working!" })
})

// 📄 Public route — anyone can view the list
router.get('/', list)

// 🔐 Protected routes
router.post('/', requireSignin, create)                  // Only signed-in users can create
router.put('/:id', requireSignin, update)                // Only signed-in users can update

// 🗑️ Admin-only delete routes
router.delete('/', requireSignin, isAdmin, removeAll)    // Only admin can delete all
router.delete('/:id', requireSignin, isAdmin, remove)    // Only admin can delete one

// 📄 Public route — anyone can read a single project
router.get('/:id', read)

export default router
