"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparatingCategory = void 0;
const typeorm_1 = require("typeorm");
exports.SeparatingCategory = new typeorm_1.EntitySchema({
    tableName: 'SeparatingCategories',
    name: 'separatingCategories',
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
            name: 'Id',
        },
        name: {
            type: String,
            name: 'Name',
            unique: true,
            length: 100,
        },
        description: {
            type: String,
            name: 'Description',
            nullable: true,
            length: 500,
        },
    },
});
