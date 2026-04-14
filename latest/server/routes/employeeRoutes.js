import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';
import models from '../models/index.js';

const router = express.Router();
const { Employee } = models;

// Get all employees (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json({ success: true, data: employees });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Add employee & generate user login (admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, ...employeeData } = req.body;
    
    // Check if email already exists in User table to avoid duplicate errors
    if (email) {
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email is already registered for another login.' });
      }
    }

    const newEmployee = await Employee.create({ firstName, lastName, role, ...employeeData });
    
    // If email and pass are provided, create login
    if (email && password) {
      await models.User.create({
        name: `${firstName} ${lastName}`,
        email,
        password,
        role: role || 'employee',
        employeeId: newEmployee.id
      });
    }

    res.json({ success: true, data: newEmployee });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete employee (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
