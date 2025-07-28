  import express from 'express'
  import {
    create, list, read, update, remove, removeAll
  } from '../controllers/qualification.controller.js'
  import { requireSignin, isAdmin } from '../middleware/auth.middleware.js' // ✅

  const router = express.Router()
  console.log("✅ qualification.routes.js loaded")

  router.route('/')
    .get(list)
    .post(requireSignin, isAdmin, create)
  // ✅ Only logged-in users can POST
    .delete(requireSignin, isAdmin, removeAll) // (optional) Only admins can delete all

  router.route('/:id')
    .get(read)
    .put(requireSignin, update)
    .delete(requireSignin, remove)

  export default router
