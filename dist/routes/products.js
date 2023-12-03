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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const product_entity_1 = require("../entities/product.entity");
const router = express_1.default.Router();
const repository = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
/* GET products */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
/* GET product by id */
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield repository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .where('product.id = :id', { id: parseInt(req.params.id) })
            .getOne();
        if (!product) {
            return res.status(404).json({ error: 'Not found' });
        }
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//lấy sản phâm theo cateid
router.get('/category/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
/* POST product */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
/* PATCH product */
router.patch('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
/* DELETE product */
router.delete('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
/* SEARCH product */
// router.get('/search',  async(req: Request, res: Response, next: any) => {
//   try {
//     const { name, categoryId, priceStart, priceEnd, supplierId, } = req.query;
//     if(name) name = fuzzySearch(name); 
//   } catch (error) {
//     return res.status(404).json({error:'Không tìm thấy'})
//   }
// })
exports.default = router;
