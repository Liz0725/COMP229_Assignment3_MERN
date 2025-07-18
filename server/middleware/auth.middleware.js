import jwt from 'jsonwebtoken'

// Middleware to verify JWT token
export const requireSignin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { _id, role }
    next()
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' })
  }
}

// Middleware to check for admin role
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only.' })
  }
  next()
}
