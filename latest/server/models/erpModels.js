import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  empId: { type: DataTypes.STRING, unique: true, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING },
  salary: { type: DataTypes.DECIMAL(10, 2) },
  joinDate: { type: DataTypes.DATEONLY }
});

const Attendance = sequelize.define('Attendance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  status: { type: DataTypes.ENUM('Present', 'Absent', 'Half-Day', 'Leave'), defaultValue: 'Present' },
  checkIn: { type: DataTypes.TIME },
  checkOut: { type: DataTypes.TIME },
  hoursWorked: { type: DataTypes.DECIMAL(5, 2) }
});

const Leave = sequelize.define('Leave', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  startDate: { type: DataTypes.DATEONLY, allowNull: false },
  endDate: { type: DataTypes.DATEONLY, allowNull: false },
  reason: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'), defaultValue: 'Pending' }
});

const Vehicle = sequelize.define('Vehicle', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vehicleNo: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.STRING },
  model: { type: DataTypes.STRING },
  status: { type: DataTypes.ENUM('Active', 'Maintenance', 'Inactive'), defaultValue: 'Active' }
});

const FuelRecord = sequelize.define('FuelRecord', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  liters: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  cost: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  odometerReading: { type: DataTypes.INTEGER }
});

const Maintenance = sequelize.define('Maintenance', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  description: { type: DataTypes.TEXT },
  cost: { type: DataTypes.DECIMAL(10, 2) },
  status: { type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), defaultValue: 'Completed' }
});

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  itemName: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 },
  unit: { type: DataTypes.STRING },
  pricePerUnit: { type: DataTypes.DECIMAL(10, 2) }
});

const Equipment = sequelize.define('Equipment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  equipmentName: { type: DataTypes.STRING, allowNull: false },
  serialNo: { type: DataTypes.STRING, unique: true },
  status: { type: DataTypes.ENUM('Available', 'In Use', 'Under Repair'), defaultValue: 'Available' }
});

const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  startDate: { type: DataTypes.DATEONLY },
  endDate: { type: DataTypes.DATEONLY },
  budget: { type: DataTypes.DECIMAL(15, 2) },
  status: { type: DataTypes.ENUM('Planning', 'Ongoing', 'Completed', 'On Hold'), defaultValue: 'Planning' }
});

const ProjectAssignment = sequelize.define('ProjectAssignment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  roleInProject: { type: DataTypes.STRING }
});

const DailyReport = sequelize.define('DailyReport', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.DATEONLY, defaultValue: DataTypes.NOW },
  description: { type: DataTypes.TEXT },
  progressPercentage: { type: DataTypes.INTEGER }
});

export {
  Employee,
  Attendance,
  Leave,
  Vehicle,
  FuelRecord,
  Maintenance,
  Inventory,
  Equipment,
  Project,
  ProjectAssignment,
  DailyReport
};
