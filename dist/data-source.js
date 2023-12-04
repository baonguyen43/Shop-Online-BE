"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require('dotenv').config();
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
    migrations: ['migrations/*.ts'],
});
