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
const category_entity_1 = require("../../entities/category.entity");
const repository = data_source_1.AppDataSource.getRepository(category_entity_1.Category);
module.exports = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield repository.find();
            if (categories.length === 0) {
                res.status(204).send();
            }
            else {
                res.json(categories);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    getDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(category);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = new category_entity_1.Category();
            Object.assign(category, req.body);
            // MANUAL VALIDATION
            // const errors = await category.validate();
            // if (errors) {
            //   res.status(400).json(errors);
            //   return;
            // }
            // HOOK VALIDATION
            yield repository.save(category);
            res.status(201).json(category);
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
                return res.status(404).json({ error: 'Not found' });
            }
            Object.assign(category, req.body);
            yield repository.save(category);
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
            const category = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!category) {
                return res.status(404).json({ error: 'Not found' });
            }
            yield repository.delete({ id: category.id });
            res.status(200).send('delete thanh cong');
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
};
