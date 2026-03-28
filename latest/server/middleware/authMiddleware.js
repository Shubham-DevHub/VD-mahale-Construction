import jwt from 'jsonwebtoken';
import models from '../models/index.js';

export const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) return res.status(403).json({ success: false, message: 'No token provided' });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET || 'supersecretjwtkey', (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Unauthorized' });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ success: false, message: 'Require Admin Role' });
  }
  next();
};

export const isEmployee = (req, res, next) => {
  if (req.userRole !== 'employee' && req.userRole !== 'admin') {
    return res.status(403).json({ success: false, message: 'Require Employee Role' });
  }
  next();
};
