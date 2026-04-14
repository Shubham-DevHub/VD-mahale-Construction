import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import models from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import { generateRoutes } from './routes/genericRoutes.js'; // Added missing logic

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') }); // Since .env might be in root

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
// Using Generic CRUD routes
app.use('/api/leave', generateRoutes('Leave'));
app.use('/api/vehicle', generateRoutes('Vehicle'));
app.use('/api/fuel', generateRoutes('FuelRecord'));
app.use('/api/maintenance', generateRoutes('Maintenance'));
app.use('/api/inventory', generateRoutes('Inventory'));
app.use('/api/equipment', generateRoutes('Equipment'));
app.use('/api/projects', generateRoutes('Project'));
app.use('/api/reports', generateRoutes('DailyReport'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../dist');
  app.use(express.static(staticPath));
  app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  
  // Seed admin user
  models.User.findOrCreate({
    where: { email: 'admin@vdmahale.com' },
    defaults: { name: 'System Admin', password: 'admin', role: 'admin' }
  }).then(([user, created]) => {
    if (created) console.log('Admin user seeded');
  });

  // Seed manager user
  models.User.findOrCreate({
    where: { email: 'manager@vdmahale.com' },
    defaults: { name: 'Project Manager', password: 'manager', role: 'manager' }
  }).then(([user, created]) => {
    if (created) console.log('Manager user seeded');
  });

  // Seed employee user
  models.User.findOrCreate({
    where: { email: 'employee@vdmahale.com' },
    defaults: { name: 'Field Employee', password: 'employee', role: 'employee' }
  }).then(([user, created]) => {
    if (created) console.log('Employee user seeded');
  });

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Database sync error:', err);
});
