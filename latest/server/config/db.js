import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '../.env' }); // or import from env

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'Construction',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    port: process.env.DB_PORT || 3306
  }
);
