require('dotenv').config();
import 'reflect-metadata';

import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: 'DESKTOP-NNTP09V',
  // type: 'mssql',
  // host: 'DESKTOP-4EE2EIK\\MSSQLSERVER01',
  port: 1433,
  username: 'sa',
  password: '12345',
  database: 'Onlineshop1',
  entities: ['entities/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true, 
  options: {
    encrypt: false,
  },
});
