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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const cart_entity_1 = require("./cart.entity");
const category_entity_1 = require("./category.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
const supplier_entity_1 = require("./supplier.entity");
let Product = class Product extends typeorm_1.BaseEntity {
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id' }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Tên sản phẩm không được bỏ trống" }),
    (0, class_validator_1.Length)(5, 50, { message: 'Tên sản phẩm từ $constraint1 tới $constraint2' }),
    (0, typeorm_1.Column)({ name: 'Name', type: 'nvarchar' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Giá sản phẩm không được bỏ trống" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: ' Giá không thể âm' }),
    (0, typeorm_1.Column)({ name: 'Price', type: 'decimal', precision: 18, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Giảm giá không được bỏ trống" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(75),
    (0, typeorm_1.Column)({ name: 'Discount', type: 'decimal', precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Tồn kho không được bỏ trống" }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0, { message: "Số lượng tồn kho không hợp lệ" }),
    (0, typeorm_1.Column)({ name: 'Stock', type: 'decimal', precision: 18, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Mô tả không được bỏ trống" }),
    (0, class_validator_1.Length)(5, 300, { message: "Mô tả không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự " }),
    (0, typeorm_1.Column)({ name: 'Description', type: 'nvarchar', length: 'MAX', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Đường dẫn ảnh không được bỏ trống" }),
    (0, class_validator_1.Length)(5, 300, { message: "Đường dẫn ảnh không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự " }),
    (0, typeorm_1.Column)({ name: 'ImagePath', type: 'nvarchar', length: 'MAX', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imagePath", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Mã danh mục không được bỏ trống" }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Mã nhà cung cấp không được bỏ trống" }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Product.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (c) => c.products),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (s) => s.products),
    __metadata("design:type", supplier_entity_1.Supplier)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetails_entity_1.OrderDetail, (od) => od.product),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (cd) => cd.product),
    __metadata("design:type", Array)
], Product.prototype, "cart", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Product.prototype, "validate", null);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: 'Products' })
], Product);
exports.Product = Product;
