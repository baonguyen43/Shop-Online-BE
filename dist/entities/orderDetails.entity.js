"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetail = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const product_entity_1 = require("./product.entity");
let OrderDetail = class OrderDetail {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Quantity', type: 'decimal', precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Price', type: 'decimal', precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (p) => p.orderDetails),
    __metadata("design:type", product_entity_1.Product)
], OrderDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (o) => o.orderDetails),
    __metadata("design:type", order_entity_1.Order)
], OrderDetail.prototype, "order", void 0);
OrderDetail = __decorate([
    (0, typeorm_1.Entity)({ name: 'OrderDetails' })
], OrderDetail);
exports.OrderDetail = OrderDetail;
