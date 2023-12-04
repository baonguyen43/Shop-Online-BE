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
exports.Customer = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const class_validator_1 = require("class-validator");
const cart_entity_1 = require("./cart.entity");
// import { IsNotEmpty, MaxLength } from 'class-validator';
const bcrypt = require('bcryptjs');
let Customer = class Customer extends typeorm_1.BaseEntity {
    // HOOKS (AUTO VALIDATE)
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
    hashPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                const salt = yield bcrypt.genSalt(10);
                this.password = yield bcrypt.hash(this.password, salt);
            }
        });
    }
    isValidPass(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(password, this.password);
        });
    }
    fullName() {
        return __awaiter(this, void 0, void 0, function* () {
            return `${this.firstName} ${this.lastName}`;
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: "Id" }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ không được bỏ trống' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Họ lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự' }),
    (0, typeorm_1.Column)({ name: "FirstName", length: 50 }),
    __metadata("design:type", String)
], Customer.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên không được bỏ trống' }),
    (0, class_validator_1.Length)(1, 50, { message: 'Họ lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự' }),
    (0, typeorm_1.Column)({ name: "LastName", length: 50 }),
    __metadata("design:type", String)
], Customer.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được bỏ trống' }),
    (0, class_validator_1.Length)(10, 11, { message: 'Số điện thoại phải là 10- 11 số ' }),
    (0, typeorm_1.Column)({ name: "PhoneNumber", length: 50, unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được bỏ trống' }),
    (0, typeorm_1.Column)({ name: "Email", length: 50, unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được bỏ trống' }),
    (0, class_validator_1.Length)(0, 100, { message: 'Địa chỉ nhỏ hơn 100 ký tự ' }),
    (0, typeorm_1.Column)({ name: "Address" }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày sinh không được bỏ trống' }),
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ name: "Birthday" }),
    __metadata("design:type", Date)
], Customer.prototype, "birthday", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password không được bỏ trống' }),
    (0, class_validator_1.MinLength)(5, { message: 'Không được ít hơn 5 ký tự' }),
    (0, class_validator_1.MaxLength)(12, { message: 'Không được vượt quá 12 ký tự' }),
    (0, typeorm_1.Column)({ name: "Password", type: 'nvarchar', nullable: true }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (o) => o.customer),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cart_entity_1.Cart, (c) => c.customer),
    __metadata("design:type", Array)
], Customer.prototype, "carts", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Customer.prototype, "validate", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Customer.prototype, "hashPassword", null);
Customer = __decorate([
    (0, typeorm_1.Entity)({ name: "Customers" })
], Customer);
exports.Customer = Customer;
