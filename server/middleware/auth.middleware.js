import jwt from 'jsonwebtoken'

export const requireSignin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("🔑 Token Verified:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};


// Middleware to check for admin role
export const isAdmin = (req, res, next) => {
  console.log("🔐 Admin Check - Decoded user:", req.user);
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access only.' });
  }
  next();
};


