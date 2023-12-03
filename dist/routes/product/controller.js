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
const product_entity_1 = require("../../entities/product.entity");
const repository = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
module.exports = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // SELECT * FROM [Products] AS 'product'
            const products = yield repository.createQueryBuilder('product').leftJoinAndSelect('product.category', 'category').leftJoinAndSelect('product.supplier', 'supplier').getMany();
            if (products.length === 0) {
                res.status(204).send();
            }
            else {
                res.json(products);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    getList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { page, pageSize } = req.query;
            const limit = parseInt(pageSize, 10) || 12;
            const skip = (parseInt(page, 10) - 1) * limit || 0;
            const results = yield repository
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', "category")
                .leftJoinAndSelect('product.supplier', 'supplier')
                .skip(skip)
                .take(limit)
                .getMany();
            if (results.length === 0) {
                res.status(204).send();
            }
            else {
                res.json({
                    results,
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    getDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const products = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!products) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(products);
        }
        catch (error) {
            console.error(error);
            res.status(404).json({ error });
        }
    }),
    getProductByCatgoryId: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield repository
                .createQueryBuilder('product')
                .where('product.CategoryId = :id', { id: parseInt(req.params.id) })
                .getMany();
            if (!product) {
                return res.status(404).json({ error: 'Not found' });
            }
            res.json(product);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = new product_entity_1.Product();
            Object.assign(product, req.body);
            yield repository.save(product);
            res.status(201).json(product);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!product) {
                return res.status(404).json({ error: 'Not found' });
            }
            Object.assign(product, req.body);
            yield repository.save(product);
            const updatedCategory = yield repository
                .createQueryBuilder('p')
                .leftJoinAndSelect('p.category', 'c')
                .where('p.id = :id', { id: parseInt(req.params.id) })
                .getOne();
            res.json(updatedCategory);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    softDelete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const product = yield repository.findOneBy({ id: parseInt(req.params.id) });
            if (!product) {
                return res.status(404).json({ error: 'Not found' });
            }
            yield repository.delete({
                id: product.id,
            });
            res.status(200).send('delete thanh cong');
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    search: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, categoryId, supplierId } = req.query;
            const queryBuilder = product_entity_1.Product
                .createQueryBuilder('product')
                .leftJoinAndSelect('product.category', 'category')
                .leftJoinAndSelect('product.supplier', 'supplier');
            if (name) {
                queryBuilder.andWhere('product.Name LIKE :name ', { name: `%${name}%` });
            }
            if (categoryId) {
                queryBuilder.andWhere('product.CategoryId = :categoryId', { categoryId });
            }
            if (supplierId) {
                queryBuilder.andWhere('product.SupplierId = :supplierId', { supplierId });
            }
            const result = yield queryBuilder.getMany();
            if (result.length === 0) {
                res.status(204).send();
            }
            else {
                res.json(result);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    })
};
