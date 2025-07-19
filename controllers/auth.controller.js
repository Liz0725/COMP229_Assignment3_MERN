import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

// Signup controller
export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create and save new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    })

    await user.save()

    res.status(201).json({ message: 'Signup successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Signup failed' })
  }
}

// Signin controller
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role 
      }
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Signin failed. Try again.' })
  }
}


// Signout controller
export const signout = (req, res) => {
  res.clearCookie('t') // optional if you're using cookies
  res.json({ message: 'Signed out successfully' })
}
