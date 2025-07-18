import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express() // ✅ First declare app

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)
app.use('/', userRoutes)

export default app
