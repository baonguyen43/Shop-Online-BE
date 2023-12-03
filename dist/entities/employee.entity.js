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
exports.Employee = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const class_validator_1 = require("class-validator");
// import { IsNotEmpty, MaxLength } from 'class-validator';
let Employee = class Employee extends typeorm_1.BaseEntity {
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'Id' }),
    __metadata("design:type", Number)
], Employee.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 50, { message: 'Họ nhân viên lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Họ không được bỏ trống' }),
    (0, typeorm_1.Column)({ name: 'FirstName', length: 50 }),
    __metadata("design:type", String)
], Employee.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.Length)(1, 50, { message: 'Tên nhân viên lớn hơn $constraint1 và nhỏ hơn $constraint2 ký tự' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tên không được bỏ trống' }),
    (0, typeorm_1.Column)({ name: 'LastName', length: 50 }),
    __metadata("design:type", String)
], Employee.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Số điện thoại không được bỏ trống' })
    // @IsPhoneNumber()
    ,
    (0, class_validator_1.Length)(10, 11, { message: 'Số điện thoại phải từ $constraint1 tới $constraint2 số' }),
    (0, typeorm_1.Column)({ name: 'PhoneNumber', length: 50, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Email không được bỏ trống' }),
    (0, class_validator_1.IsEmail)(),
    (0, typeorm_1.Column)({ name: 'Email', length: 50, unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Địa chỉ không được bỏ trống' }),
    (0, class_validator_1.Length)(5, 500, { message: 'Địa chỉ phải lớn hơn $constraint1 và nhỏ hơn $constraint2' }),
    (0, typeorm_1.Column)({ name: 'Address' }),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Ngày sinh không được bỏ trống' }),
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ name: 'Birthday' }),
    __metadata("design:type", Date
    // ----------------------------------------------------------------------------------------------
    )
], Employee.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (o) => o.employee),
    __metadata("design:type", Array)
], Employee.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Employee.prototype, "validate", null);
Employee = __decorate([
    (0, typeorm_1.Entity)({ name: 'Employees' })
], Employee);
exports.Employee = Employee;
