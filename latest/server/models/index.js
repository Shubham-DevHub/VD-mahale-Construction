import User from './User.js';
import {
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
} from './erpModels.js';

// Define relationships
Employee.hasMany(Attendance, { foreignKey: 'employeeId' });
Attendance.belongsTo(Employee, { foreignKey: 'employeeId' });

Employee.hasMany(Leave, { foreignKey: 'employeeId' });
Leave.belongsTo(Employee, { foreignKey: 'employeeId' });

Vehicle.hasMany(FuelRecord, { foreignKey: 'vehicleId' });
FuelRecord.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Vehicle.hasMany(Maintenance, { foreignKey: 'vehicleId' });
Maintenance.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

Project.hasMany(ProjectAssignment, { foreignKey: 'projectId' });
ProjectAssignment.belongsTo(Project, { foreignKey: 'projectId' });

Employee.hasMany(ProjectAssignment, { foreignKey: 'employeeId' });
ProjectAssignment.belongsTo(Employee, { foreignKey: 'employeeId' });

Project.hasMany(DailyReport, { foreignKey: 'projectId' });
DailyReport.belongsTo(Project, { foreignKey: 'projectId' });

Project.hasMany(Equipment, { foreignKey: 'projectId' }); // Currently assigned
Equipment.belongsTo(Project, { foreignKey: 'projectId' });

Employee.hasOne(User, { foreignKey: 'employeeId' });
User.belongsTo(Employee, { foreignKey: 'employeeId' });

export default {
  User,
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
