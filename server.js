// Import core modules
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Import route modules
import contactRoutes from './server/routes/contact.routes.js'
import projectRoutes from './server/routes/project.routes.js'

import qualificationRoutes from './server/routes/qualification.routes.js'
import userRoutes from './server/routes/user.routes.js'
import authRoutes from './server/routes/auth.routes.js'


// Setup __dirname in ES Module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ Load .env from absolute path
dotenv.config({ path: path.resolve(__dirname, '.env') })

// Create Express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())

// Mount Routes
app.use('/api/contacts', contactRoutes)
app.use('/api/projects', projectRoutes)
console.log("✅ /api/projects route loaded")

app.use('/api/qualifications', qualificationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes) // ✅ Now it matches Thunder Client test

// Default route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." })
})

// Debug MONGO_URI
console.log("🔍 DEBUG MONGO_URI =", process.env.MONGO_URI)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
  console.log('✅ Connected to MongoDB')
})

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err)
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
