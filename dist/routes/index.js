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
// import { CategoryInterface, SeparatingCategory } from '../entities/schemas/category-schema';
const category_view_entity_1 = require("../entities/views/category-view.entity");
const router = express_1.default.Router();
const repository = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
// const categoryRepository = AppDataSource.getRepository<CategoryInterface>(SeparatingCategory); 
const viewRepository = data_source_1.AppDataSource.getRepository(category_view_entity_1.CategoryView);
// console.log("SeparatingCategory", SeparatingCategory);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({ message: 'Hello world!' });
});
// router.get('/call-separating-entity', async (req: Request, res: Response, next: any) => {
//   try {
//     const categories = await categoryRepository.find();
//     res.json(categories);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// Get Order by orderId
router.get('/call-raw-sql', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield repository.manager.connection.query('SELECT * FROM Orders AS O WHERE O.OrderId = @0', [38]);
        res.json(results);
        // res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get Products by Discount
router.get('/call-stored-procedure', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_Products_GetByDiscount] @0', [15]);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get Products by Discount >= 45 
router.get('/super-sale', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = 'SELECT * FROM Products as p WHERE p.Discount >= 40';
        const results = yield repository.manager.connection.query(query);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Hiển thị năm sinh của khách hàng 
router.get('/customers/get-by-year-of-birthday/:year', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_GetCustomerYear] @0', [req.params.year]);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//Hiển thị các đơn hàng có trạng thái trong ngày
router.get('/get-order-status-date', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = req.query.date;
        const status = req.query.status;
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_GetOrderStatusDay] @Date = @0, @Status = @1', [date, status]);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// HIển thị các đơn hàng ko bán dc trong khoảng ngày 
router.get('/get-order-product-not-sell', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fromDate = req.query.date;
        const toDate = req.query.date;
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_ProductNotSell] @FromDate = @0, @ToDate = @1', [fromDate, toDate]);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// HIển thị các khách hàng mua trong khoảng ngày ERROR
router.get('/get-customer-buy-onday', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const fromDate = req.query.datetime;
        // const toDate = req.query.datetime
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_Customer_BuyDay] @FromDate = @0, @ToDate = @1', ['2023-01-01', '2023-12-01']);
        res.json(toCamelCase(results));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
//Hiển thị khách hàng từ tuổi tới tuổi 
router.get('/get-age-customer', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const minAge = req.query.int;
        // const maxAge = req.query.int; 
        const results = yield repository.manager.connection.query('EXECUTE [dbo].[usp_GetAgeCustomerFromTo] @MinAge = @0, @MaxAge = @1', [10, 20]);
        res.json(results);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.get('/view', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield viewRepository.find();
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
}));
function toCamelCase(o) {
    var newO = {}, origKey, newKey, value;
    if (o instanceof Array) {
        return o.map(function (value) {
            if (typeof value === 'object') {
                value = toCamelCase(value);
            }
            return value;
        });
    }
    else {
        for (origKey in o) {
            if (o.hasOwnProperty(origKey)) {
                newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                value = o[origKey];
                if (value instanceof Array || (value !== null && value.constructor === Object)) {
                    value = toCamelCase(value);
                }
                newO[newKey] = value;
            }
        }
    }
    return newO;
}
exports.default = router;
