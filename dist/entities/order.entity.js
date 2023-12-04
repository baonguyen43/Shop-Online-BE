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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const employee_entity_1 = require("./employee.entity");
const customer_entity_1 = require("./customer.entity");
const orderDetails_entity_1 = require("./orderDetails.entity");
const class_validator_1 = require("class-validator");
let Order = class Order {
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            // const currentDate = new Date(); 
            // const currentDateTime = currentDate.setHours(0, 0, 0, 0);
            // if(this.createdDate.getTime() <  currentDateTime ){
            //   throw new Error('CreatedDate là ngày hiện tại hoặc lớn hơn')
            // }
            if (this.shippedDate < this.createdDate) {
                throw new Error('ShippedDate must be greater than or equal to CreatedDate');
            }
            yield (0, class_validator_1.validateOrReject)(this);
        });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'OrderId' }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.Column)({ name: 'CreatedDate', type: 'datetime', default: () => 'GETDATE()' }),
    __metadata("design:type", Date)
], Order.prototype, "createdDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    (0, typeorm_1.Column)({ name: 'ShippedDate', type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Order.prototype, "shippedDate", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['WAITTING', 'COMPLETED', 'CANCEL'], { message: 'Trạng thái không hợp lệ' }),
    (0, typeorm_1.Column)({ name: 'Status', length: 50, default: 'WAITTING' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Mô tả không được bỏ trống" }),
    (0, class_validator_1.Length)(5, 300, { message: "Mô tả không được ngắn hơn $constraint1 và dài hơn $constraint2 ký tự " }),
    (0, typeorm_1.Column)({ name: 'Description', length: 500 }),
    __metadata("design:type", String)
], Order.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ShippingAddress', length: 500, nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "shippingAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ShippingCity', type: 'nvarchar', nullable: true, length: 50 }),
    __metadata("design:type", String)
], Order.prototype, "shippingCity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Phương thức thanh toán không được bỏ trống" }),
    (0, typeorm_1.Column)({ name: 'PaymentType', length: 20, default: 'CASH' }),
    (0, class_validator_1.IsIn)(['CASH', 'CREDIT CARD'], { message: 'Phương thức thanh toán không hợp lệ' }),
    __metadata("design:type", String)
], Order.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Order.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (c) => c.orders),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.orders),
    __metadata("design:type", employee_entity_1.Employee)
], Order.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetails_entity_1.OrderDetail, (od) => od.order),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Order.prototype, "validate", null);
Order = __decorate([
    (0, typeorm_1.Entity)({ name: 'Orders' })
], Order);
exports.Order = Order;
