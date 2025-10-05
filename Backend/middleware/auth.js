// // middleware/auth.js
// const jwt = require('jsonwebtoken');
// const store = require('../data/store');

// const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// function auth(req, res, next) {
//   const header = req.headers.authorization || req.headers.Authorization;
//   if (!header) return res.status(401).json({ message: 'No token provided' });

//   const token = header.split(' ')[1] || header;
//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = store.users.find(u => u.id === decoded.id);
//     if (!user) return res.status(401).json({ message: 'Invalid token (user not found)' });
//     req.user = { id: user.id, email: user.email, role: user.role, username: user.username };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token invalid' });
//   }
// }

// function adminOnly(req, res, next) {
//   if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
//   if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
//   next();
// }

// module.exports = { auth, adminOnly };

const jwt = require('jsonwebtoken');

// Use same secret you used earlier. Replace with process.env.JWT_SECRET in production.
const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: 'No token' });
  }
  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // decoded should at least contain .id and optionally .role
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
