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
exports.Cart = void 0;
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./customer.entity");
const product_entity_1 = require("./product.entity");
let Cart = class Cart {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "cartId" }),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], Cart.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Không được bỏ trống" }),
    (0, class_validator_1.Min)(1, { message: "Số lượng không hợp lệ" }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Cart.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'int' }),
    __metadata("design:type", Number)
], Cart.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "customerId" }),
    __metadata("design:type", customer_entity_1.Customer)
], Cart.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (p) => p.cart),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.Product)
], Cart.prototype, "product", void 0);
Cart = __decorate([
    (0, typeorm_1.Entity)({ name: "Carts" })
], Cart);
exports.Cart = Cart;
