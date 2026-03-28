import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import models from '../models/index.js';

const router = express.Router();
const { Attendance } = models;

// Get all attendance
router.get('/', verifyToken, async (req, res) => {
  try {
    const records = await Attendance.findAll();
    res.json({ success: true, data: records });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add attendance
router.post('/', verifyToken, async (req, res) => {
  try {
    const record = await Attendance.create(req.body);
    res.json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
