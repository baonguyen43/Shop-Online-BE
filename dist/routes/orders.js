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
const order_entity_1 = require("../entities/order.entity");
const router = express_1.default.Router();
const repository = data_source_1.AppDataSource.getRepository(order_entity_1.Order);
/* GET orders */
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // SELECT * FROM [Products] AS 'product'
        const orders = yield repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.employee', 'employee')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .select([
            'order.id',
            'order.createdDate',
            'order.shippedDate',
            'order.shippingAddress',
            'order.shippingCity',
            'order.paymentType',
            'order.status',
            'order.description',
            'order.customerId',
            'order.employeeId',
            'customer',
            'employee',
            'orderDetails.quantity',
            'orderDetails.price',
            'orderDetails.discount',
            'product',
            'category',
            'supplier',
        ])
            .getMany();
        if (orders.length === 0) {
            res.sendStatus(204);
        }
        else {
            res.json(orders);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.get('/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // SELECT * FROM [Products] AS 'product'
        const order = yield repository
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.employee', 'employee')
            .leftJoinAndSelect('order.orderDetails', 'orderDetails')
            .leftJoinAndSelect('orderDetails.product', 'product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .where('order.id = :id', { id: req.params.id })
            .select([
            'order.id',
            'order.createdDate',
            'order.shippedDate',
            'order.shippingAddress',
            'order.shippingCity',
            'order.paymentType',
            'order.status',
            'order.description',
            'order.customerId',
            'order.employeeId',
            'customer',
            'employee',
            'orderDetails.quantity',
            'orderDetails.price',
            'orderDetails.discount',
            'product',
            'category',
            'supplier',
        ])
            .getOne();
        if (order) {
            res.json(order);
        }
        else {
            res.sendStatus(204);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
/* POST order */
router.post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = new order_entity_1.Order();
        Object.assign(order, req.body);
        yield repository.save(order);
        res.status(201).json(order);
        // const queryRunner = repository.manager.connection.createQueryRunner();
        // await queryRunner.connect();
        // // Begin transaction
        // try {
        //   await queryRunner.startTransaction();
        //   const order = req.body as Order;
        //   // Lưu thông tin order
        //   const result = await queryRunner.manager.save(Order, order);
        //   // Lưu thông tin order details
        //   const orderDetails = order.orderDetails.map((od) => {
        //     return { ...od, orderId: result.id };
        //   });
        //   await queryRunner.manager.save(OrderDetail, orderDetails);
        //   // Commit transaction
        //   await queryRunner.commitTransaction();
        //   // Get order by id
        //   res.redirect(`/orders/${result.id}`);
        // } catch (error) {
        //   await queryRunner.rollbackTransaction();
        //   res.status(400).json({ error });
        // }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error });
    }
}));
exports.default = router;
