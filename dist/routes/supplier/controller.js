"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const supplier_entity_1 = require("../../entities/supplier.entity");
const repository = data_source_1.AppDataSource.getRepository(supplier_entity_1.Supplier);
module.exports = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const suppliers = yield repository.find();
            if (suppliers.length === 0) {
                res.status(204).send();
            }
            else {
                res.json(suppliers);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    getDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supplier = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!supplier) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(supplier);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supplier = new supplier_entity_1.Supplier();
            Object.assign(supplier, req.body);
            yield repository.save(supplier);
            res.status(201).json(supplier);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supplier = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!supplier) {
                return res.status(404).json({ error: 'Not found' });
            }
            Object.assign(supplier, req.body);
            yield repository.save(supplier);
            const updatedCategory = yield repository.findOneBy({ id: parseInt(req.params.id) });
            res.json(updatedCategory);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    softDelete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const supplier = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!supplier) {
                return res.status(404).json({ error: 'Not found' });
            }
            yield repository.delete({ id: supplier.id });
            res.status(200).send('delete thanh cong');
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
};
