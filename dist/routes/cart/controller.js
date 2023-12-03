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
const cart_entity_1 = require("../../entities/cart.entity");
const customer_entity_1 = require("../../entities/customer.entity");
const product_entity_1 = require("../../entities/product.entity");
const cartRepository = data_source_1.AppDataSource.getRepository(cart_entity_1.Cart);
const productRepository = data_source_1.AppDataSource.getRepository(product_entity_1.Product);
const customerRepository = data_source_1.AppDataSource.getRepository(customer_entity_1.Customer);
module.exports = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const carts = yield cartRepository.find();
            if (carts.length === 0) {
                res.status(204).send();
            }
            else {
                res.json(carts);
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    getDetail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const customerId = parseInt(id);
            console.log('customerId :>> ', customerId);
            const result = yield cartRepository.findOneBy({ customerId: customerId });
            console.log('result :>> ', result);
            if (result) {
                return res.send({ code: 200, payload: result });
            }
            return res.status(410).send({ code: 404, message: "Không tìm thấy" });
        }
        catch (err) {
            res.status(404).json({
                message: "Get detail fail!!",
                payload: err,
            });
        }
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { customerId, productId, quantity } = req.body;
            const customer = yield customerRepository.findOneBy({ id: customerId });
            console.log(customer);
            if (!customer) {
                return res.status(404).json({ error: 'Khách hàng không tồn tại' });
            }
            const product = yield productRepository.findOneBy({ id: productId });
            console.log(product);
            console.log(quantity);
            if (!product) {
                return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
            }
            if (product.stock < quantity) {
                return res.status(400).json({ error: 'Không đủ số lượng sản phẩm trong kho' });
            }
            const cart = new cart_entity_1.Cart();
            cart.customer = customer;
            cart.product = product;
            cart.quantity = quantity;
            const result = yield cartRepository.save(cart);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }),
    // remove:async (req: Request, res: Response, next: any) => {
    //   try {
    //     const { customerId, productId } = req.body;
    //     const cart = await cartRepository.findOne(customerId);
    //     if (!cart) {
    //       return res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
    //     }
    //     if (cart.Length === 1 &&
    //        cart.productId === productId) {
    //       await cartRepository.remove(cart);
    //       return res.status(200).json({ message: 'Đã xóa giỏ hàng' });
    //     }
    //     else 
    //     {
    //     const updatedProducts = cart.cartDetails.filter(p => p.productId !== productId);
    //     cart.cartDetails = updatedProducts;
    //     await cartRepository.save(cart)
    //     }
    //     return res.status(200).json({ message: 'Đã cập nhật giỏ hàng' });
    //   } catch (error) {
    //     return res.status(500).json({ code: 500, error: error });
    //   }
    // }
};
