import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import { sequelize } from './server/config/db.js';
import models from './server/models/index.js';

sequelize.sync().then(async () => {
  await models.User.findOrCreate({
    where: { email: 'manager@vdmahale.com' },
    defaults: { name: 'Project Manager', password: 'manager', role: 'manager' }
  });
  console.log('Manager user seeded');

  await models.User.findOrCreate({
    where: { email: 'employee@vdmahale.com' },
    defaults: { name: 'Field Employee', password: 'employee', role: 'employee' }
  });
  console.log('Employee user seeded');

  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
