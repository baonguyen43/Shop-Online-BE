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
const order_entity_1 = require("../../entities/order.entity");
const orderDetails_entity_1 = require("../../entities/orderDetails.entity");
const repository = data_source_1.AppDataSource.getRepository(order_entity_1.Order);
module.exports = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    getDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    }),
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // const order = new Order();
            // Object.assign(order, req.body);
            // await repository.save(order);
            // res.status(201).json(order);
            const queryRunner = repository.manager.connection.createQueryRunner();
            yield queryRunner.connect();
            // Begin transaction
            try {
                yield queryRunner.startTransaction();
                const order = req.body;
                // Lưu thông tin order
                const result = yield queryRunner.manager.save(order_entity_1.Order, order);
                // Lưu thông tin order details
                const orderDetails = order.orderDetails.map((od) => {
                    return Object.assign(Object.assign({}, od), { orderId: result.id });
                });
                yield queryRunner.manager.save(orderDetails_entity_1.OrderDetail, orderDetails);
                // Commit transaction
                yield queryRunner.commitTransaction();
                // Get order by id
                res.redirect(`/orders/${result.id}`);
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                res.status(400).json({ error });
            }
        }
        catch (error) {
            console.error(error);
            res.status(400).json({ error });
        }
    }),
    updateStatus: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params;
            const { status } = req.body;
            // Kiểm tra xem order có tồn tại không
            const order = yield repository.findOne(id);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Cập nhật trạng thái của order
            if (status === 'CANCELED' || status === 'REJECTED' || status === 'COMPLETED') {
                order.status = status;
                yield repository.save(order);
                res.json(order);
            }
            else {
                res.status(400).json({ error: 'Invalid status' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
};
