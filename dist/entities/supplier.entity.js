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
exports.Supplier = void 0;
const typeorm_1 = require("typeorm");
// import { IsNotEmpty, MaxLength } from 'class-validator';
const product_entity_1 = require("./product.entity");
const class_validator_1 = require("class-validator");
let Supplier = class Supplier {
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id' }),
    __metadata("design:type", Number)
], Supplier.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên nhà cung cấp không được bỏ trống' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Tên nhà cung cấp lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự' }),
    (0, typeorm_1.Column)({ name: 'Name', length: 100 }),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được bỏ trống' }),
    (0, class_validator_1.Length)(10, 11, { message: 'Số điện thoại phải là 10- 11 số ' }),
    (0, typeorm_1.Column)({ name: 'PhoneNumber', length: 50, unique: true }),
    __metadata("design:type", String)
], Supplier.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được bỏ trống' }),
    (0, typeorm_1.Column)({ name: 'Email', length: 100, unique: true }),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được bỏ trống' }),
    (0, class_validator_1.Length)(0, 100, { message: 'Địa chỉ nhỏ hơn 100 ký tự ' }),
    (0, typeorm_1.Column)({ name: 'Address' }),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (p) => p.supplier),
    __metadata("design:type", Array)
], Supplier.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Supplier.prototype, "validate", null);
Supplier = __decorate([
    (0, typeorm_1.Entity)({ name: 'Suppliers' })
], Supplier);
exports.Supplier = Supplier;
